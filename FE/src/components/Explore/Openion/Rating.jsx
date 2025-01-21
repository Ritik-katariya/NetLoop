import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  totalStars = 5, 
  initialRating = 0, 
  size = 24, 
  readOnly = false,
  onChange = () => {},
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (selectedRating) => {
    if (!readOnly) {
      setRating(selectedRating);
      onChange(selectedRating);
    }
  };

  const getStarColor = (index) => {
    const fillValue = hoverRating || rating;
    
    if (index + 1 <= fillValue) {
      return 'text-yellow-400 fill-yellow-400';
    }
    return 'text-gray-300 fill-gray-300';
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[...Array(totalStars)].map((_, index) => (
          <button
            key={index}
            type="button"
            className={`transition-colors duration-150 ${
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            }`}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            disabled={readOnly}
          >
            <Star
              size={size}
              className={`${getStarColor(index)} transition-colors duration-150`}
            />
          </button>
        ))}
      </div>
      
      {!readOnly && (
        <div className="text-sm text-gray-600">
          {rating ? `Your rating: ${rating} star${rating !== 1 ? 's' : ''}` : 'Click to rate'}
        </div>
      )}
    </div>
  );
};

// Example usage component showing different rating scenarios
const RatingExample = () => {
  const [userRating, setUserRating] = useState(0);

  return (
    <div className="p-6 max-w-md mx-auto space-y-8">
      {/* Interactive Rating */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Rate this product</h3>
        <StarRating
          initialRating={userRating}
          onChange={setUserRating}
        />
      </div>

      {/* Read-only Rating Examples */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Product Ratings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Average Rating</span>
            <StarRating
              initialRating={4.5}
              readOnly
              size={20}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Top Review</span>
            <StarRating
              initialRating={5}
              readOnly
              size={16}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Critical Review</span>
            <StarRating
              initialRating={2}
              readOnly
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingExample;