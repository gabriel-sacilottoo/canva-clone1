import { IconType } from "react-icons/lib";

const Trigger = ({ Icon, text }: { Icon: IconType; text: string }) => {
  return (
    <div className="trigger-div">
      <span className="trigger-span">
        <Icon className="size-6" />
      </span>
      <p className="text-xs cursor-pointer">{text}</p>
    </div>
  );
};

export default Trigger;
