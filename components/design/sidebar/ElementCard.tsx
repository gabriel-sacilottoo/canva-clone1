import { IconType } from "react-icons/lib";

const ElementCard = ({
  onClick,
  Icon,
  Text,
}: {
  onClick: () => void;
  Icon: IconType;
  Text: string;
}) => {
  return (
    <div className="elementcard-div" onClick={onClick}>
      <Icon className="size-10" />
      <p className="text-sm">{Text}</p>
    </div>
  );
};

export default ElementCard;
