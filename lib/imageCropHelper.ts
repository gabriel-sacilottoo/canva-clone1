import * as fabric from "fabric";

/**
 * Helper functions for image crop mode functionality
 */

export interface CropModeData {
  isInCropMode: boolean;
  originalScaleX?: number;
  originalScaleY?: number;
  frameOverlay?: fabric.Rect;
}

/**
 * Enter crop mode for an image
 * - Shows the full image with parts outside the frame semi-transparent
 * - Allows panning and zooming of the content
 */
export const enterCropMode = (
  image: fabric.FabricImage,
  canvas: fabric.Canvas
) => {
  if (!image || image.type !== "image") return;

  const clipPath = image.clipPath as fabric.Rect;
  if (!clipPath) return;

  // Store original state
  (image as any).isInCropMode = true;
  (image as any).cropModeOriginalLockMovementX = image.lockMovementX;
  (image as any).cropModeOriginalLockMovementY = image.lockMovementY;
  (image as any).cropModeOriginalLockScalingX = image.lockScalingX;
  (image as any).cropModeOriginalLockScalingY = image.lockScalingY;

  // Get frame dimensions
  const frameWidth = clipPath.width || 0;
  const frameHeight = clipPath.height || 0;

  // Calculate the bounds of the image in canvas coordinates
  const imageLeft = image.left || 0;
  const imageTop = image.top || 0;

  // Get actual image dimensions (scaled)
  const imageWidth = (image.width || 0) * (image.scaleX || 1);
  const imageHeight = (image.height || 0) * (image.scaleY || 1);

  // Create frame border to show the crop area
  const frameBorder = new fabric.Rect({
    left: imageLeft,
    top: imageTop,
    width: frameWidth,
    height: frameHeight,
    fill: "transparent",
    stroke: "rgba(59, 130, 246, 0.9)", // Blue border
    strokeWidth: 3,
    selectable: false,
    evented: false,
    originX: "center",
    originY: "center",
    strokeUniform: true,
  });

  // Create dark overlay for area outside the frame
  // We'll create 4 rectangles to cover the areas outside the frame
  const overlayOpacity = 0.6;
  const overlayColor = "rgba(0, 0, 0, " + overlayOpacity + ")";

  // Top overlay
  const topOverlay = new fabric.Rect({
    left: imageLeft,
    top: imageTop - imageHeight / 2,
    width: imageWidth,
    height: (imageHeight - frameHeight) / 2,
    fill: overlayColor,
    selectable: false,
    evented: false,
    originX: "center",
    originY: "top",
  });

  // Bottom overlay
  const bottomOverlay = new fabric.Rect({
    left: imageLeft,
    top: imageTop + frameHeight / 2,
    width: imageWidth,
    height: (imageHeight - frameHeight) / 2,
    fill: overlayColor,
    selectable: false,
    evented: false,
    originX: "center",
    originY: "top",
  });

  // Left overlay
  const leftOverlay = new fabric.Rect({
    left: imageLeft - imageWidth / 2,
    top: imageTop,
    width: (imageWidth - frameWidth) / 2,
    height: frameHeight,
    fill: overlayColor,
    selectable: false,
    evented: false,
    originX: "left",
    originY: "center",
  });

  // Right overlay
  const rightOverlay = new fabric.Rect({
    left: imageLeft + frameWidth / 2,
    top: imageTop,
    width: (imageWidth - frameWidth) / 2,
    height: frameHeight,
    fill: overlayColor,
    selectable: false,
    evented: false,
    originX: "left",
    originY: "center",
  });

  // Store overlays for later removal
  (image as any).frameBorder = frameBorder;
  (image as any).cropOverlays = [
    topOverlay,
    bottomOverlay,
    leftOverlay,
    rightOverlay,
  ];

  // Add overlays to canvas
  canvas.add(topOverlay);
  canvas.add(bottomOverlay);
  canvas.add(leftOverlay);
  canvas.add(rightOverlay);
  canvas.add(frameBorder);

  // Temporarily remove clipPath to show full image
  const tempClipPath = image.clipPath;
  image.clipPath = undefined;

  // Store clipPath for later
  (image as any).tempClipPath = tempClipPath;

  // Allow moving the image content
  image.set({
    lockMovementX: false,
    lockMovementY: false,
    lockScalingX: false,
    lockScalingY: false,
    lockRotation: true,
    lockScalingFlip: true,
  });

  // Bring image and overlays to front
  canvas.bringObjectToFront(image);
  canvas.bringObjectToFront(topOverlay);
  canvas.bringObjectToFront(bottomOverlay);
  canvas.bringObjectToFront(leftOverlay);
  canvas.bringObjectToFront(rightOverlay);
  canvas.bringObjectToFront(frameBorder);

  canvas.renderAll();
};

/**
 * Exit crop mode for an image
 * - Restores the clipPath
 * - Removes the overlay
 */
