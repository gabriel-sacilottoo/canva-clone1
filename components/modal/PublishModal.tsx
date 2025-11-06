import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { Button } from "@/components/ui/button";
import { designProps } from "@/type";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const PublishModal = ({
  open,
  setOpen,
  design,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  design: designProps | null | undefined;
}) => {
  if (!design) return null;
  const [pro, setIspro] = useState(design?.isPro);
  const [publish, setIsPublished] = useState(design?.published);

  const { mutate, pending } = useApiMutation(api.design.publish);
  //   console.log(title, name);
  useEffect(() => {}, [publish, pro]);

  const handlePublish = async () => {
    // console.log(publish, pro);
    await mutate({
      id: design?._id,
      published: publish,
      isPro: pro,
    })
      .then(() => {
        toast.success("Published");
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
        console.log(error);
      });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="overflow-y-auto border-none">
        <DialogTitle>Publish Your Project To Pro, Free or Publish</DialogTitle>
        <div className="publish-div">
          <div className="space-y-0.5">
            <p className="text-primary font-bold text-lg">Publish Project</p>
            <p className="text-sm text-zinc-500">
              {publish
                ? "This project will appear on the website."
                : "This project will not appear on the website."}
            </p>
          </div>
          <div>
            <Switch
              checked={publish!}
              onCheckedChange={(value) => setIsPublished(value)}
              disabled={pending}
            />
          </div>
        </div>
        <div className="publish-div">
          <div className="space-y-0.5">
            <p className="text-primary font-bold text-lg">
              Set Project Pro or Free
            </p>
            <p className="text-sm text-zinc-500">
              {pro
                ? "This project will be set as pro."
                : "This project will not be set as pro."}
            </p>
          </div>
          <div>
            <Switch
              checked={pro!}
              onCheckedChange={(value) => setIspro(value)}
              disabled={pending}
            />
          </div>
        </div>
        <Button onClick={handlePublish} disabled={pending}>
          Publish
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PublishModal;
