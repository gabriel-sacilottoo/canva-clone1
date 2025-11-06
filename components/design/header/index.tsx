import UserButton from "@/components/global/UserButton";
import DesignInput from "@/components/design/header/DesignInput";
import { FileDropdown } from "./FileDropdown";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import PublishModal from "@/components/modal/PublishModal";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImSpinner6 } from "react-icons/im";
import { MdRedo, MdUndo } from "react-icons/md";
import { AuthLoading, Authenticated } from "convex/react";
import { Hint } from "@/components/global/hint";
import { useCanvasHistory } from "@/lib/useCanvasHistory";
import { designProps } from "@/type";

const Header = ({ design }: { design: designProps | null | undefined }) => {
  const [open, setOpen] = useState(false);
  const { mutate, pending } = useApiMutation(api.design.updateDesign);
  const { isOnline } = useNetworkStatusStore();
  const { undo, redo, canUndo, canRedo } = useCanvasHistory(
    mutate,
    design?._id
  );

  // console.log(canvasHistory);
  return (
    <>
      <PublishModal open={open} setOpen={setOpen} design={design} />
      <div className="design-header">
        <div className="flex text-center gap-4 items-center">
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="logo"
              height={80}
              width={80}
              className="size-auto"
            />
          </Link>
          <FileDropdown />
          <Hint label="Undo">
            <Button
              onClick={() => undo()}
              disabled={!canUndo || !isOnline}
              variant={"ghost"}
              size={"icon"}
            >
              <MdUndo className="size-5" />
            </Button>
          </Hint>
          <Hint label="redo">
            <Button
              onClick={() => redo()}
              disabled={!canRedo || !isOnline}
              variant={"ghost"}
              size={"icon"}
            >
              <MdRedo className="size-5" />
            </Button>
          </Hint>
          {pending && <ImSpinner6 className="size-6 animate-spin" />}
        </div>
        <div className="flex gap-2 items-center">
          <Button onClick={() => setOpen(true)} disabled={!isOnline}>
            Publish
          </Button>
          <DesignInput name={design?.title} id={design?._id} />
          <AuthLoading>
            <ImSpinner6 className="size-6 animate-spin" />
          </AuthLoading>
          <Authenticated>
            <UserButton />
          </Authenticated>
        </div>
      </div>
    </>
  );
};

export default Header;
