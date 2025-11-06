import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFilter } from "@/lib/utils";
import { useCanvas } from "@/store/useCanvas";
import { filters } from "@/type/types";

import * as fabric from "fabric";

const ImageFilters = () => {
  const { canvas } = useCanvas();
  const changeImageFilter = (value: string) => {
    const objects = canvas?.getActiveObjects();
    objects?.forEach((object) => {
      if (object.type === "image") {
        // console.log(object);
        const imageObject = object as fabric.Image;

        const effect = createFilter(value);

        imageObject.filters = effect ? [effect] : [];
        imageObject.applyFilters();
        canvas?.renderAll();
      }
    });
  };
  return (
    <div>
      <ToolHeader
        title="Filters"
        description="Apply a filter to selected image"
      />
      <ScrollArea className="h-[70vh]">
        <div className="space-y-1 border-b">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="outline"
              size="lg"
              className="h-14 justify-start text-left w-[370px]"
              onClick={() => changeImageFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ImageFilters;
