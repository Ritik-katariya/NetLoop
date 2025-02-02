import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import StoryComponent from "./StoryComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetStoriesQuery } from "../../../redux/api/storyApi";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const Story = () => {
  const [cursor, setCursor] = useState(null);
  const { data: storyData, isLoading } = useGetStoriesQuery({ cursor, limit: 10 });
  const swiperRef = useRef(null);

  if (isLoading) {
    return <div>Loading stories...</div>;
  }
  console.log(storyData,"loading")

  const stories = storyData|| [];
console.log(storyData,"stories")
  return (
    <div className="relative w-full px-4 py-3 bg-white rounded-md mt-4">
      {/* Left Button */}
      {stories.length > 0 && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-3 rounded-full shadow-lg hover:bg-black/50 transition"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Swiper Slider */}
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={"auto"}
        spaceBetween={2}
        freeMode={true}
        loop={stories.length > 3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={500}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={() => {
          if (storyData?.nextCursor) {
            setCursor(storyData.nextCursor);
          }
        }}
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id} className="!w-24">
            <StoryComponent story={story} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Button */}
      {stories.length > 0 && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-3 rounded-full shadow-lg hover:bg-black/50 transition"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Story;
