import React from 'react';
import { ChevronRight } from 'lucide-react';

const ImageSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center space-x-4 overflow-hidden">
        {/* Skeleton Images */}
        {[1, 2].map((index) => (
          <div
            key={index}
            className="flex-shrink-0 relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          </div>
        ))}

        {/* Navigation Button */}
        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Loading Animation Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" 
           style={{ transform: 'translateX(-100%)' }} />
    </div>
  );
};

// Add custom animation
const customStyles = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

export default ImageSkeleton;