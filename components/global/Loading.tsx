import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <Image
        src={"/favicon.ico"}
        alt="logo"
        className="animate-bounce"
        height={50}
        width={50}
      />
    </div>
  );
};

export default Loading;
