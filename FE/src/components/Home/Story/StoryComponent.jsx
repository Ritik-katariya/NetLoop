import React from "react";
import { useNavigate } from "react-router-dom";

export default function StoryComponent({ story }) {
  const navigate = useNavigate();

  const viewHandler = (story) => {
    navigate(`/story/${story.id}`, { state: { story } });
  };

  return (
    <div className="bg-primary w-16 rounded-full h-16 flex justify-center items-center overflow-hidden cursor-pointer">
      
        <img 
          src={story.mediaUrl || story.thumbnail} 
          alt={story.title}
          className="w-16 h-16 object-cover rounded-full"
          onClick={() => viewHandler(story)}
        />
      
    </div>
  );
}
