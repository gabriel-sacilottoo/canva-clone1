import {
  Youtube,
  Image,
  Palette,
  Heart,
  Type,
  Sticker,
  Printer,
  Sparkles,
  Wand2,
  FileImage,
  FileJson,
} from "lucide-react";

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "saturation",
  "gamma",
];

export const fonts = [
  "serif",
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const DIAMOND_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const TRIANGLE_OPTIONS = {
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0,
  rx: 0, // Horizontal corner radius
  ry: 0, // Vertical corner radius
};

export const TEXT_OPTIONS = {
  left: 100, // X position
  top: 100, // Y position
  fontFamily: "serif", // Font family
  fill: "#333333", // Text color
  selectable: true, // Allow selection and editing
  fontStyle: "normal",
  linethrough: false,
  underline: false,
  textAlign: "left",
};
export const designTypes = [
  {
    icon: Youtube,
    label: "YouTube Thumbnail",
    bgColor: "text-red-500",
    width: 1240,
    height: 720,
  },
  {
    icon: Image,
    label: "Logo Design",
    bgColor: "text-purple-500",
    width: 400,
    height: 465,
  },
  {
    icon: Palette,
    label: "Color Palette",
    bgColor: "text-blue-500",
    width: 500,
    height: 500,
  },
  {
    icon: Type,
    label: "Typography",
    bgColor: "text-green-500",
    width: 200,
    height: 200,
  },
  {
    icon: Heart,
    label: "Social Media",
    bgColor: "text-red-400",
    width: 825,
    height: 465,
  },
  {
    icon: Sticker,
    label: "Stickers",
    bgColor: "text-pink-500",
    width: 250,
    height: 250,
  },
  {
    icon: Printer,
    label: "Printables",
    bgColor: "text-purple-500",
    width: 600,
    height: 600,
  },
  {
    icon: Sparkles,
    label: "AI Background",
    bgColor: "text-blue-600",
    width: 825,
    height: 465,
  },
  {
    icon: Wand2,
    label: "AI Image Gen",
    bgColor: "text-violet-600",
    width: 825,
    height: 465,
  },
];

export const exportFormats = [
  {
    id: "png",
    name: "PNG Image",
    icon: FileImage,
  },
  {
    id: "jpeg",
    name: "JPEG Image",
    icon: FileImage,
  },
  {
    id: "webp",
    name: "WEBP Image",
    icon: FileImage,
  },
  // {
  //   id: "pdf",
  //   name: "PDF Document",
  //   icon: File,
  // },
  {
    id: "json",
    name: "JSON Template",
    icon: FileJson,
  },
];
