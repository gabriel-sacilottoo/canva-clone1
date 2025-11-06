import { useEffect, useRef, useState } from "react";
import { useCanvas } from "@/store/useCanvas";
import debounce from "lodash.debounce";
import { toast } from "sonner";

export const useCanvasHistory = (
  mutate: (payload: any) => Promise<any>,
  designId: string | undefined
) => {
  const { canvas } = useCanvas();
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);
  const pauseSaving = useRef(false);
  const previousJson = useRef<string | null>(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const saveToConvex = async () => {
    if (!canvas || !designId) return;
    // toast.success("Saving design...");
    await mutate({
      id: designId,
      json: canvas.toJSON(),
      thumbnailUrl: canvas.toDataURL({ format: "png", multiplier: 1 }),
    }).catch((error) => {
      console.log(error);
    });
  };

  const debouncedSave = debounce(() => {
    saveToConvex();
  }, 500);

  const saveState = () => {
    if (!canvas || pauseSaving.current) return;

    const json = JSON.stringify(canvas.toJSON());
    if (previousJson.current !== json) {
      undoStack.current.push(json);
      previousJson.current = json;
      redoStack.current = [];
      debouncedSave();

      setCanUndo(undoStack.current.length > 1);
      setCanRedo(false);
    }
  };

  const undo = () => {
    if (undoStack.current.length <= 1 || !canvas) return;

    pauseSaving.current = true;

    const lastState = undoStack.current.pop();
    const prevState = undoStack.current[undoStack.current.length - 1];

    if (lastState) redoStack.current.push(lastState);
    if (prevState) {
      canvas.loadFromJSON(prevState).then((canvas) => {
        canvas.requestRenderAll();
        previousJson.current = prevState;
        debouncedSave();
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
        previousJson.current = nextState;
        pauseSaving.current = false;
        debouncedSave();
        setCanUndo(true);
        setCanRedo(redoStack.current.length > 0);
      });
    } else {
      pauseSaving.current = false;
    }
  };

  useEffect(() => {
    if (!canvas) return;

    const checkAndSave = () => {
      saveState();
    };

    canvas.on("object:added", checkAndSave);
    canvas.on("object:modified", checkAndSave);
    canvas.on("object:removed", checkAndSave);

    const interval = setInterval(() => {
      saveState();
    }, 1000);

    saveState();

    return () => {
      canvas.off("object:added", checkAndSave);
      canvas.off("object:modified", checkAndSave);
      canvas.off("object:removed", checkAndSave);
      clearInterval(interval);
    };
  }, [canvas]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, []);

  return {
    canUndo,
    canRedo,
    undo,
    redo,
  };
};
