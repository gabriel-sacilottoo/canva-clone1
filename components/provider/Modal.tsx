"use client";

import { useState, useEffect } from "react";

import LoginModal from "@/components/modal/LoginModal";
import PlansModal from "@/components/modal/PlansModal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <PlansModal />
    </>
  );
};
