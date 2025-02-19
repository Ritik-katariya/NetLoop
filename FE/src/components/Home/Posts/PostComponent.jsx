import React, { useEffect, useState } from "react";
import PostHeader from "../../Profile/Posts/UpperPartOfPost";
import { Image } from "@nextui-org/react";
import { useToggleLikeMutation } from "../../../redux/api/likeApi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { memberInfo } from "../../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import { FaRegComment, FaComment } from "react-icons/fa6";
import { IoSaveOutline, IoSave } from "react-icons/io5";
import Comments from "../../Shared/comments/Comments";
import { useToggleSaveMutation } from "../../../redux/api/postSaved";
import { FaShareAlt } from "react-icons/fa";
import { useCreateNotificationMutation } from "../../../redux/api/notificationApi";
import { useNavigate } from 'react-router-dom';
import ReadMore from "../../../utils/truncate";
const PostComponent = ({ post }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [isComment, setIsComment] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const member = memberInfo();
  const memberId = member?.id;
  const [toggleLike, { isLoading }] = useToggleLikeMutation();
  const [toggleSave, { isLoading: saveLoading }] = useToggleSaveMutation();
  const [socket, setSocket] = useState(null);
const [createNotification]=useCreateNotificationMutation();

  
  useEffect(() => {
    if(post && memberId) {
      const bool = post?.likes?.some(like => like?.memberId === memberId);
      setIsLiked(bool);
      setTotalLike(post?.likes?.length || 0);
    
   
      const saved = post?.savedby?.some((save) => save?.memberId === memberId);
      setIsSave(saved);
    }
  }, [post, memberId]);

  const handleAuthRequired = () => {
    navigate('/login');
  };

  const handleLike = async () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    
    if (!post?.id || isLoading) return;
    
    try {
      await toggleLike({
        data: { 
          memberId,
          targetType: 'post',
          targetId: post?.id
        }
      }).unwrap();
       if(!isLiked&&memberId!==post?.memberId){
        await createNotification({data:{"senderId":memberId,"receiverId":post.memberId,"targetId":post.id,"content":"Your post have some likes","type":"LIKE","targetType":"Post"}}).unwrap(); 
       }    
      setIsLiked(!isLiked);
      setTotalLike(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Error toggling like');
    }
  };

  const handleSaved = async () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    
    if (!post?.id || saveLoading) return;
    
    try {
      await toggleSave({
        data: { 
          memberId,
          targetType: "post",
          targetId: post?.id
        }
      }).unwrap();
      
      setIsSave(!isSave);
    } catch (error) {
      console.error('Error toggling saved:', error);
      toast.error('Error toggling saved');
    }
  };

  const handleCommentClick = () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    setIsComment(!isComment);
  };

  function handleShare(){
    const postUrl = `${window.location.origin}/profile/${post?.memberId}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast.success('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast.error('Failed to copy');
    });
  }
  return (
    <div className=" w-full md:max-w-[600px] lg:max-w-[650px] bg-white flex flex-col space-y-2 text-sm mb-3 rounded-md pb-6 shadow-md">
      <PostHeader post={post} />
      <ToastContainer className={"absolute top-24 "} />

      {/* Post Description */}
      <div className="text-[12px] text-gray-500 font-sans px-4 sm:px-6 break-words">
        <ReadMore text={post?.description} />
      </div>

      {/* Post Media */}
      <div className="w-full flex justify-center items-center">
        {post?.image && (
          <Image
            src={post?.image}
            className="object-cover w-full max-h-[500px] min-h-[250px] p-1 rounded-lg"
          />
        )}
        {post?.video && (
          <video
            className="w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[600px] rounded-lg object-contain h-[80vh] sm:max-h-[600px] lg:max-h-[700px]"
            controls
          >
            <source src={post?.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex justify-between items-center px-4 text-gray-600 text-xs sm:text-base gap-1">
        <div className="flex gap-2 sm:gap-3 cursor-pointer">
          <span 
            onClick={handleLike}
            className={`cursor-pointer flex items-center gap-1 hover:text-teal-500 ${isLoading ? 'opacity-50' : ''}`}
          >
            {isLiked ? (
              <FaHeart className="text-teal-400 text-lg" />
            ) : (
              <FaRegHeart className="text-lg" />
            )}
            <span className={isLiked ? 'text-teal-500' : ''}>
              {totalLike || 0} Like{(totalLike || 0) !== 1 ? 's' : ''}
            </span>
          </span>
          <span 
            onClick={handleCommentClick} 
            className={`flex justify-center items-center gap-1 ${isComment && "text-teal-400"}`}
          >
            {isComment ? <FaComment /> : <FaRegComment />}
            Comment
          </span>
          <span 
            onClick={handleSaved}
            className={`flex justify-center items-center gap-1 ${isSave && "text-teal-400"}`}
          >
            {isSave ? <IoSave /> : <IoSaveOutline />} Save
          </span>
        </div>
        <div className="texl-xl hover:text-teal-400 cursor-pointer hover:scale-110" onClick={handleShare}><FaShareAlt /></div>
      </div>

      {/* Comments Section */}
      {isComment && <Comments post={post} onCommentSubmit={handleCommentClick} socket={socket} />}
    </div>
  );
};

export default PostComponent;
