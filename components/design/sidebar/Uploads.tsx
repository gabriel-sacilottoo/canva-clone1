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
import { setupImageForCrop } from "@/lib/imageCropHelper";

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
        // Default aspect ratio 4:3
        const aspectRatio = 4 / 3;
        const defaultWidth = 400;
        const frameHeight = defaultWidth / aspectRatio; // 300 for 4:3

        // Calculate scale to cover the frame (object-fit: cover behavior)
        const scaleX = defaultWidth / img.width!;
        const scaleY = frameHeight / img.height!;
        const scale = Math.max(scaleX, scaleY); // Use max to ensure cover

        // Create frame (clipPath) with 4:3 aspect ratio
        const clipPath = new fabric.Rect({
          width: defaultWidth,
          height: frameHeight,
          rx: 0,
          ry: 0,
          originX: "center",
          originY: "center",
        });

        // Store aspect ratio and crop mode data on the image
        (img as any).aspectRatio = aspectRatio;
        (img as any).aspectRatioLabel = "4:3";
        (img as any).isInCropMode = false;
        (img as any).originalWidth = img.width;
        (img as any).originalHeight = img.height;

        // Apply scale to image to cover the frame
        img.set({
          clipPath,
          originX: "center",
          originY: "center",
          scaleX: scale,
          scaleY: scale,
        });

        // Setup image for crop functionality
        setupImageForCrop(img);

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
