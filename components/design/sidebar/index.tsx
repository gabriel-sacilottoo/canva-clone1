import HovercardGlobal from "@/components/global/HovercardGlobal";
import Templates from "./Templates";
import Trigger from "./Trigger";
import Elements from "./Elements";
import Text from "./Text";
import Uploads from "./Uploads";
import Draw from "./Draw";
import Setting from "./Setting";
import { ScrollArea } from "@/components/ui/scroll-area";
import { designProps } from "@/type";

import { BiCategoryAlt } from "react-icons/bi";
import {
  MdOutlineSpaceDashboard,
  MdOutlineDraw,
  MdSettings,
} from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { RiUploadCloudLine } from "react-icons/ri";

const Sidebar = ({ design }: { design: designProps | undefined }) => {
  return (
    <div className="sidebar-section">
      <div className="mt-14">
        <HovercardGlobal
          trigger={
            <Trigger Icon={MdOutlineSpaceDashboard} text={"Templates"} />
          }
          content={
            <ScrollArea className="h-[70vh]">
              <Templates />
            </ScrollArea>
          }
          side={"left"}
        />
        <HovercardGlobal
          trigger={<Trigger Icon={BiCategoryAlt} text={"Elements"} />}
          content={<Elements />}
          side={"left"}
        />
        <HovercardGlobal
          trigger={<Trigger Icon={PiTextTBold} text={"Text"} />}
          content={<Text />}
          side={"left"}
        />
        <HovercardGlobal
          trigger={<Trigger Icon={RiUploadCloudLine} text={"Uploads"} />}
          content={<Uploads />}
          side={"left"}
        />
        <HovercardGlobal
          trigger={<Trigger Icon={MdOutlineDraw} text={"Draw"} />}
          content={<Draw />}
          side={"left"}
        />
        <HovercardGlobal
          trigger={<Trigger Icon={MdSettings} text={"Setting"} />}
          content={<Setting design={design} />}
          side={"left"}
        />
      </div>
    </div>
  );
};
export default Sidebar;
