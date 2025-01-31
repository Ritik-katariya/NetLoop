import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  Slider, 
  Progress, 
  Chip 
} from "@nextui-org/react";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  User, 
  MessageSquare 
} from 'lucide-react';

export default function RatingComponent() {
  const [overallRating, setOverallRating] = useState(4.5);
  const [userRating, setUserRating] = useState(0);

  const ratingDistribution = [
    { rating: 5, percentage: 65, count: 325 },
    { rating: 4, percentage: 20, count: 100 },
    { rating: 3, percentage: 10, count: 50 },
    { rating: 2, percentage: 3, count: 15 },
    { rating: 1, percentage: 2, count: 10 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardBody className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Product Ratings</h2>
            <div className="flex items-center justify-center mt-2">
              <Star className="text-yellow-500 mr-2" />
              <span className="text-3xl font-semibold">{overallRating}</span>
              <span className="text-gray-500 ml-2">/5</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Rate Your Experience</h3>
            <Slider
              label="Your Rating"
              step={0.5}
              maxValue={5}
              minValue={0}
              value={userRating}
              onChange={setUserRating}
              color="warning"
              className="max-w-full"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
            {ratingDistribution.map((item) => (
              <div key={item.rating} className="flex items-center space-x-3 mb-2">
                <span className="w-10 text-right">{item.rating} ★</span>
                <Progress 
                  value={item.percentage} 
                  color="warning" 
                  className="flex-grow"
                />
                <span className="w-12 text-gray-500">{item.count}</span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Feedback</h3>
            <div className="flex space-x-4 justify-center">
              <Chip 
                startContent={<ThumbsUp />} 
                color="success" 
                variant="bordered"
              >
                Helpful
              </Chip>
              <Chip 
                startContent={<ThumbsDown />} 
                color="danger" 
                variant="bordered"
              >
                Not Helpful
              </Chip>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <User className="mr-2" size={16} />
              <span>Total Reviews: 500</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="mr-2" size={16} />
              <span>Comments: 250</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}