import { PlusIcon, LinkIcon, PaletteIcon, TypeIcon, EyeIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import OptionButton from "../../Profile/Posts/ThreeDot";
export const PromotionCard = ({ promotion }) => {
  // Make sure that promotion is properly validated
  const { text, backgroundColor, textColor, link,createdAt,member ,id} = promotion || {};

  if (!text) {
    return <div>No promotion text available</div>;
  }
  console.log("Promotion")

  return (
    <div
      className="relative group rounded-lg overflow-hidden transition-transform hover:scale-102 w-[550px] min-h-[400px] mb-5 mt-2 "
      style={{ backgroundColor }}
    >
        <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-3">
        <Avatar
          src={member?.profile?.img}
          size="md"
          className="border-2 border-primary"
        />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-4">
            <h3 className="text-base font-semibold">{member?.name}</h3>
            {member?.verified && <GiCheckMark className="text-primary" />}
            <span className="text-xs text-gray-400 ml-2">
              {getTimeAgo(new Date(createdAt))}
            </span>
            </div>
           {member?.networks?.length > 0 && (<p className="text-[10px] text-gray-500">{member?.networks[0]?.name}</p>)}
          </div>
      </div>
      <OptionButton id={id} />
    </div>
      <div className="p-6 w-full h-full flex flex-col justify-center items-center ">
        <div className="text-3xl mb-4" style={{ color: textColor }}>
          {text}
        </div>

        {link && (
          <div className="flex items-center gap-2 text-xl">
            <LinkIcon size={16} style={{ color: textColor }} />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: textColor }}
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
