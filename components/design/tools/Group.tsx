import { Hint } from "@/components/global/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCanvas } from "@/store/useCanvas";

import * as fabric from "fabric";
import { FaLayerGroup } from "react-icons/fa";

const Group = () => {
  const { canvas } = useCanvas();
  const activeObject = canvas?.getActiveObject();

  const groupSelectedObjects = () => {
    const selectedObjects = canvas?.getActiveObjects();

    if (selectedObjects && selectedObjects.length > 1) {
      // Proceed only if more than one object is selected
      // Create a new group with selected objects
      const group = new fabric.Group(selectedObjects, {
        left: 150,
        top: 100,
      });

      // Add group to canvas and remove individual objects
      canvas?.add(group);
      selectedObjects.forEach((obj) => canvas?.remove(obj)); // Remove selected objects
      canvas?.setActiveObject(group); // Set the group as the active selection
    }

    if (activeObject && activeObject.type === "group") {
      const group = activeObject as fabric.Group;
      const items = group.getObjects();
      //   console.log(items);
      group.remove();
      canvas?.remove(activeObject);
      for (const item of items) {
        canvas?.add(item);
        canvas?.item(canvas?.size() - 1)?.set("hasControls", true);
      }

      canvas?.discardActiveObject();
    }
    canvas?.renderAll(); // Re-render the canvas to show updates
  };
  return (
    <div className="flex items-center h-full justify-center">
      <Hint label="Group" side="bottom" sideOffset={5}>
        <Button
          size="icon"
          variant="ghost"
          onClick={groupSelectedObjects}
          className={cn(
            activeObject &&
              activeObject.type === "group" &&
              "bg-gray-200 dark:bg-darkHover"
          )}
        >
          <FaLayerGroup className="size-5" />
        </Button>
      </Hint>
    </div>
  );
};

export default Group;
