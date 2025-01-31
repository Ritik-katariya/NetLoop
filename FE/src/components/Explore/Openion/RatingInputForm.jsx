import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  Image, 
  Button, 
  Link 
} from "@nextui-org/react";
import { Star, ExternalLink } from 'lucide-react';
import { useVoteOnRatingMutation } from '../../../redux/api/rating';
import PostUserHeader from '../../Shared/PostHeader/PostUserHeader';
import { memberInfo } from '../../../utils/auth';

const StarRating = ({ 
  totalStars = 5, 
  initialRating = 0, 
  size = 24, 
  readOnly = false,
  onChange = () => {},
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

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

const RatingInputForm = ({ data }) => {
  const memberId = memberInfo().id;
  const { member, createdAt, id, image, linkUrl, totalrating: totalrate, rating = [], title, description, voter } = data;

  const [hasVoted, setHasVoted] = useState(false);
  const [totalRating, setTotalRating] = useState(totalrate || 0);
  const [voteOnRating] = useVoteOnRatingMutation();
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    setTotalRating(totalrate);
    setHasVoted(voter?.some((v) => v.id === memberId));

    if (rating.length > 0) {
      const totalVotes = rating.reduce((acc, num) => acc + num, 0);
      const weightedSum = rating.reduce((acc, num, index) => acc + num * (index+1), 0);
      const voteTotal = totalVotes > 0 ? (weightedSum / totalVotes).toFixed(2) : 0;
      setAverageRating(parseFloat(voteTotal));
    } else {
      setAverageRating(0);
    }
  }, [data]);

  const submitHandler = async () => {
    try {
      const res = await voteOnRating({ id, data: { ratingValue: userRating, memberId } }).unwrap();
      
      if (res?.data) {
        setTotalRating(res.data.totalrating);
        setAverageRating(parseFloat(res.data.averageRating || 0));
        setHasVoted(true); // Prevents duplicate voting
      }
    } catch (error) {
      console.error("Rating submission failed", error);
    }
  };

  return (
    <div className="bg-white w-[550px] flex items-center justify-center p-2 flex-col mb-6">
      <PostUserHeader member={member} createdAt={createdAt} id={id} />
      <Card className="w-full">
        <CardHeader className="flex gap-3">
          <Image alt={title} className="object-cover w-44 h-44" radius="sm" src={image} />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-small text-default-500">{description}</p>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2 text-gray-500">
              <StarRating initialRating={averageRating} readOnly={true} />
              <p>{totalRating}</p>
              <p>members</p>
            </span>
            <Link href={linkUrl} isExternal color="primary" showAnchorIcon>
              View Product
            </Link>
          </div>

          {!hasVoted ? (
            <>
              <StarRating initialRating={userRating} onChange={setUserRating} size={56} />
              <Button 
                color="primary" 
                variant="solid" 
                fullWidth 
                disabled={userRating === 0}
                onClick={submitHandler}
              >
                Submit Rating
              </Button>
            </>
          ) : (
            <p className="text-green-500 text-center">Thank you for your rating!</p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default RatingInputForm;
