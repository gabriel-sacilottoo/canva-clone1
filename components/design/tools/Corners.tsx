import { ToolHeader } from "@/components/global/tool-header";
import { Slider } from "@/components/ui/slider";

import { ITextProps } from "fabric";
import * as fabric from "fabric";

const Corners = ({
  onChange,
  value,
}: {
  onChange: (
    property: keyof fabric.Object | keyof ITextProps | "rect",
    value: string | number | number[]
  ) => void;
  value: number;
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <ToolHeader title={"Adjust Corners"} description={"Adjust Corners"} />

      <Slider
        defaultValue={[value]}
        onValueChange={(values) => onChange("rect", values[0])}
        max={100}
        min={0}
        step={10}
      />
    </div>
  );
};

export default Corners;
