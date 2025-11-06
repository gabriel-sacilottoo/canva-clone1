import ColorPicker from "react-best-gradient-color-picker";
import { ToolHeader } from "@/components/global/tool-header";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import { TFiller } from "fabric";
import * as fabric from "fabric";

interface ColorPickerProps {
  value?: string | TFiller;
  onChange: (property: keyof fabric.Object, value: string) => void;
  property?: keyof fabric.Object;
  title: string;
  desc: string;
}
const Colors = ({
  value,
  onChange,
  property,
  title,
  desc,
}: ColorPickerProps) => {
  const [color, setColor] = useState(
    typeof value === "string" ? value : "#000000"
  );
  const handleColorChange = (color: string) => {
    setColor(color);
    // console.log(color);

    onChange(property!, color);
  };
  return (
    <>
      <ToolHeader title={title} description={desc} />
      <ScrollArea className="h-[70vh] p-2">
        <ColorPicker
          value={color}
          onChange={(color) => handleColorChange(color)}
        />
      </ScrollArea>
    </>
  );
};
export default Colors;
