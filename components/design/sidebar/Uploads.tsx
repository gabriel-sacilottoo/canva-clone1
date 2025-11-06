import { DeleteImage } from "@/actions/deleteImage";
import { ToolHeader } from "@/components/global/tool-header";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useCanvas } from "@/store/useCanvas";
import { UploadButton } from "@/lib/uploadthing";
import Offline from "@/components/global/Offline";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";
import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { useQuery } from "convex/react";
import { useTransition } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import * as fabric from "fabric";
import { ImSpinner6 } from "react-icons/im";
import NoItems from "@/components/global/NoItems";

const Uploads = () => {
  const { canvas } = useCanvas();
  const { isOnline } = useNetworkStatusStore();
  const [deletePending, startTransition] = useTransition();
  const userImages = useQuery(api.images.getImages);
  const { mutate, pending } = useApiMutation(api.images.createImages);
  const { mutate: updateMutate, pending: updatePending } = useApiMutation(
    api.images.updateImages
  );
  // console.log(userImages?.images);
  if (!isOnline) {
    return <Offline />;
  }

  const handleUpload = async (images: string[]) => {
    // console.log("Images: ", images);
    if (!images || images.length === 0) {
      toast.error("No images uploaded");
      return;
    }
    if (userImages === null) {
      await mutate({
        images: images,
      });
    } else {
      await updateMutate({
        id: userImages?._id,
        images: [...(userImages?.images || []), ...images],
      });
    }
  };

  // delete image
  const handleDelete = async (image: string) => {
    startTransition(async () => {
      try {
        await DeleteImage({ files: [image] });
      } catch (error) {
        console.log(error);
      } finally {
        const updatedImages = userImages?.images.filter((img) => img !== image);
        await updateMutate({
          id: userImages?._id,
          images: updatedImages,
        });
        toast("Image Deleted");
      }
    });
  };

  const addToCanvas = (image: string) => {
    fabric.FabricImage.fromURL(image, { crossOrigin: "anonymous" })
      .then((img) => {
        // Make sure image has loaded dimensions
        const clipPath = new fabric.Rect({
          width: img.width!,
          height: img.height!,
          rx: 0,
          ry: 0,
          originX: "center",
          originY: "center",
        });

        img.set({
          clipPath,
          originX: "center",
          originY: "center",
        });
        canvas?.add(img);
        canvas?.setActiveObject(img);
        canvas?.renderAll();
      })
      .catch((e) => {
        console.error("Error loading image", e);
      });
  };

  return (
    <ScrollArea className="h-[70vh]">
      <div className="flex flex-col w-full">
        <ToolHeader title="Upload Images" description="Upload Images" />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const images = res?.map((file) => file.ufsUrl);
            handleUpload(images);
            // console.log("Files: ", res);
            toast("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.error("Upload Failed");
            console.log(`ERROR! ${error.message}`);
          }}
          // className="w-[400px]"
          appearance={{
            button:
              "bg-primary ut-ready:bg-primary ut-uploading:cursor-not-allowed rounded-md bg-none after:bg-primary/20 w-[370px]",
            container:
              "w-max flex space-y-2 mt-2 rounded-md border-cyan-300 bg-slate-800",
            allowedContent:
              "flex h-8 flex-col items-center justify-center px-2 text-white",
          }}
          disabled={pending || updatePending}
        />
        <ToolHeader
          title="Images"
          description="Choose an image to add to your canvas"
        />
        {userImages?.images.length === 0 && (
          <NoItems text="No Images to Show" />
        )}
        {userImages === undefined ? (
          <div className="flex justify-center items-center h-[40vh]">
            <ImSpinner6 className="size-10 animate-spin" />
          </div>
        ) : (
          <div className="image-grid">
            {userImages?.images.map((image) => (
              <div key={image} className="relative cursor-pointer hover:p-1">
                <img
                  src={image}
                  alt="image"
                  onClick={() => addToCanvas(image)}
                  className="h-fit border dark:border-gray-500 rounded-md"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(image)}
                  className="absolute top-2 right-2 size-8"
                  disabled={pending || updatePending || deletePending}
                >
                  <MdDelete className="size-8" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Uploads;
