import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Image, 
  Button, 
  Link 
} from "@nextui-org/react";
import { Star, ExternalLink } from 'lucide-react';
import { GiCheckMark } from "react-icons/gi";
import { Avatar } from "@nextui-org/react";
import { getTimeAgo } from "../../../utils/timeAgoCreate";
import OptionButton from "../../Profile/Posts/ThreeDot";
import { useVoteOnRatingMutation } from '../../../redux/api/rating';

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
    const fillValue = readOnly 
      ? Math.floor(rating) + (rating % 1 > 0 && index === Math.floor(rating) ? 0.5 : 0)
      : (hoverRating || rating);
    
    return index + 1 <= fillValue 
      ? 'text-yellow-400 fill-yellow-400' 
      : index + 0.5 === fillValue
      ? 'text-yellow-200 fill-yellow-200'
      : 'text-gray-300 fill-gray-300';
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
const member=[]
const createdAt=""
const id=""
const RatingInputForm = () => {
  const [voteOnRating]=useVoteOnRatingMutation();
  
  const [userRating, setUserRating] = useState(0);

  const dummyProduct = {
    title: 'Wireless Noise Cancelling Headphones',
    image: '/api/placeholder/400/300',
    description: 'Premium over-ear headphones with advanced noise cancellation technology.',
    link: 'https://example.com/product'
  };

  return (
    <div className="bg-white w-[550px] flex items-center justify-center p-2 flex-col">
        <div className="flex items-center justify-between p-4 bg-white w-full -p-2">
      <div className="flex items-center gap-3">
        <Avatar
          src={member?.profile?.img}
          size="md"
          className="border-2 border-primary"
        />
          <div className="flex flex-col">
            <div className="flex justify-start items-center gap-4">
            <h3 className="text-base font-semibold">{member?.name}</h3>
            {member?.verified && <GiCheckMark className="text-primary" />}
            <span className="text-xs text-gray-400 ml-2">
              {getTimeAgo(new Date(createdAt))}
            </span>
            </div>
           {member?.networks?.length > 0 && (<p className="text-[10px] text-gray-500">{member?.networks[0]?.name}</p>)}
          </div>
      </div>
      <OptionButton id={id} />
    </div>
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <Image
            alt={dummyProduct.title}
            className='object-cover'
            radius="sm"
            src="https://heroui.com/images/album-cover.png"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">{dummyProduct.title}</h3>
            <p className="text-small text-default-500">{dummyProduct.description}</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2 text-gray-500">
              <StarRating
                initialRating={4.8}
                readOnly={true}
              />
              <p>4.5</p>
              <p>4k Reviews</p>
            </span>
            <Link 
              href={dummyProduct.link} 
              isExternal 
              color="primary" 
              showAnchorIcon
            >
              View Product
            </Link>
          </div>

          <StarRating
            initialRating={userRating}
            onChange={setUserRating}
            size={56}
          />

          <Button 
            color="primary" 
            variant="solid" 
            fullWidth
            disabled={userRating === 0}
          >
            Submit Rating
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default RatingInputForm;