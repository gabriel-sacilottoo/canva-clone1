import { User, UserPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Export from "./Export";
import { useCanvas } from "@/store/useCanvas";

import { useRef, ChangeEventHandler } from "react";
import { CiImport, CiExport } from "react-icons/ci";
import { toast } from "sonner";
export function FileDropdown() {
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { canvas } = useCanvas();

  const loadJson: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    // console.log("file selected.", file);
    if (!file) {
      toast.error("No file selected.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const fileContent = reader.result as string;
        const data = JSON.parse(fileContent);
        if (!canvas) return;
        // Loading the JSON data into the canvas
        canvas.loadFromJSON(data).then((canvas) => canvas.requestRenderAll());
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file, "UTF-8");
    canvas?.renderAll();
    canvas?.requestRenderAll();
  };

  return (
    <>
      <input type="file" hidden ref={filePickerRef} onChange={loadJson} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <p className="font-bold cursor-pointer">File</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 dark:bg-dark z-[100] border-none">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                filePickerRef.current?.click();
              }}
            >
              <CiImport />
              <span>Load JSON</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CiExport className="mr-2" />
                <span>Export</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <Export />
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
