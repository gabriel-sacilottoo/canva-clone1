import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvas } from "@/store/useCanvas";
import { useActiveElementStore } from "@/store/ActiveEelement";
import { ToolHeader } from "@/components/global/tool-header";

import { useState } from "react";
import * as fabric from "fabric";

interface ColorPickerProps {
  onChange: (property: keyof fabric.Object, value: number | number[]) => void;
}

export const StrokeWidth = ({ onChange }: ColorPickerProps) => {
  const { canvas } = useCanvas();
  const { activeElement } = useActiveElementStore();
  const [property, setProperty] = useState<keyof fabric.Object>("strokeWidth");
  const value =
    property === "strokeDashArray"
      ? activeElement?.strokeDashArray
      : activeElement?.strokeWidth;

  // on stroke width change
  const onWidthChange = (values: number[]) => {
    if (property === "strokeWidth") {
      if (activeElement) {
        activeElement.set("strokeDashArray", [0, 0]);
        canvas?.renderAll();
      }
      onChange(property, values[0]);
    } else {
      onChange(property, [values[0], values[0]]);
    }
  };
  return (
    <>
      <ToolHeader
        title="Stroke options"
        description="Modify the stroke of your element"
      />
      <ScrollArea>
        <div className="p-4 space-y-4">
          <Label className="text-sm">Stroke type</Label>
          <Button
            onClick={() => setProperty("strokeWidth")}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              property === "strokeWidth" && "border-2 border-primary"
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4" />
          </Button>
          <Button
            onClick={() => setProperty("strokeDashArray")}
            variant="secondary"
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              property === "strokeDashArray" && "border-2 border-primary"
            )}
            style={{
              padding: "8px 16px",
            }}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed" />
          </Button>
          <div className="p-4 space-y-4 border-t border-gray-400 dark:border-zinc-700">
            <Label className="text-sm">Stroke width</Label>
            <Slider
              className="mt-2"
              defaultValue={[Array.isArray(value) ? value[0] : value || 0]}
              onValueChange={(values) => onWidthChange(values)}
              step={1}
            />
          </div>
        </div>
      </ScrollArea>
    </>
  );
};
