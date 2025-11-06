import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCanvas } from "@/store/useCanvas";
import Colors from "@/components/design/tools/Colors";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { parseLinearGradientString } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { designProps } from "@/type";

import { useState } from "react";

const Setting = ({ design }: { design: designProps | undefined }) => {
  const { canvas } = useCanvas();
  if (!canvas) return null;
  if (!design) return null;

  const [width, setWidth] = useState<number>(design.width);
  const [height, setHeight] = useState<number>(design.height);

  const { mutate, pending } = useApiMutation(api.design.updateSize);

  // choose color
  const chooseColor = (property: string, value: string) => {
    // console.log(value);
    if (!value) return;
    if (value.includes("linear")) {
      // linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)
      // const angleMatch = value.match(/linear-gradient\((\d+)deg/);
      // const angle = angleMatch ? parseInt(angleMatch[1]) : 0;
      // const colorStopMatches = [
      //   ...value.matchAll(/(rgba?\([^)]+\)|#[0-9a-fA-F]+)\s+([\d.]+)%/g),
      // ];
      // const colorStops = colorStopMatches.map(([_, color, offset]) => ({
      //   color,
      //   offset: parseFloat(offset) / 100,
      // }));
      // const gradient = new fabric.Gradient({
      //   type: "linear",
      //   coords: {
      //     x1: 0,
      //     y1: 0,
      //     x2: canvas.width!,
      //     y2: canvas.height!,
      //   },
      //   colorStops,
      // });
      // canvas.backgroundColor = gradient;
      const newValue = parseLinearGradientString(value, canvas);
      canvas.backgroundColor = newValue;
      canvas.renderAll();
    } else {
      canvas.backgroundColor = value;
      canvas.renderAll();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(width, height);
    canvas.width = width!;
    canvas.height = height!;
    await mutate({
      id: design?._id,
      height: height,
      width: width,
    }).catch((error) => {
      console.log(error);
    });
    canvas.renderAll();
  };

  return (
    <div className="relative flex flex-col">
      <ToolHeader
        title="Settings"
        description="Change the look of your workspace"
      />
      <ScrollArea className="h-[70vh]">
        <form onSubmit={onSubmit} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              disabled={pending}
              placeholder="Height"
              value={height}
              required
              type="number"
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              disabled={pending}
              placeholder="Width"
              value={width}
              type="number"
              required
              className="bg-transparent dark:bg-transparent border border-gray-400 dark:border-zinc-700"
              onChange={(e) => setWidth(Number(e.target.value))}
            />
          </div>
          <Button className="w-full" type="submit" disabled={pending}>
            Resize
          </Button>
        </form>
        <div className="p-4">
          <Colors
            title="Choose Background Color"
            desc="Choose the Background color that you would like to use"
            onChange={chooseColor}
            property="backgroundColor"
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Setting;
