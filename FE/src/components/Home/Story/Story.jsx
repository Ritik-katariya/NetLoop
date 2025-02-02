import React, { useRef,useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import StoryComponent from "./StoryComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

const Story = () => {
  
  const swiperRef = useRef(null);

  const items = [
    { id: 1, title: "Item 1", description: "Description for item 1" },
    { id: 2, title: "Item 2", description: "Description for item 2" },
    { id: 3, title: "Item 3", description: "Description for item 3" },
    { id: 4, title: "Item 4", description: "Description for item 4" },
    { id: 5, title: "Item 5", description: "Description for item 5" },
    { id: 6, title: "Item 6", description: "Description for item 6" },
    { id: 7, title: "Item 7", description: "Description for item 7" },
    { id: 8, title: "Item 8", description: "Description for item 8" },
  ];

  return (
    <div className="relative w-full px-4 py-3 bg-white rounded-md mt-4">
      {/* Left Button */}
      {<button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute  left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-3 rounded-full shadow-lg hover:bg-black/50 transition"
      >
        <ChevronLeft size={24} />
      </button>}

      {/* Swiper Slider */}
      <Swiper
        modules={[FreeMode, ]}
        slidesPerView={"auto"}
        spaceBetween={2}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 3000, // Adjust autoplay speed
          disableOnInteraction: false, // Continue autoplay after interaction
          pauseOnMouseEnter: true, // Pause when hovering
        }}
        speed={500} // Smooth transition
        className="mySwiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        
        {items.map((item, index) => (
          <SwiperSlide key={index==0} className="!w-24">
            <StoryComponent  item={item}  />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Button */}
      <button
        onClick={() =>{ swiperRef.current?.slideNext()}}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/15 text-white/40 p-3 rounded-full shadow-lg hover:bg-black/50 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default Story;
