import Image from "next/image";

const NoItems = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center items-center h-[40vh]">
      <div>
        <Image
          src={"/noprojects.png"}
          alt="offline-png"
          height={500}
          width={500}
        />
        <p className="font-bold text-2xl text-center">{text}</p>
      </div>
    </div>
  );
};

export default NoItems;
