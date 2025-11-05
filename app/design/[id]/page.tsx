"use client";

import { useRef, useEffect } from "react";
import * as fabric from "fabric";
import { useQuery } from "convex/react";
import { redirect, useParams } from "next/navigation";

import Header from "@/components/design/header";
import Sidebar from "@/components/design/sidebar";
import { api } from "@/convex/_generated/api";
import { Tools } from "@/components/design/tools";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { useCanvas } from "@/store/useCanvas";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { ImSpinner6 } from "react-icons/im";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import {
  toggleCropMode,
  exitCropMode,
  ensureImageCoversFrame,
  setupImageForCrop,
  updateCropOverlays,
} from "@/lib/imageCropHelper";

const Design = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { canvas, setCanvas } = useCanvas();
  const { activeElement, setActiveElement, setActiveElements } =
    useActiveElementStore();
  const { isOnline } = useNetworkStatusStore();
  const { id } = useParams();
  const { data } = useCurrentUser();

  if (!data) {
    redirect("");
  }

  // const design = {};
  const design = useQuery(api.design.getDesign, { id: id as string });
  // if (!data) redirect("/");

  if (design === null) redirect("/dashboard");

  const width = design?.width;
  const height = design?.height;
  // console.log(width, height);
  const handleStringChange = (
    property: keyof fabric.Object,
    value: string | boolean | number
  ) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set(property, value);
        if (property === "padding") activeObject.setCoords();
        canvas.requestRenderAll();
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const FabricCanvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
      width: width,
      height: height,
      backgroundColor: "#f0f0f0",
      // freeDrawingCursor:
    });

    FabricCanvas.loadFromJSON(design?.json).then((canvas) =>
      canvas.requestRenderAll()
    );

    setCanvas(FabricCanvas);

    const updateSelectedObject = () => {
      const activeObject = FabricCanvas.getActiveObject();
      if (activeObject) {
        setActiveElement(activeObject as fabric.Object & fabric.ITextProps);
      } else {
        setActiveElement(null);
      }
    };

    const updateSelectedObjects = () => {
      const selectedObjects = FabricCanvas.getActiveObjects();
      if (!selectedObjects) {
        setActiveElements(null);
      } else {
        setActiveElements(
          selectedObjects as (fabric.Object & fabric.ITextProps)[]
        ); // Store all selected objects in the state
      }
    };

    FabricCanvas.on("selection:created", updateSelectedObjects);
    FabricCanvas.on("selection:updated", updateSelectedObjects);
    FabricCanvas.on("selection:cleared", () => setActiveElements(null));

    FabricCanvas.on("selection:created", updateSelectedObject);
    FabricCanvas.on("selection:updated", updateSelectedObject);
    FabricCanvas.on("selection:cleared", updateSelectedObject);

    // Handle double click to enter crop mode
    FabricCanvas.on("mouse:dblclick", (event) => {
      const target = event.target;
      if (target && target.type === "image") {
        toggleCropMode(target as fabric.FabricImage, FabricCanvas);
      }
    });

    // Exit crop mode when clicking outside the image
    FabricCanvas.on("mouse:down", (event) => {
      const target = event.target;
      const activeObj = FabricCanvas.getActiveObject();

      // If clicking outside while in crop mode, exit crop mode
      if (!target && activeObj && activeObj.type === "image") {
        if ((activeObj as any).isInCropMode) {
          exitCropMode(activeObj as fabric.FabricImage, FabricCanvas);
        }
      }
    });

    // Handle mouse up to exit crop mode and ensure image covers frame
    FabricCanvas.on("mouse:up", (event) => {
      const target = event.target;
      if (target && target.type === "image") {
        const image = target as fabric.FabricImage;

        // If in crop mode and mouse is released, exit crop mode
        if ((image as any).isInCropMode) {
          exitCropMode(image, FabricCanvas);
        }

        // Ensure image always covers the frame
        if (ensureImageCoversFrame(image)) {
          FabricCanvas.renderAll();
        }
      }
    });

    // Handle object moving to update overlays in crop mode
    FabricCanvas.on("object:moving", (event) => {
      const target = event.target;
      if (target && target.type === "image") {
        const image = target as fabric.FabricImage;

        // Update overlays while moving in crop mode
        if ((image as any).isInCropMode) {
          updateCropOverlays(image, FabricCanvas);
        }
      }
    });

    // Handle object scaling to maintain minimum coverage and update overlays
    FabricCanvas.on("object:scaling", (event) => {
      const target = event.target;
      if (target && target.type === "image") {
        const image = target as fabric.FabricImage;

        // In crop mode, ensure image covers frame and update overlays
        if ((image as any).isInCropMode) {
          ensureImageCoversFrame(image);
          updateCropOverlays(image, FabricCanvas);
        }

        // Maintain aspect ratio for frame scaling (not in crop mode)
        if (!(image as any).isInCropMode) {
          const aspectRatio = (image as any).aspectRatio || 4 / 3;
          const clipPath = image.clipPath as fabric.Rect;

          if (clipPath) {
            // When scaling the frame, maintain its aspect ratio
            const newWidth = clipPath.width! * (image.scaleX || 1);
            const newHeight = newWidth / aspectRatio;

            clipPath.set({
              width: newWidth / (image.scaleX || 1),
              height: newHeight / (image.scaleY || 1),
            });
          }
        }
      }
    });

    // Setup images with crop functionality when added
    FabricCanvas.on("object:added", (event) => {
      const target = event.target;
      if (target && target.type === "image") {
        setupImageForCrop(target as fabric.FabricImage);
      }
    });

    return () => {
      FabricCanvas.dispose();
    };
  }, [width, height]);

  handleStringChange("cornerColor", "#8B3DFF");
  handleStringChange("cornerStyle", "circle");
  handleStringChange("borderColor", "#8B3DFF");
  handleStringChange("padding", 10);
  handleStringChange("transparentCorners", false);

  useEffect(() => {
    if (!canvas) return;
    canvas.selection = isOnline;
    canvas.getObjects().forEach((object) => {
      object.selectable = isOnline;
      object.evented = isOnline;
    });
  }, [isOnline]);

  return (
    <div className="h-full flex flex-col">
      <Header design={design} />
      <div className="relative h-[calc(100%-70px)] w-full top-[80px] flex">
        {isOnline && <Sidebar design={design} />}
        <main className="flex-1 overflow-auto relative flex flex-col">
          {activeElement && isOnline && <Tools />}
          {design === undefined ? (
            <div className="flex justify-center items-center h-[40vh]">
              <ImSpinner6 className="size-10 animate-spin" />
            </div>
          ) : (
            <div
              className="flex-1 h-[calc(100%-124px)] bg-white ml-4"
              style={{ height: height, width: width }}
            >
              <canvas ref={canvasRef} height={height} width={width} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Design;
