"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { Button } from "@/components/ui/button";

import { useQuery } from "convex/react";
import Link from "next/link";
import Moment from "react-moment";
import { ImSpinner6 } from "react-icons/im";
import NoItems from "../global/NoItems";

const RecentDesigns = () => {
  const { isOnline } = useNetworkStatusStore();
  const { mutate, pending } = useApiMutation(api.design.deleteDesign);
  const designs = useQuery(api.design.designs);

  if (!isOnline) {
    return null;
  }

  const HandleDelete = async (id: string) => {
    await mutate({
      id,
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="space-y-4 pt-10">
      <h1 className="font-bold text-xl">Recent Designs</h1>
      {designs?.length === 0 && <NoItems text="Possibilities await!" />}
      {designs === undefined ? (
        <div className="flex justify-center items-center h-[40vh]">
          <ImSpinner6 className="size-10 animate-spin" />
        </div>
      ) : (
        <>
          {designs?.map((design) => (
            <div className="recentdesigns-div" key={design._id}>
              <Link
                href={`/design/${design._id}`}
                className="flex gap-4 items-center"
              >
                {!design.thumbnailUrl ? (
                  <div className="size-14 rounded-md bg-white border border-gray-400 dark:border-zinc-700" />
                ) : (
                  <img
                    src={design.thumbnailUrl}
                    alt=""
                    className="size-14 rounded-md"
                  />
                )}
                <p className="text-lightBlue text-lg font-semibold">
                  {design.title}
                </p>
                <p className="text-sm hidden md:flex">
                  {design.width} x {design.height} px
                </p>
              </Link>
              <Moment fromNow>{design._creationTime}</Moment>
              <Button
                variant={"destructive"}
                disabled={pending}
                onClick={() => HandleDelete(design._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecentDesigns;
