"use client";

import { api } from "@/convex/_generated/api";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { useCanvas } from "@/store/useCanvas";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useQuery } from "convex/react";
import { usePathname, useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ImSpinner6 } from "react-icons/im";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";
import NoItems from "@/components/global/NoItems";
import { designProps } from "@/type";
import { FaCrown } from "react-icons/fa";
import { usePricingStore } from "@/store/PricingStore";
import { toast } from "sonner";

const Templates = () => {
  const { canvas } = useCanvas();
  const { isOnline } = useNetworkStatusStore();
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useCurrentUser();
  const { setIsLogin } = useLoginStore();
  const { setIsPricing } = usePricingStore();

  const designs = useQuery(api.design.publishedDesigns);
  const { mutate, pending } = useApiMutation(api.design.createDesign);

  if (!isOnline) {
    return null;
  }

  const handleSelect = async (design: designProps) => {
    if (!data) {
      setIsLogin(true);
      return;
    }
    if (design.userId === data?._id) {
      toast.error("You cannot use your own design");
      return;
    }
    if (design.isPro && !data?.isPro) {
      setIsPricing(true);
      return;
    }
    if (pathname === "/") {
      await mutate({
        title: "untitled design",
        json: design.json,
        height: design.height,
        width: design.width,
        isPro: false,
        category: "",
        published: false,
      })
        .then((id) => {
          // console.log(id);
          router.push(`/design/${id}`);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (!canvas) return;
      canvas
        .loadFromJSON(design.json)
        .then((canvas) => canvas.requestRenderAll())
        .catch((error) => {
          console.error("Error loading JSON:", error);
          // Handle the error as needed, e.g., show an error message to the user
        });
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl mb-2">
        Templates for absolutely anything
      </h1>
      <p className="text-lg mb-4 text-gray-500 dark:text-zinc-400">
        Customize an office template, or design something more personal, like an
        invitation.
      </p>
      {designs?.length === 0 && <NoItems text="No Published Projects" />}
      {designs === undefined ? (
        <div className="flex justify-center items-center h-[40vh]">
          <ImSpinner6 className="size-10 animate-spin" />
        </div>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {designs?.map((design) => (
              <button
                className="rounded-md cursor-pointer h-fit disabled:opacity-50 disabled:cursor-not-allowed relative border border-gray-400 dark:border-zinc-700"
                key={design._id}
                onClick={() => handleSelect(design)}
                disabled={pending}
                type="button"
              >
                <div className="gap-4 items-center space-y-2">
                  {!design.thumbnailUrl ? (
                    <div className="h-60 w-md rounded-md bg-white border border-gray-400 dark:border-zinc-700" />
                  ) : (
                    <img
                      src={design.thumbnailUrl}
                      alt=""
                      className="rounded-md"
                    />
                  )}
                </div>
                {design.isPro && (
                  <span className="p-1.5 bg-white rounded-full absolute -top-2 -right-2 border border-gray-400 dark:border-zinc-700">
                    <FaCrown className="size-4 text-orange-300" />
                  </span>
                )}
              </button>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
};

export default Templates;
