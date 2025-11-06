"use client";

import Banner from "@/components/dashboard/Banner";
import RecentDesigns from "@/components/dashboard/RecentDesigns";
import Sizes from "@/components/dashboard/Sizes";
import Offline from "@/components/global/Offline";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { runFireworks } from "@/lib/Confetti";

import { useSearchParams, redirect } from "next/navigation";
import { useEffect } from "react";

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") || "false";
  const { data } = useCurrentUser();

  if (!data) {
    redirect("");
  }

  useEffect(() => {
    if (success === "true") {
      runFireworks();
    }
  }, []);
  return (
    <div className="flex flex-col space-y-6 p-10 mx-auto py-10">
      <Banner />
      <Offline />
      <Sizes />
      <RecentDesigns />
    </div>
  );
};

export default DashboardPage;
