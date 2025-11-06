import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { fonts } from "@/type/types";

import * as fabric from "fabric";
import { ITextProps } from "fabric";

const TextFont = ({
  onChange,
  value,
  fontSize,
}: {
  onChange: (
    property: keyof fabric.Object | keyof ITextProps | "rect",
    value: string | number | number[] | undefined
  ) => void;
  value: string | number | number[] | undefined;
  fontSize: number | undefined;
}) => {
  return (
    <>
      <ToolHeader title="FontSize" description="Change the text font size" />
      <Slider
        defaultValue={[fontSize || 100]}
        onValueChange={(values) => onChange("fontSize", values[0])}
        max={1000}
        min={10}
        step={10}
      />
      <ScrollArea className="h-[70vh] space-y-2 mt-3">
        <ToolHeader title="Font" description="Change the text font" />
        <div className="p-4 space-y-1 border-b">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left",
                value === font && "border-2 border-primary"
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => onChange("fontFamily", font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default TextFont;
