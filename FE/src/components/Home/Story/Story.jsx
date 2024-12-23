import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import StoryComponent from "./StoryComponent";

const Story = () => {
  // Sample data - replace with your own content
  const items = [
    { id: 1, title: "Item 1", description: "Description for item 1" },
    { id: 2, title: "Item 2", description: "Description for item 2" },
    { id: 3, title: "Item 3", description: "Description for item 3" },
    { id: 4, title: "Item 4", description: "Description for item 4" },
    { id: 5, title: "Item 5", description: "Description for item 5" },
    { id: 6, title: "Item 6", description: "Description for item 6" },
    { id: 3, title: "Item 3", description: "Description for item 3" },
    { id: 4, title: "Item 4", description: "Description for item 4" },
    { id: 5, title: "Item 5", description: "Description for item 5" },
    { id: 6, title: "Item 6", description: "Description for item 6" },
    { id: 3, title: "Item 3", description: "Description for item 3" },
    { id: 4, title: "Item 4", description: "Description for item 4" },
    { id: 5, title: "Item 5", description: "Description for item 5" },
    { id: 6, title: "Item 6", description: "Description for item 6" },
  ];

  return (
    
      <div className="w-full px-4 py-3 bg-white rounded-md mt-4">
        <Swiper
          modules={[FreeMode]}
          slidesPerView={"auto"}
          spaceBetween={10}
          freeMode={true}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={3000}
          className="mySwiper"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="!w-24">
              <StoryComponent />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    
  );
};

export default Story;
