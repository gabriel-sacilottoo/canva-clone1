import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLoginStore } from "@/store/LoginStore";
import { Button } from "@/components/ui/button";
import { useNetworkStatusStore } from "@/store/NetworkStatusStore";

import { useAuthActions } from "@convex-dev/auth/react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { useState } from "react";

const LoginModal = () => {
  const { signIn } = useAuthActions();
  const { isLogin, setIsLogin } = useLoginStore();
  const { isOnline } = useNetworkStatusStore();
  const [loading, setLoading] = useState(false);

  const onProviderSignUp = async (provider: "github" | "google") => {
    setLoading(true);

    await signIn(provider)
      .then((res) => {
        setLoading(false);
        // console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (isLogin) {
    return (
      <Dialog onOpenChange={setIsLogin} open={isLogin}>
        <DialogContent className="flex p-0 border-none md:max-w-lg lg:max-w-4xl rounded-lg">
          <div className="p-4 lg:p-6">
            <DialogTitle className="text-xl font-bold">
              Log in or sign up in seconds
            </DialogTitle>
            <p className="text-muted-foreground mt-4">
              Use your email or another service to continue with Canva
              (it&apos;s free)!
            </p>
            <div className="w-full space-y-4 mt-6">
              <Button
                className="w-full relative"
                variant={"outline"}
                onClick={() => onProviderSignUp("google")}
                disabled={loading || !isOnline}
              >
                <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
                Continue with Google
              </Button>
              <Button
                className="w-full relative"
                variant={"outline"}
                onClick={() => onProviderSignUp("github")}
                disabled={loading || !isOnline}
              >
                <FaGithub className="size-5 absolute top-2.5 left-2.5" />
                Continue with Github
              </Button>
              <Button className="w-full relative" variant={"outline"}>
                <MdOutlineMail className="size-5 absolute top-2.5 left-2.5" />
                Continue with email
              </Button>
            </div>
          </div>
          <Image
            src="/auth_dialog_canva.jpg"
            alt="auth_dialog_canva"
            height={400}
            width={400}
            className="hidden md:flex rounded-r-md"
          />
        </DialogContent>
      </Dialog>
    );
  }
};

export default LoginModal;
