import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { ChevronDown, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ITextProps } from "fabric";
import * as fabric from "fabric";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/global/hint";
import { Button } from "@/components/ui/button";
import { useActiveElementStore } from "@/store/ActiveEelement";
import HovercardGlobal from "@/components/global/HovercardGlobal";
import TextFont from "./TextFont";

const Text = ({
  updateSelectedText,
}: {
  updateSelectedText: (
    property: keyof fabric.Object | keyof ITextProps | "rect",
    value: string | number | boolean | number[] | undefined
  ) => void;
}) => {
  const { activeElement } = useActiveElementStore();
  return (
    <>
      {/* Font */}
      <div className="flex items-center h-full justify-center">
        <HovercardGlobal
          trigger={
            <Hint label="Font" side="bottom" sideOffset={5}>
              <Button
                size="icon"
                variant="ghost"
                className={cn("w-auto px-2 text-sm")}
              >
                <div className="max-w-[100px] truncate">
                  {activeElement?.fontFamily}
                </div>
                <ChevronDown className="size-4 ml-2 shrink-0" />
              </Button>
            </Hint>
          }
          content={
            <TextFont
              onChange={updateSelectedText}
              value={activeElement?.fontFamily}
              fontSize={activeElement?.fontSize}
            />
          }
          side={"bottom"}
        />
      </div>
      {/* fontWeight */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Bold" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue =
                (activeElement?.fontWeight as number) > 500 ? 500 : 700;
              // console.log(newValue);
              updateSelectedText("fontWeight", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              (activeElement?.fontWeight as number) > 500 &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaBold className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* fontStyle => normal or italic */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Italic" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isItalic = activeElement?.fontStyle === "italic";
              const newValue = isItalic ? "normal" : "italic";
              updateSelectedText("fontStyle", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.fontStyle === "italic" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaItalic className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Underline */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Underline" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue = activeElement?.underline ? false : true;

              updateSelectedText("underline", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.underline && "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaUnderline className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Strike */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Strike" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const newValue = activeElement?.linethrough ? false : true;

              updateSelectedText("linethrough", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.linethrough && "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <FaStrikethrough className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Align left */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Align left" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "left";
              const newValue = isLeft ? "" : "left";
              // console.log(activeElement?.textAlign);

              updateSelectedText("textAlign", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "left" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignLeft className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Align center */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Align center" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "center";
              // console.log(activeElement?.textAlign);
              const newValue = isLeft ? "" : "center";
              updateSelectedText("textAlign", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "center" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignCenter className="size-4" />
          </Button>
        </Hint>
      </div>

      {/* Align right */}
      <div className="flex items-center h-full justify-center">
        <Hint label="Align right" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              const isLeft = activeElement?.textAlign === "right";
              const newValue = isLeft ? "" : "right";
              // console.log(activeElement?.textAlign);
              updateSelectedText("textAlign", newValue);
            }}
            size="icon"
            variant="ghost"
            className={cn(
              activeElement?.textAlign === "right" &&
                "bg-gray-200 dark:bg-darkHover"
            )}
          >
            <AlignRight className="size-4" />
          </Button>
        </Hint>
      </div>
    </>
  );
};

export default Text;
