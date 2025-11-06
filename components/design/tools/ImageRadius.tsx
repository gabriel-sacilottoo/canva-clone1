import { ToolHeader } from "@/components/global/tool-header";
import { Slider } from "@/components/ui/slider";
import { useCanvas } from "@/store/useCanvas";

import * as fabric from "fabric";

const ImageRadius = () => {
  const { canvas } = useCanvas();
  const activeObj = canvas?.getActiveObject();
  const clip = activeObj?.clipPath as fabric.Rect;
  const image = activeObj as fabric.Image;
  const rx = clip.rx ?? 0;

  // Function to update the corner radius of the image
  const updateImageCornerRadius = (radius: number) => {
    if (activeObj && activeObj.type === "image") {
      const clipPath = new fabric.Rect({
        rx: radius,
        ry: radius,
        width: image.width!,
        height: image.height!,
        originX: "center",
        originY: "center",
      });

      image.set({
        clipPath,
        originX: "center",
        originY: "center",
      });

      image.setCoords();
      canvas?.renderAll();
    }
  };
  return (
    <div className="flex flex-col space-y-4">
      <ToolHeader
        title={"Adjust Image Radius"}
        description={"Adjust Corners"}
      />

      <Slider
        defaultValue={[rx]}
        onValueChange={(values) => updateImageCornerRadius(values[0])}
        max={100}
        min={0}
        step={10}
      />
    </div>
  );
};

export default ImageRadius;
