"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

const Toast = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme as "light" | "dark" | "system" | undefined}
      position="bottom-right"
    />
  );
};

export default Toast;
