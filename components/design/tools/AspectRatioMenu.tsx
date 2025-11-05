import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { useCanvas } from "@/store/useCanvas";
import * as fabric from "fabric";

type AspectRatioOption = {
  label: string;
  ratio: number;
  width: number;
  height: number;
};

const aspectRatios: AspectRatioOption[] = [
  { label: "4:3", ratio: 4 / 3, width: 4, height: 3 },
  { label: "16:9", ratio: 16 / 9, width: 16, height: 9 },
  { label: "1:1", ratio: 1, width: 1, height: 1 },
  { label: "3:2", ratio: 3 / 2, width: 3, height: 2 },
  { label: "2:3", ratio: 2 / 3, width: 2, height: 3 },
  { label: "9:16", ratio: 9 / 16, width: 9, height: 16 },
];

const AspectRatioMenu = () => {
  const { canvas } = useCanvas();
  const activeObj = canvas?.getActiveObject();

  const applyAspectRatio = (aspectRatio: AspectRatioOption) => {
    if (!activeObj || activeObj.type !== "image") return;

    const image = activeObj as fabric.FabricImage;
    const clipPath = image.clipPath as fabric.Rect | undefined;

    if (!clipPath) return;

    // Calculate new dimensions maintaining current width
    const currentWidth = clipPath.width || image.width || 300;
    const newHeight = currentWidth / aspectRatio.ratio;

    // Create new clipPath with aspect ratio
    const newClipPath = new fabric.Rect({
      width: currentWidth,
      height: newHeight,
      rx: clipPath.rx || 0,
      ry: clipPath.ry || 0,
      originX: "center",
      originY: "center",
    });

    // Store aspect ratio on the image for future reference
    (image as any).aspectRatio = aspectRatio.ratio;
    (image as any).aspectRatioLabel = aspectRatio.label;

    image.set({
      clipPath: newClipPath,
    });

    image.setCoords();
    canvas?.renderAll();
  };

  // Get current aspect ratio
  const getCurrentAspectRatio = (): string | null => {
    if (!activeObj || activeObj.type !== "image") return null;
    return (activeObj as any).aspectRatioLabel || "4:3";
  };

  const currentRatio = getCurrentAspectRatio();

  return (
    <div className="flex flex-col space-y-4 p-2">
      <ToolHeader
        title="Aspect Ratio"
        description="Choose an aspect ratio for your image"
      />

      <div className="grid grid-cols-2 gap-2">
        {aspectRatios.map((ratio) => (
          <Button
            key={ratio.label}
            variant={currentRatio === ratio.label ? "default" : "outline"}
            onClick={() => applyAspectRatio(ratio)}
            className="w-full"
          >
            {ratio.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioMenu;
