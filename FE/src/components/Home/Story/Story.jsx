import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import StoryComponent from "./StoryComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetStoriesQuery } from "../../../redux/api/storyApi";
import "swiper/css";
import "swiper/css/free-mode";
import ImageSkeleton from "./scuton";
import { useSelector } from "react-redux";

const Story = () => {
  const [cursor, setCursor] = useState(null);
  const {memberData}=useSelector(state=>state.member);
  const [networkId, setNetworkId] = useState("123");
  
  useEffect(() =>{
    if(memberData){
      setNetworkId( memberData?.networks[0]?.id);
    }
  },[memberData])
  const { data: storyData, isLoading } = useGetStoriesQuery({ cursor, limit: 10 ,networkId});
  const swiperRef = useRef(null);

  if (isLoading) {
    return <ImageSkeleton/>;
  }

  const stories = storyData || [];

  return (
    <div className="relative w-full px-2 py-3 bg-white rounded-md mt-4">
      {/* Left Button (Hidden on Mobile) */}
      {stories.length > 0 && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-2 rounded-full shadow-lg hover:bg-black/50 transition"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Swiper Slider */}
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={2} // Default for mobile
        spaceBetween={8}
        freeMode={true}
    
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={400}
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onReachEnd={() => {
          if (storyData?.nextCursor) {
            setCursor(storyData.nextCursor);
          }
        }}
        breakpoints={{
          640: { slidesPerView: 4 }, // Tablets
          768: { slidesPerView: 5 }, // Small Laptops
          1024: { slidesPerView: 7 }, // Desktops
        }}
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id} className="!w-20 sm:!w-24">
            <StoryComponent story={story} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Button (Hidden on Mobile) */}
      {stories.length > 0 && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-2 rounded-full shadow-lg hover:bg-black/50 transition"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default Story;
