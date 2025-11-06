import { TbColorFilter, TbBorderCornerIos } from "react-icons/tb";
import { BsBorderWidth } from "react-icons/bs";
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-react";
import { MdOpacity } from "react-icons/md";
import { ITextProps } from "fabric";
import * as fabric from "fabric";
import { TbBackground } from "react-icons/tb";
import { FaLock, FaLockOpen } from "react-icons/fa6";

import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { Hint } from "@/components/global/hint";
import Colors from "./Colors";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import Opacity from "./Opacity";
import { StrokeWidth } from "./stroke-width";
import Corners from "./Corners";
import Group from "./Group";
import ImageFilters from "./ImageFilters";
import Text from "./Text";
import ImageRadius from "./ImageRadius";
import { cn, parseLinearGradientString } from "@/lib/utils";

export const Tools = () => {
  const { setActiveElement, activeElement, activeElements, setActiveElements } =
    useActiveElementStore();
  const { canvas } = useCanvas();

  // Delete selected object
  const deleteSelectedObject = () => {
    if (canvas && activeElement) {
      canvas.remove(activeElement); // Remove the object from canvas
      setActiveElement(null); // Clear selection
      canvas.renderAll(); // Re-render the canvas to reflect changes
    }
    if (canvas && activeElements && activeElements.length > 1) {
      activeElements.forEach((obj) => canvas.remove(obj)); // Remove each selected object
      setActiveElements(null); // Clear selection state
      canvas.discardActiveObject(); // Deselect the group
      canvas.renderAll(); // Re-render the canvas to reflect changes
    }
  };

  // Function to handle property updates
  const updateSelectedObject = (
    property: keyof fabric.Object | keyof ITextProps | "rect" | "gradient",
    value: string | number | boolean | number[] | undefined
  ) => {
    if (activeElement && canvas) {
      if (activeElement.type === "rect" && property === "rect") {
        activeElement.set({ rx: value, ry: value });
      }

      // Handle gradient fill specifically
      if (typeof value === "string" && value.includes("linear")) {
        const gradient = parseLinearGradientString(value, canvas); // call your parser
        activeElement.set({ [property]: gradient });
      } else {
        activeElement.set({ [property]: value });
      }

      canvas.renderAll();
      setActiveElement(activeElement); // force reactivity
    }
  };

  // duplicate
  const duplicateActiveObject = async () => {
    if (activeElement) {
      const Duplicate = activeElement.clone();

      // Update the state to trigger React reactivity
      canvas?.add(await Duplicate);
      setActiveElement(await Duplicate); // Clone to force update
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // bring forward
  const bringForward = () => {
    if (activeElement) {
      canvas?.bringObjectForward(activeElement);
      canvas?.renderAll(); // Re-render the canvas
    }
  };

  // send backward
  const sendBackward = () => {
    if (activeElement) {
      canvas?.sendObjectBackwards(activeElement);
    }
  };

  // This function sets the background image of the canvas to the currently selected image
  const addImage = async () => {
    if (!canvas) return;
    if (canvas?.backgroundImage === undefined) {
      // @ts-ignore
      const imageUrl = activeElement?._originalElement.currentSrc;
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        fabric.FabricImage.fromURL(imageUrl, {
          crossOrigin: "anonymous",
        })
          .then((img) => {
            // Scale image to fit the canvas size
            const scaleX = canvas.width! / img.width!;
            const scaleY = canvas.height! / img.height!;
            img.scaleX = scaleX;
            img.scaleY = scaleY;

            canvas.backgroundImage = img;
            canvas?.requestRenderAll();
            canvas?.discardActiveObject(); // Deselect if needed
            // canvas.renderAll();
          })
          .catch((e) => {
            console.error("Error loading image", e);
          });
      };
    } else {
      // If there is already a background image, remove it
      if (!canvas) return;
      canvas.backgroundImage = undefined;
      canvas?.requestRenderAll();
      canvas?.discardActiveObject(); // Deselect if needed
    }
  };

  // lock active object
  const lockObject = () => {
    if (activeElement?.evented) {
      activeElement.set({ evented: false });
      canvas?.discardActiveObject(); // Deselect if needed
      canvas?.renderAll();
      // setActiveElement(activeElement); // update state
    } else {
      activeElement?.set({ evented: true });
      canvas?.discardActiveObject(); // Deselect if needed
      canvas?.renderAll();
      // setActiveElement(activeElement); // update state
    }
  };
  return (
    <ScrollArea className=" mb-4">
      <div className="justify-center items-center flex space-x-2">
        {/* lock unlock */}
        {activeElements!.length === 1 && (
          <div className="flex items-center h-full justify-center">
            <Hint
              label={activeElement?.evented ? "lock" : "unlock"}
              side="bottom"
              sideOffset={5}
            >
              <Button onClick={lockObject} size="icon" variant="ghost">
                {activeElement?.evented ? (
                  <FaLock className="size-4" />
                ) : (
                  <FaLockOpen className="size-4" />
                )}
              </Button>
            </Hint>
          </div>
        )}
        {/* Color */}
        {activeElement?.type !== "image" && (
          <div className="flex items-center h-full justify-center">
            <HovercardGlobal
              trigger={
                <Hint label="Color" side="bottom" sideOffset={5}>
                  <Button size="icon" variant="ghost">
                    <div className="rounded-sm size-5 border-2 bg-white" />
                  </Button>
                </Hint>
              }
              content={
                <Colors
                  onChange={updateSelectedObject}
                  value={activeElement?.fill || "#000000"}
                  property="fill"
                  title="Fill color"
                  desc="Add Fill color to your element"
                />
              }
              side={"bottom"}
            />
          </div>
        )}
        {/* Stroke color */}
        <div className="flex items-center h-full justify-center">
          <HovercardGlobal
            trigger={
              <Hint label="Stroke color" side="bottom" sideOffset={5}>
                <Button size="icon" variant="ghost">
                  <div className="rounded-sm size-5 border-2 dark:border-white border-dark" />
                </Button>
              </Hint>
            }
            content={
              <Colors
                onChange={updateSelectedObject}
                value={activeElement?.stroke || "#000000"}
                property="stroke"
                title="Stroke color"
                desc="Add stroke color to your element"
              />
            }
            side={"bottom"}
          />
        </div>
        {/* Stroke width */}
        <div className="flex items-center h-full justify-center">
          <HovercardGlobal
            trigger={
              <Hint label="Stroke width" side="bottom" sideOffset={5}>
                <Button size="icon" variant="ghost">
                  <BsBorderWidth className="size-4" />
                </Button>
              </Hint>
            }
            content={<StrokeWidth onChange={updateSelectedObject} />}
            side={"bottom"}
          />
        </div>
        {/* rect */}
        {activeElement?.type === "rect" && (
          <div className="flex items-center h-full justify-center">
            <HovercardGlobal
              trigger={
                <Hint label="Corners" side="bottom" sideOffset={5}>
                  <Button size="icon" variant="ghost">
                    <TbBorderCornerIos className="size-4" />
                  </Button>
                </Hint>
              }
              content={
                <Corners
                  onChange={updateSelectedObject}
                  value={activeElement?.rx || 0}
                />
              }
              side={"bottom"}
            />
          </div>
        )}

        {/* Add text */}
        {activeElement?.type === "textbox" && (
          <Text updateSelectedText={updateSelectedObject} />
        )}
        {activeElement?.type === "i-text" && (
          <Text updateSelectedText={updateSelectedObject} />
        )}

        {/* image */}
        {activeElement?.type === "image" && (
          <>
            <div className="flex items-center h-full justify-center">
              <HovercardGlobal
                trigger={
                  <Hint label="Image Radius" side="bottom" sideOffset={5}>
                    <Button size="icon" variant="ghost">
                      <TbBorderCornerIos className="size-4" />
                    </Button>
                  </Hint>
                }
                content={<ImageRadius />}
                side={"bottom"}
              />
            </div>
            <div className="flex items-center h-full justify-center">
              <HovercardGlobal
                trigger={
                  <Hint label="Filters" side="bottom" sideOffset={5}>
                    <Button size="icon" variant="ghost">
                      <TbColorFilter className="size-4" />
                    </Button>
                  </Hint>
                }
                content={<ImageFilters />}
                side={"bottom"}
              />
            </div>
            {/* Background */}
            <div className="flex items-center h-full justify-center">
              <Hint label="Image Background" side="bottom" sideOffset={5}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={addImage}
                  className={cn(
                    canvas?.backgroundImage !== undefined &&
                      "bg-gray-200 dark:bg-darkHover"
                  )}
                >
                  <TbBackground className="size-4" />
                </Button>
              </Hint>
            </div>
          </>
        )}
        {/* bg */}
        {canvas?.backgroundImage !== undefined &&
          activeElement?.type !== "image" && (
            <div className="flex items-cjenter h-full justify-center">
              <Hint label="Image Background" side="bottom" sideOffset={5}>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={addImage}
                  className={cn(
                    canvas?.backgroundImage !== undefined &&
                      "bg-gray-200 dark:bg-darkHover"
                  )}
                >
                  <TbBackground className="size-4" />
                </Button>
              </Hint>
            </div>
          )}
        {/* Bring forward */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Bring forward" side="bottom" sideOffset={5}>
            <Button onClick={bringForward} size="icon" variant="ghost">
              <ArrowUp className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Send backwards */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Send backwards" side="bottom" sideOffset={5}>
            <Button onClick={sendBackward} size="icon" variant="ghost">
              <ArrowDown className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Duplicate */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Duplicate" side="bottom" sideOffset={5}>
            <Button onClick={duplicateActiveObject} size="icon" variant="ghost">
              <Copy className="size-4" />
            </Button>
          </Hint>
        </div>
        {/* Opacity */}
        <div className="flex items-center h-full justify-center">
          <HovercardGlobal
            trigger={
              <Hint label="Opacity" side="bottom" sideOffset={5}>
                <Button size="icon" variant="ghost">
                  <MdOpacity className="size-5" />
                </Button>
              </Hint>
            }
            content={
              <Opacity
                onChange={updateSelectedObject}
                value={
                  activeElement?.opacity !== undefined
                    ? Math.round(activeElement.opacity * 100)
                    : 100
                }
                property="opacity"
              />
            }
            side={"bottom"}
          />
        </div>
        {/* Group */}
        {activeElement?.type === "group" && <Group />}
        {activeElements!.length > 1 && <Group />}
        {/* delete */}
        <div className="flex items-center h-full justify-center">
          <Hint label="Delete" side="bottom" sideOffset={5}>
            <Button
              onClick={deleteSelectedObject}
              size="icon"
              variant="ghost"
              className="text-red-600"
            >
              <Trash className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
