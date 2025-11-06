"use client";

import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import { useEffect, useState } from "react";
import { IoCloudOfflineOutline } from "react-icons/io5";

export default function NetworkStatus() {
  const { isOnline, setIsOnline } = useNetworkStatusStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Define the event listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners for 'online' and 'offline' events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!isOnline) {
    return (
      <div className="flex justify-center items-center">
        <div className="network-div">
          <div className="ml-3 text-sm font-normal flex items-center">
            {!isOnline && (
              <>
                <IoCloudOfflineOutline className="mr-2 size-4" />
                You are Offline
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
