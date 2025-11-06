import { downloadFile, transformToText } from "@/lib/utils";

import * as fabric from "fabric";
import { Canvas } from "fabric";

export async function exportAsJson(canvas: Canvas | null, name: string) {
  if (!canvas) return;

  try {
    const dataUrl = canvas.toJSON();

    await transformToText(dataUrl.objects);
    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, "\t")
    )}`;
    downloadFile(fileString, "json", name);
  } catch (e) {
    return false;
  }
}

export function exportAsPng(canvas: Canvas | null, name: string) {
  if (!canvas) return;

  try {
    const dataUrl = canvas.toDataURL({
      format: "png",
      // quality: 1,
      multiplier: 1,
      // enableRetinaScaling: true,
    });
    console.log("dataurl", dataUrl);

    downloadFile(dataUrl, "png", name);
  } catch (e) {
    console.log("Error exporting PNG:", e);
    return false;
  }
}

export function exportJpeg(canvas: Canvas | null, name: string) {
  if (!canvas) return;

  try {
    const dataUrl = canvas.toDataURL({
      format: "jpeg",
      quality: 1,
      multiplier: 1,
      enableRetinaScaling: true,
    });
    downloadFile(dataUrl, "jpeg", name);

    return true;
  } catch (e) {
    return false;
  }
}

export function exportWebp(canvas: Canvas | null, name: string) {
  if (!canvas) return;

  try {
    const dataUrl = canvas.toDataURL({
      format: "webp",
      quality: 1,
      multiplier: 1,
      enableRetinaScaling: true,
    });
    downloadFile(dataUrl, "webp", name);

    return true;
  } catch (e) {
    return false;
  }
}
