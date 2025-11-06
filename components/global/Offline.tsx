"use client";

import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import Image from "next/image";

const Offline = () => {
  const { isOnline } = useNetworkStatusStore();

  if (!isOnline) {
    return (
      <div className="flex flex-col justify-center items-center z-[120]">
        <Image
          src={"/offline.png"}
          alt="offline-png"
          height={300}
          width={300}
        />
        <p className="font-bold">You&apos;re offline right now</p>
        <p className="text-muted-foreground">
          Please connet to the internet to access your designs
        </p>
      </div>
    );
  }
};

export default Offline;
