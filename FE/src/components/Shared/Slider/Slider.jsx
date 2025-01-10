import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageSlider = () => {
  // Dummy data array with placeholder images
  const images = [
    {
      id: 1,
      src: "/api/placeholder/80/80",
      alt: "User 1",
      username: "user_one"
    },
    {
      id: 2,
      src: "/api/placeholder/80/80",
      alt: "User 2",
      username: "user_two"
    },
    {
      id: 3,
      src: "/api/placeholder/80/80",
      alt: "User 3",
      username: "user_three"
    },
    {
      id: 4,
      src: "/api/placeholder/80/80",
      alt: "User 4",
      username: "user_four"
    },
    {
      id: 5,
      src: "/api/placeholder/80/80",
      alt: "User 5",
      username: "user_five"
    },
    {
      id: 6,
      src: "/api/placeholder/80/80",
      alt: "User 6",
      username: "user_six"
    },
    {
      id: 7,
      src: "/api/placeholder/80/80",
      alt: "User 7",
      username: "user_seven"
    },
    {
      id: 8,
      src: "/api/placeholder/80/80",
      alt: "User 8",
      username: "user_eight"
    }
  ];

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 6; // Number of items visible at once

  const handlePrevious = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? images.length - itemsToShow : prevIndex - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => 
      prevIndex + itemsToShow >= images.length ? 0 : prevIndex + 1
    );
  };

  const visibleImages = images.slice(startIndex, startIndex + itemsToShow);
  if (visibleImages.length < itemsToShow) {
    visibleImages.push(...images.slice(0, itemsToShow - visibleImages.length));
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-4 overflow-hidden">
          {visibleImages.map((image) => (
            <div 
              key={image.id} 
              className="flex flex-col items-center gap-2"
            >
              <div className="relative w-20 h-20">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-full border-2 border-pink-500 p-1 object-cover w-full h-full"
                />
              </div>
              <span className="text-sm text-gray-600">{image.username}</span>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ImageSlider;