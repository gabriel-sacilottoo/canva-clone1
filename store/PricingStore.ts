import { create } from "zustand";

interface PricingStoreProps {
  isPricing: boolean;
  setIsPricing: (isPricing: boolean) => void;
}

export const usePricingStore = create<PricingStoreProps>((set) => ({
  isPricing: false,
  setIsPricing: (isPricing) => set({ isPricing: isPricing }),
}));
