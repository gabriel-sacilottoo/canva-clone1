import { create } from "zustand";

interface LoginStoreProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const useLoginStore = create<LoginStoreProps>((set) => ({
  isLogin: false,
  setIsLogin: (isLogin) => set({ isLogin: isLogin }),
}));
