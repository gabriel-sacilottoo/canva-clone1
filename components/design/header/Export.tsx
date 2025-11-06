import {
  DropdownMenuItem,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { exportFormats } from "@/type/types";
import {
  exportAsJson,
  exportAsPng,
  exportJpeg,
  exportWebp,
} from "./ExportFunctions";
import { useCanvas } from "@/store/useCanvas";
const Export = () => {
  const { canvas } = useCanvas();

  const exportTo = (
    format: "png" | "pdf" | "svg" | "json" | "jpeg" | "webp"
  ) => {
    if (format === "png") {
      exportAsPng(canvas, "name");
    } else if (format === "jpeg") {
      exportJpeg(canvas, "name");
    } else if (format === "json") {
      exportAsJson(canvas, "name");
    } else if (format === "webp") {
      exportWebp(canvas, "name");
    }
  };

  return (
    <DropdownMenuSubContent className="w-56 dark:bg-dark border-none">
      {exportFormats.map((format) => (
        <DropdownMenuItem
          key={format.id}
          className="cursor-pointer border-b border-gray-400 dark:border-zinc-700"
          onClick={() => exportTo(format.id as "png" | "pdf" | "svg" | "json")}
        >
          <format.icon className="size-8" />
          <span>{format.name}</span>
        </DropdownMenuItem>
      ))}
    </DropdownMenuSubContent>
  );
};

export default Export;
