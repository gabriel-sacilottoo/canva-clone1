import { Button } from "@/components/ui/button";
import { useCanvas } from "@/store/useCanvas";
import Colors from "@/components/design/tools/Colors";
import { ToolHeader } from "@/components/global/tool-header";
import { Slider } from "@/components/ui/slider";

import * as fabric from "fabric";

const Draw = () => {
  const { canvas } = useCanvas();
  if (!canvas) return null;
  const pencilBrush = new fabric.PencilBrush(canvas);
  // set pencil brush
  canvas.freeDrawingBrush = pencilBrush;

  // setIsDrawing true or false
  const isDrawingMode = () => {
    if (!canvas) return;
    if (canvas.isDrawingMode) {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
    }
  };

  // choose color
  const chooseColor = (property: string, value: string) => {
    // console.log(value);
    if (!canvas?.freeDrawingBrush) return;
    canvas.freeDrawingBrush.color = value;
    canvas.renderAll();
  };

  // choose brush width
  const onValueChange = (value: number) => {
    if (!canvas?.freeDrawingBrush) return;
    canvas.freeDrawingBrush.width = value;
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button onClick={isDrawingMode}>
        {canvas?.isDrawingMode ? "Cancel Drawing Mode" : "Enter Drawing Mode"}
      </Button>
      <ToolHeader
        title={"Adjust Brush Width"}
        description={"Adjust Brush Width"}
      />
      <Slider
        defaultValue={[5]}
        onValueChange={(values) => onValueChange(values[0])}
        max={100}
        min={0}
        step={10}
      />
      <Colors
        title="Choose Brush Color"
        desc="Choose the Brush color that you would like to use"
        onChange={chooseColor}
        property="backgroundColor"
      />
    </div>
  );
};

export default Draw;
