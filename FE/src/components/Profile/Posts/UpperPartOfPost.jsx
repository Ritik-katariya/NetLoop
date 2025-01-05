import React from 'react';
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from '../../../utils/timeAgoCreate';
import { useSelector } from 'react-redux';
import MenuModal from './ThreeDot';
import CreatePost from './CreatePost';
import OptionButton from './ThreeDot';

const PostHeader = ({post}) => {
   const { member, network } = useSelector((state) => ({
     member: state.member.name,
     network: state.member.networks
   }));
  
 const img = useSelector((state) => state.profile.img);



  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center gap-3">
        <Avatar 
          src={img}
          size="md"
          className="border-2 border-primary"
        />
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">{member}</h3>
          {network.length > 0 && <p className="text-sm text-gray-500">{network[0]?.name}</p>}
        </div>
      <span className="text-sm text-gray-400 ml-2">{getTimeAgo(new Date(post?.createdAt))}</span>
             </div>
             <OptionButton id={post?.id}/>
     
    </div>
  );
};

export default PostHeader;