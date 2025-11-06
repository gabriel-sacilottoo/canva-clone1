import * as fabric from "fabric";
import { PiTextTBold } from "react-icons/pi";

import { useCanvas } from "@/store/useCanvas";
import { Button } from "@/components/ui/button";
import { TEXT_OPTIONS } from "@/type/types";
import { ToolHeader } from "@/components/global/tool-header";

const Text = () => {
  const { canvas } = useCanvas();

  type TextStyle = "heading" | "subheading" | "small";

  // addText
  const addText = (text: string, style: TextStyle) => {
    const options = (values: { fontSize: number; fontWeight: number }) => {
      const textObject = new fabric.IText(text, { ...TEXT_OPTIONS, ...values });
      if (canvas) {
        canvas.add(textObject);
        canvas.setActiveObject(textObject);
        canvas.renderAll();
      }
    };

    if (style === "heading") {
      options({ fontSize: 36, fontWeight: 500 });
    } else if (style === "subheading") {
      options({ fontSize: 24, fontWeight: 200 });
    } else if (style === "small") {
      options({ fontSize: 14, fontWeight: 100 });
    }
  };

  const textBox = () => {
    const textObject = new fabric.Textbox("Added a Text box", TEXT_OPTIONS);
    if (canvas) {
      canvas.add(textObject); // Add the text object to the canvas
      canvas.setActiveObject(textObject); // Set the text as the active object (optional)
      canvas.renderAll(); // Re-render the canvas
    }
  };

  return (
    <div className="flex flex-col sa space-y-2">
      <ToolHeader title="Text" description="Addd text to your design" />
      <Button onClick={textBox}>
        <PiTextTBold className="mr-2" />
        Add Text Box
      </Button>
      <h2 className="font-semibold text-xs">Default Text Styles</h2>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700 font-extrabold text-3xl"
        onClick={() => addText("Added a heading", "heading")}
      >
        Add a heading
      </Button>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700 font-bold text-lg"
        onClick={() => addText("Added a subheading", "subheading")}
      >
        Add a subheading
      </Button>
      <Button
        variant={"ghost"}
        className="border border-gray-400 dark:border-zinc-700"
        onClick={() => addText("Added a little bit of body text", "small")}
      >
        Add a little bit of body text
      </Button>
    </div>
  );
};

export default Text;
