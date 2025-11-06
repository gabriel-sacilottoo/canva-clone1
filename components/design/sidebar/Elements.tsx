import { FaRegCircle } from "react-icons/fa6";
import { IoTriangleOutline } from "react-icons/io5";
import { LuDiamond } from "react-icons/lu";
import { BiRectangle } from "react-icons/bi";
import * as fabric from "fabric";

import ElementCard from "./ElementCard";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  RECTANGLE_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/type/types";
import { ToolHeader } from "@/components/global/tool-header";
import { useCanvas } from "@/store/useCanvas";

const Elements = () => {
  const { canvas } = useCanvas();

  const addRect = () => {
    const rect = new fabric.Rect({
      ...RECTANGLE_OPTIONS,
    });
    canvas?.add(rect);
    canvas?.setActiveObject(rect); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addCirle = () => {
    const circle = new fabric.Circle({
      ...CIRCLE_OPTIONS,
    });
    canvas?.add(circle);
    canvas?.setActiveObject(circle); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addTriangle = () => {
    const Triangle = new fabric.Triangle({
      ...TRIANGLE_OPTIONS,
    });
    canvas?.add(Triangle);
    canvas?.setActiveObject(Triangle); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  const addDiamond = () => {
    const points = [
      { x: 0, y: -50 },
      { x: 50, y: 0 },
      { x: 0, y: 50 },
      { x: -50, y: 0 },
    ];
    const Polygon = new fabric.Polygon(points, {
      ...DIAMOND_OPTIONS,
    });
    canvas?.add(Polygon);
    canvas?.setActiveObject(Polygon); // Set the text as the active object (optional)
    canvas?.requestRenderAll();
  };

  return (
    <div className="flex flex-col space-y-2">
      <ToolHeader
        title="Elements"
        description="Addd elemnents to your design"
      />
      <div className="flex gap-2">
        <ElementCard onClick={addRect} Icon={BiRectangle} Text="Rectangle" />
        <ElementCard onClick={addCirle} Icon={FaRegCircle} Text="Circle" />

        <ElementCard
          onClick={addTriangle}
          Icon={IoTriangleOutline}
          Text="Triangle"
        />
        <ElementCard onClick={addDiamond} Icon={LuDiamond} Text="Diamond" />
      </div>
    </div>
  );
};

export default Elements;
