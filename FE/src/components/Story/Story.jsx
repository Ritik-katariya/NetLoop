import React, { useState } from "react";
import StoryViewer from "./StoryFullView";

const StoryPage = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(true);

  const sampleStories = [
    {
      id: 1,
      title: "Amazing Sunset",
      content: "Witness the beauty of this stunning sunset.",
      image: "https://via.placeholder.com/800x600?text=Sunset",
    },
    {
      id: 2,
      title: "Beach Vibes",
      content: "Relax and enjoy the calmness of the waves.",
      image: "https://via.placeholder.com/800x600?text=Beach",
    },
    {
      id: 3,
      title: "Mountain Adventure",
      content: "Explore the thrilling mountain trails.",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  const handleViewStory = (storyId) => {
    console.log(`Story with ID ${storyId} was viewed.`);
  };

  const handleLikeStory = (storyId) => {
    console.log(`Story with ID ${storyId} was liked.`);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <div className="">
      <h1 className="text-center text-xl font-bold">Story Viewer Demo</h1>
      {isViewerOpen && (
        <StoryViewer
          stories={sampleStories}
          onClose={handleCloseViewer}
          onView={handleViewStory}
          onLike={handleLikeStory}
          isLiked={false}
          viewCount={50}
        />
      )}
      {!isViewerOpen && (
        <button
          onClick={() => setIsViewerOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Open Story Viewer
        </button>
      )}
    </div>
  );
};

export default StoryPage;
