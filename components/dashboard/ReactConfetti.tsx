"use client";

import { runFireworks } from "@/lib/Confetti";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ReactConfetti = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || "false";
  if (success === "true") {
    useEffect(() => {
      runFireworks();
    }, []);
    return <div className="hidden"></div>;
  }
};

export default ReactConfetti;
