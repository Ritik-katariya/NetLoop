import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

const PostSkeleton = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-4 space-y-4 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
          
          {/* User info */}
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
        </div>
        
        {/* More options */}
        <MoreHorizontal className="w-6 h-6 text-gray-300" />
      </div>

      {/* Post text */}
      <div className="space-y-2">
        <div className="h-4 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
      </div>

      {/* Image skeleton */}
      <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-r h-[400px] from-gray-200 via-gray-300 to-gray-200 animate-pulse overflow-hidden relative">
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
        />
      </div>

      {/* Interaction buttons */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-6">
          {/* Like */}
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-gray-300" />
            <div className="h-3 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
          
          {/* Comment */}
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-gray-300" />
            <div className="h-3 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
          
          {/* Save */}
          <div className="flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-gray-300" />
            <div className="h-3 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
          </div>
        </div>
        
        {/* Share */}
        <Share2 className="w-6 h-6 text-gray-300" />
      </div>
    </div>
  );
};

// Add custom shimmer animation
const customStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default PostSkeleton;