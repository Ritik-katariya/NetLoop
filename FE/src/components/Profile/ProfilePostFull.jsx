import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { FaRegHeart, FaHeart, FaRegComment, FaComment, FaShareAlt } from "react-icons/fa";
import { IoSaveOutline, IoSave } from "react-icons/io5";
import { Button, Image } from "@nextui-org/react";
import { useToggleLikeMutation, useGetLikesQuery } from "../../redux/api/likeApi";
import { useToggleSaveMutation } from "../../redux/api/postSaved";
import { useCreateNotificationMutation } from "../../redux/api/notificationApi";
import { memberInfo } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import PostHeader from "./Posts/UpperPartOfPost";
import Comments from "../Shared/comments/Comments";
import ReadMore from "../../utils/truncate";

export default function PostView({ post }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const member = memberInfo();
  const memberId = member?.id;

  // Like & Save State
  const [isLiked, setIsLiked] = useState(false);
  const [totalLike, setTotalLike] = useState(0);
  const [isSave, setIsSave] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const [toggleLike, { isLoading: likeLoading }] = useToggleLikeMutation();
  const [toggleSave, { isLoading: saveLoading }] = useToggleSaveMutation();
  const [createNotification] = useCreateNotificationMutation();

  useEffect(() => {
    if (post && memberId) {
      // Check if the user has liked the post
      const liked = post?.likes?.some((like) => like?.memberId === memberId);
      setIsLiked(liked);
      setTotalLike(post?.likes?.length || 0);
  
      // Check if the user has saved the post
      const saved = post?.savedby?.some((save) => save?.memberId === memberId);
      setIsSave(saved);  // ✅ Fix: This correctly updates the state on page load
    }
  }, [post, memberId]);  // ✅ Dependencies: Ensures effect runs when `post` or `memberId` changes
  

  const handleAuthRequired = () => navigate("/login");

  const handleLike = async () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    if (!post?.id || likeLoading) return;

    try {
      await toggleLike({ data: { memberId, targetType: "post", targetId: post?.id } }).unwrap();

      if (!isLiked) {
        await createNotification({
          data: {
            senderId: memberId,
            receiverId: post.memberId,
            targetId: post.id,
            content: "Your post received a like!",
            type: "LIKE",
            targetType: "Post",
          },
        }).unwrap();
      }
      setIsLiked(!isLiked);
      setTotalLike((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleSave = async () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    if (!post?.id || saveLoading) return;

    try {
      await toggleSave({ data: { memberId, targetType: "post", targetId: post?.id } }).unwrap();
      setIsSave(!isSave);
    } catch (error) {
      console.error("Error toggling saved:", error);
    }
  };

  const handleCommentClick = () => {
    if (!memberId) {
      handleAuthRequired();
      return;
    }
    setIsComment(!isComment);
  };

  return (
    <>
      {/* Post Preview Image/Video */}
      <div className="cursor-pointer" onClick={onOpen}>
        {post?.image && <Image src={post?.image} className="w-56 h-56 object-cover rounded-md" />}
        {post?.video && (
          <video className="w-56 h-56 rounded-md" controls>
            <source src={post?.video} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Full Post Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" backdrop="opaque">
        <ModalContent className="bg-white rounded-lg shadow-lg">
          {(onClose) => (
            <>
              {/* Modal Header */}
              <ModalHeader className="flex justify-between items-center p-4">
                <span className="text-lg font-semibold">Post Details</span>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalHeader>

              {/* Modal Body */}
              <ModalBody>
                <div className="max-w-2xl mx-auto p-4 space-y-4">
                  {/* Post Header */}
                  <PostHeader post={post} />

                  {/* Post Description */}
                  <div className="text-gray-600 px-2 text-sm">
                    <ReadMore text={post?.description} />
                  </div>

                  {/* Post Media */}
                  <div className="w-full flex justify-center items-center">
                    {post?.image && <Image src={post?.image} className="rounded-lg max-h-[500px] min-h-[250px]" />}
                    {post?.video && (
                      <video className="rounded-lg w-full max-w-[500px]" controls>
                        <source src={post?.video} type="video/mp4" />
                      </video>
                    )}
                  </div>

                  {/* Actions (Like, Comment, Save, Share) */}
                  <div className="flex justify-between items-center px-4 text-gray-600 text-xs sm:text-sm">
                    <div className="flex gap-2 sm:gap-3 cursor-pointer">
                      {/* Like Button */}
                      <span onClick={handleLike} className={`flex items-center gap-1 hover:text-teal-500 ${likeLoading ? "opacity-50" : ""}`}>
                        {isLiked ? <FaHeart className="text-teal-400 text-lg" /> : <FaRegHeart className="text-lg" />}
                        <span className={isLiked ? "text-teal-500" : ""}>{totalLike} Likes</span>
                      </span>

                      {/* Comment Button */}
                      <span onClick={handleCommentClick} className={`flex items-center gap-1 ${isComment && "text-teal-400"}`}>
                        {isComment ? <FaComment /> : <FaRegComment />}
                        Comment
                      </span>

                      {/* Save Button */}
                      <span onClick={handleSave} className={`flex items-center gap-1 ${!isSave && "text-teal-400"}`}>
                        {!isSave ? <IoSave /> : <IoSaveOutline />} {!isSave ? "Save" : "UnSave"}
                      </span>
                    </div>

                    {/* Share Button */}
                    <div className="text-xl hover:text-teal-400 cursor-pointer">
                      <FaShareAlt />
                    </div>
                  </div>

                  {/* Comments Section */}
                  {isComment && <Comments post={post} onCommentSubmit={handleCommentClick} />}
                </div>
              </ModalBody>

              {/* Modal Footer */}
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
