import { create } from "zustand";
import * as fabric from "fabric";

interface useCanvasProps {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;
}

export const useCanvas = create<useCanvasProps>((set) => ({
  canvas: null,
  setCanvas: (canvas) => set({ canvas: canvas }),
}));