export const exitCropMode = (
  image: fabric.FabricImage,
  canvas: fabric.Canvas
) => {
  if (!image || !(image as any).isInCropMode) return;

  // Restore clipPath
  const tempClipPath = (image as any).tempClipPath;
  if (tempClipPath) {
    image.clipPath = tempClipPath;
  }

  // Remove frame border
  const frameBorder = (image as any).frameBorder;
  if (frameBorder) {
    canvas.remove(frameBorder);
    (image as any).frameBorder = null;
  }

  // Remove all overlays
  const overlays = (image as any).cropOverlays;
  if (overlays && Array.isArray(overlays)) {
    overlays.forEach((overlay) => {
      canvas.remove(overlay);
    });
    (image as any).cropOverlays = null;
  }

  // Restore original locks
  image.set({
    lockMovementX: (image as any).cropModeOriginalLockMovementX || false,
    lockMovementY: (image as any).cropModeOriginalLockMovementY || false,
    lockScalingX: (image as any).cropModeOriginalLockScalingX || false,
    lockScalingY: (image as any).cropModeOriginalLockScalingY || false,
  });

  (image as any).isInCropMode = false;
  delete (image as any).tempClipPath;

  canvas.renderAll();
};

/**
 * Update overlay positions when image moves in crop mode
 */
export const updateCropOverlays = (
  image: fabric.FabricImage,
  canvas: fabric.Canvas
) => {
  if (!image || !(image as any).isInCropMode) return;

  const clipPath = (image as any).tempClipPath as fabric.Rect;
  if (!clipPath) return;

  const frameWidth = clipPath.width || 0;
  const frameHeight = clipPath.height || 0;

  const imageLeft = image.left || 0;
  const imageTop = image.top || 0;

  const imageWidth = (image.width || 0) * (image.scaleX || 1);
  const imageHeight = (image.height || 0) * (image.scaleY || 1);

  // Update frame border
  const frameBorder = (image as any).frameBorder;
  if (frameBorder) {
    frameBorder.set({
      left: imageLeft,
      top: imageTop,
    });
    frameBorder.setCoords();
  }

  // Update overlays
  const overlays = (image as any).cropOverlays;
  if (overlays && Array.isArray(overlays)) {
    const [topOverlay, bottomOverlay, leftOverlay, rightOverlay] = overlays;

    // Update top overlay
    topOverlay.set({
      left: imageLeft,
      top: imageTop - imageHeight / 2,
      width: imageWidth,
      height: (imageHeight - frameHeight) / 2,
    });
    topOverlay.setCoords();

    // Update bottom overlay
    bottomOverlay.set({
      left: imageLeft,
      top: imageTop + frameHeight / 2,
      width: imageWidth,
      height: (imageHeight - frameHeight) / 2,
    });
    bottomOverlay.setCoords();

    // Update left overlay
    leftOverlay.set({
      left: imageLeft - imageWidth / 2,
      top: imageTop,
      width: (imageWidth - frameWidth) / 2,
      height: frameHeight,
    });
    leftOverlay.setCoords();

    // Update right overlay
    rightOverlay.set({
      left: imageLeft + frameWidth / 2,
      top: imageTop,
      width: (imageWidth - frameWidth) / 2,
      height: frameHeight,
    });
    rightOverlay.setCoords();
  }

  canvas.renderAll();
};

/**
 * Toggle crop mode for an image
 */
export const toggleCropMode = (
  image: fabric.FabricImage,
  canvas: fabric.Canvas
) => {
  if ((image as any).isInCropMode) {
    exitCropMode(image, canvas);
  } else {
    enterCropMode(image, canvas);
  }
};

/**
 * Ensure image always covers the frame (minimum zoom)
 */
export const ensureImageCoversFrame = (
  image: fabric.FabricImage
): boolean => {
  const clipPath = (image as any).tempClipPath || image.clipPath as fabric.Rect;
  if (!clipPath) return false;

  const frameWidth = clipPath.width || 0;
  const frameHeight = clipPath.height || 0;

  const imageWidth = (image.width || 0) * (image.scaleX || 1);
  const imageHeight = (image.height || 0) * (image.scaleY || 1);

  // Calculate minimum scale to cover frame
  const minScaleX = frameWidth / (image.width || 1);
  const minScaleY = frameHeight / (image.height || 1);
  const minScale = Math.max(minScaleX, minScaleY);

  // Check if current scale is below minimum
  const currentScale = Math.min(image.scaleX || 1, image.scaleY || 1);

  if (currentScale < minScale) {
    // Restore to minimum scale
    image.set({
      scaleX: minScale,
      scaleY: minScale,
    });
    return true;
  }

  return false;
};

/**
 * Restrict image controls to corner handles only
 */
export const restrictToCornerHandles = (image: fabric.FabricImage) => {
  image.setControlsVisibility({
    mt: false, // middle top
    mb: false, // middle bottom
    ml: false, // middle left
    mr: false, // middle right
    tl: true,  // top left
    tr: true,  // top right
    bl: true,  // bottom left
    br: true,  // bottom right
    mtr: false, // rotation handle
  });
};

/**
 * Setup image for crop functionality
 * - Restricts resize handles to corners only
 * - Maintains aspect ratio on resize
 */
export const setupImageForCrop = (image: fabric.FabricImage) => {
  // Restrict to corner handles only
  restrictToCornerHandles(image);

  // Ensure proportional scaling (aspect ratio maintained)
  image.set({
    lockScalingFlip: true,
    lockRotation: false,
  });

  // Store the aspect ratio of the frame
  const clipPath = image.clipPath as fabric.Rect;
  if (clipPath && !(image as any).aspectRatio) {
    const frameAspectRatio = (clipPath.width || 1) / (clipPath.height || 1);
    (image as any).aspectRatio = frameAspectRatio;
    (image as any).aspectRatioLabel = "4:3"; // default
  }
};
