import React, { useState, useEffect } from 'react';
import { Button, Progress } from "@nextui-org/react";
import { Heart, Eye, X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const StoryViewer = ({ stories = [], onClose, onLike, onView, isLiked, viewCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLikedState, setIsLikedState] = useState(isLiked || false);

  const currentStory = stories[currentIndex];
  const STORY_DURATION = 6000; // 6 seconds per story

  useEffect(() => {
    // Mark story as viewed when displayed
    if (currentStory && onView) {
      onView(currentStory.id);
    }
  }, [currentIndex, currentStory]);

  useEffect(() => {
    let intervalId;
    
    if (!isPaused) {
      const startTime = Date.now();
      
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / STORY_DURATION) * 100;
        
        if (newProgress >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
          } else {
            clearInterval(intervalId);
            onClose();
          }
        } else {
          setProgress(newProgress);
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [currentIndex, isPaused, stories.length]);

  const handlePrevious = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLikedState(!isLikedState);
    if (onLike) {
      onLike(currentStory.id);
    }
  };

  const handleTouchStart = (e) => {
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
  };

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
    >
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-1">
        {stories.map((story, index) => (
          <Progress 
            key={story.id}
            value={index === currentIndex ? progress : index < currentIndex ? 100 : 0}
            className="w-full"
            size="sm"
            color="default"
            aria-label="Story progress"
          />
        ))}
      </div>

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-4 text-white p-2 rounded-full hover:bg-white/10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story content */}
      <div className="relative w-full h-full max-w-3xl mx-auto">
        {/* Navigation overlay */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-full ${currentIndex === 0 ? 'invisible' : 'visible'} hover:bg-white/10`}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={handleNext}
            className={`p-2 rounded-full ${currentIndex === stories.length - 1 ? 'invisible' : 'visible'} hover:bg-white/10`}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Story media */}
        <div className="h-full flex items-center justify-center">
          {currentStory.video ? (
            <video
              src={currentStory.video}
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            />
          ) : (
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Story info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
          <h2 className="text-white text-xl font-bold mb-2">{currentStory.title}</h2>
          <p className="text-white/90 mb-4">{currentStory.content}</p>
          
          <div className="flex items-center gap-4">
            <Button
              isIconOnly
              className={`${isLikedState ? 'text-red-500' : 'text-white'} bg-transparent hover:bg-white/10`}
              onClick={handleLike}
            >
              <Heart className={`w-6 h-6 ${isLikedState ? 'fill-current' : ''}`} />
            </Button>
            
            <div className="flex items-center text-white">
              <Eye className="w-5 h-5 mr-1" />
              <span>{viewCount || 0}</span>
            </div>

            {currentStory.video && (
              <Button
                isIconOnly
                className="text-white bg-transparent hover:bg-white/10"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6" />
                ) : (
                  <Volume2 className="w-6 h-6" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;