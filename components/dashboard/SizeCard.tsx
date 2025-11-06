"use client";

import { cn } from "@/lib/utils";

import { IconType } from "react-icons/lib";

const SizeCard = ({
  backgroundColor,
  color,
  Icon,
  height,
  width,
  name,
}: {
  color: string;
  Icon: IconType;
  backgroundColor: string;
  height: number;
  width: number;
  name: string;
}) => {
  const size = `${width}x${height} px`;

  return (
    <>
      <div
        className="p-4 rounded-full transition-all duration-300"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <Icon className={cn("group-hover:animate-bounce", color)} />
      </div>
      <p className="text-xs text-center">{name}</p>
      <p className="text hidden group-hover:flex">{size}</p>
    </>
  );
};

export default SizeCard;
