import React, { useState } from 'react';
import { useCreateCommentMutation, useGetCommentsQuery, useGetRepliesQuery } from '../../../redux/api/commentApi';
import { useToggleLikeMutation } from '../../../redux/api/likeApi';
import { memberInfo } from '../../../utils/auth';
import { Avatar } from '@nextui-org/react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { format } from 'timeago.js';
import { toast } from 'react-toastify';

const Comments = ({ postId }) => {
  const [comment, setComment] = useState('');
  const { id: memberId } = memberInfo();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: commentsData, isLoading } = useGetCommentsQuery(
    { postId, page, limit },
    { skip: !postId }
  );

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || isCreating) return;

    try {
      await createComment({
        memberId,
        postId,
        content: comment.trim()
      }).unwrap();
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error creating comment:', error);
      toast.error('Failed to add comment');
    }
  };

  const loadMore = () => {
    if (commentsData?.meta?.hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center p-4">
        <Avatar
          src={memberInfo()?.profile?.img || "/default-avatar.png"}
          size="sm"
          className="flex-shrink-0"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border-b-2 border-gray-300 focus:border-teal-500 outline-none py-2 text-sm"
        />
        <button
          type="submit"
          disabled={!comment.trim() || isCreating}
          className={`px-4 py-1 rounded-full text-sm ${
            !comment.trim() || isCreating
              ? 'bg-gray-200 text-gray-500'
              : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
        >
          Post
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : commentsData?.comments?.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No comments yet</div>
        ) : (
          <>
            {commentsData?.comments?.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
            {commentsData?.meta?.hasMore && (
              <button
                onClick={loadMore}
                className="w-full py-2 text-teal-500 hover:text-teal-600 text-sm font-medium"
              >
                Load more comments
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CommentItem = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { id: memberId } = memberInfo();
  const [toggleLike] = useToggleLikeMutation();
  const [createComment] = useCreateCommentMutation();
  const [page] = useState(1);
  const limit = 5;

  const { data: repliesData } = useGetRepliesQuery(
    { commentId: comment.id, page, limit },
    { skip: !showReplies }
  );

  const handleLike = async () => {
    try {
      await toggleLike({
        data: {
          memberId,
          targetType: 'comment',
          targetId: comment.id
        }
      }).unwrap();
      setIsLiked(!isLiked);
    } catch (error) {
      toast.error('Failed to toggle like');
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await createComment({
        memberId,
        content: replyText.trim(),
        parentId: comment.id,
        postId: comment.postId
      }).unwrap();
      setReplyText('');
      setShowReplies(true);
      toast.success('Reply added successfully');
    } catch (error) {
      toast.error('Failed to add reply');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2 p-4 hover:bg-gray-50">
        <Avatar
          src={comment.member?.profile?.img || "/default-avatar.png"}
          size="sm"
          className="flex-shrink-0"
        />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-2xl px-4 py-2">
            <div className="font-medium text-sm">{comment.member?.name}</div>
            <p className="text-sm break-words">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
            <span>{format(comment.createdAt)}</span>
            <button 
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-teal-500"
            >
              {isLiked ? (
                <FaHeart className="text-teal-500" />
              ) : (
                <FaRegHeart />
              )}
              {comment.likes?.length || 0}
            </button>
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="hover:text-teal-500"
            >
              {comment.replies?.length || 0} Replies
            </button>
          </div>

          {showReplies && (
            <div className="mt-2 pl-4 space-y-2">
              <form onSubmit={handleReply} className="flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 border-b border-gray-300 focus:border-teal-500 outline-none py-1 text-sm"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className={`px-3 py-1 rounded-full text-xs ${
                    !replyText.trim()
                      ? 'bg-gray-200 text-gray-500'
                      : 'bg-teal-500 text-white hover:bg-teal-600'
                  }`}
                >
                  Reply
                </button>
              </form>

              {repliesData?.replies?.map((reply) => (
                <div key={reply.id} className="flex gap-2 pl-4">
                  <Avatar
                    src={reply.member?.profile?.img || "/default-avatar.png"}
                    size="sm"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2">
                      <div className="font-medium text-sm">{reply.member?.name}</div>
                      <p className="text-sm break-words">{reply.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span>{format(reply.createdAt)}</span>
                      <span>{reply.likes?.length || 0} likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments; 