import React from 'react'
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo} from "../../../utils/timeAgoCreate"
import OptionButton from '../../Profile/Posts/ThreeDot';
export default function PostUserHeader({member,createdAt,id}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white w-full -p-2">
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
  )
}
