"use client";

import { Button } from "@/components/ui/button";
import { useLoginStore } from "@/store/LoginStore";
import UserButton from "@/components/global/UserButton";

import Image from "next/image";
import Link from "next/link";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ImSpinner6 } from "react-icons/im";

const HomeHeader = () => {
  const { setIsLogin } = useLoginStore();

  // console.log(data);
  return (
    <div className="header">
      <Link href={"/"}>
        <Image
          src={"/logo.png"}
          alt="logo"
          height={100}
          width={100}
          className="size-auto"
        />
      </Link>
      <div className="flex gap-2">
        <AuthLoading>
          <ImSpinner6 className="size-7 animate-spin" />
        </AuthLoading>
        <Unauthenticated>
          <Button
            variant={"outline"}
            onClick={() => setIsLogin(true)}
            className="hover:dark:bg-dark dark:bg-dark/10"
          >
            Login
          </Button>
          <Button className="text-white" onClick={() => setIsLogin(true)}>
            Sign up
          </Button>
        </Unauthenticated>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </div>
  );
};

export default HomeHeader;
