import { create } from "zustand";

interface NetworkStatusStoreProps {
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export const useNetworkStatusStore = create<NetworkStatusStoreProps>((set) => ({
  isOnline: false,
  setIsOnline: (isOnline) => set({ isOnline: isOnline }),
}));
