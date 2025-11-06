import { useEffect, useRef, useState } from "react";
import { useCanvas } from "@/store/useCanvas";
import debounce from "lodash.debounce";

export const useCanvasHistory = (
  mutate: (payload: any) => Promise<any>,
  designId: string | undefined
) => {
  const { canvas } = useCanvas();
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const pauseSaving = useRef(false);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const saveToConvex = async () => {
    if (!canvas) return;
    if (!designId) return;
    await mutate({
      id: designId,
      json: canvas.toJSON(),
      thumbnailUrl: canvas.toDataURL({ format: "png", multiplier: 1 }),
    }).catch((error) => {
      console.log(error);
    });
  };

  const saveState = () => {
    if (!canvas || pauseSaving.current) return;

    const json = JSON.stringify(canvas.toJSON());
    undoStack.current.push(json);
    redoStack.current = []; // Clear redo stack on new action

    setCanUndo(undoStack.current.length > 1);
    setCanRedo(false);

    // console.log("Saved state", undoStack.current);
  };

  const undo = () => {
    if (undoStack.current.length <= 1 || !canvas) return;

    pauseSaving.current = true;

    const lastState = undoStack.current.pop(); // Remove current
    const prevState = undoStack.current[undoStack.current.length - 1];

    if (lastState) redoStack.current.push(lastState);
    if (prevState) {
      canvas.loadFromJSON(prevState).then((canvas) => {
        canvas.requestRenderAll();
        pauseSaving.current = false;
        setCanUndo(undoStack.current.length > 1);
        setCanRedo(true);
      });
    } else {
      pauseSaving.current = false;
    }
  };

  const redo = () => {
    if (redoStack.current.length === 0 || !canvas) return;

    pauseSaving.current = true;

    const nextState = redoStack.current.pop();
    if (nextState) {
      undoStack.current.push(nextState);
      canvas.loadFromJSON(nextState).then((canvas) => {
        canvas.requestRenderAll();
        pauseSaving.current = false;
        setCanUndo(true);
        setCanRedo(redoStack.current.length > 0);
      });
    } else {
      pauseSaving.current = false;
    }
  };

  useEffect(() => {
    if (!canvas) return;

    const debouncedSave = debounce(() => {
      saveToConvex();
    }, 500);
    const save = () => {
      debouncedSave();
      saveState();
    };

    canvas.on("object:added", save);
    canvas.on("object:modified", save);
    canvas.on("object:removed", save);

    // Save initial state
    save();

    return () => {
      canvas.off("object:added", save);
      canvas.off("object:modified", save);
      canvas.off("object:removed", save);
    };
  }, [canvas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only when input/textarea is NOT focused
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isInput) return;

      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
  };
};
