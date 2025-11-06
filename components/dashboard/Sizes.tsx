"use client";

import SizeCard from "@/components/dashboard/SizeCard";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { designTypes } from "@/type/types";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import * as fabric from "fabric";

const Sizes = () => {
  const { isOnline } = useNetworkStatusStore();
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.design.createDesign);

  if (!isOnline) {
    return null;
  }
  return (
    <div className="sizes-grid">
      {designTypes.map((design, i) => {
        const handleClick = async () => {
          await mutate({
            title: "untitled design",
            json: {
              version: fabric.version,
              objects: [],
              background: "#f0f0f0",
            },
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
        };

        return (
          <Button
            key={i}
            className="size-btn size-32 group"
            onClick={handleClick}
            disabled={pending}
            variant={"ghost"}
          >
            <SizeCard
              name={design.label}
              Icon={design.icon}
              color={design.bgColor}
              backgroundColor="#fee2e2"
              height={design.height}
              width={design.width}
            />
          </Button>
        );
      })}
    </div>
  );
};

export default Sizes;
