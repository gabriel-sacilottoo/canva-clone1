"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/fetch/useCurrentUser";
import { useLoginStore } from "@/store/LoginStore";

import { useRouter } from "next/navigation";

const Hero = () => {
  const { data } = useCurrentUser();
  const { setIsLogin } = useLoginStore();
  const router = useRouter();

  const handleClick = () => {
    if (data) {
      router.push("/dashboard");
    } else {
      setIsLogin(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8">
        <h1 className="text-3xl lg:text-6xl font-bold text-center">
          What will you
          <span className="hero-gradient">design</span>
          today?
        </h1>
        <p className="text-muted-foreground font-semibold text-center">
          Canva makes it easy to create and share professional designs.
        </p>
        <Button className="text-white" onClick={handleClick}>
          Start designing
        </Button>
      </div>
    </div>
  );
};

export default Hero;
