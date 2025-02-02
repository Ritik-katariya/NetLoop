import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { useGetStoriesQuery } from "../../redux/api/storyApi";
import { useParams } from "react-router-dom";
import { ChevronUp, ChevronDown } from "lucide-react";
import "swiper/css";
import Header from "../Shared/Header/Header";

const StoryPage = () => {
  const { id } = useParams();
  const [cursor, setCursor] = useState(null);
  const { data, isFetching } = useGetStoriesQuery({ cursor, limit: 10 });
  const [sortedStories, setSortedStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    if (data) {
      if (id) {
        const selectedIndex = data.findIndex((story) => story.id === id);
        if (selectedIndex !== -1) {
          const reorderedStories = [
            data[selectedIndex],
            ...data.slice(0, selectedIndex),
            ...data.slice(selectedIndex + 1),
          ];
          setSortedStories(reorderedStories);
          setActiveIndex(0);
        } else {
          setSortedStories(data);
        }
      } else {
        setSortedStories(data);
      }
    }
  }, [data, id]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);

    Object.values(videoRefs.current).forEach((video) => {
      if (video && !video.paused) video.pause();
    });

    const currentVideo = videoRefs.current[swiper.activeIndex];
    if (currentVideo) {
      currentVideo.play().catch(console.error);
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const VideoPlayer = ({ story, index }) => {
    const videoRef = useRef(null);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });
  
    useEffect(() => {
      const video = videoRef.current;
  
      if (story.mediaType === "VIDEO") {
        let hls;
  
        if (story.hlsUrl) {
          // ✅ Use HLS Streaming
          if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(story.hlsUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = story.hlsUrl;
          }
        } else {
          // ✅ Fallback to Direct Video URL
          video.src = story.mediaUrl;
        }
  
        if (inView) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
  
        return () => {
          if (hls) hls.destroy();
        };
      }
    }, [inView, story.hlsUrl, story.mediaUrl]);
  
    return story.mediaType === "VIDEO" ? (
      <video
        ref={(el) => {
          videoRefs.current[index] = el;
          videoRef.current = el;
          ref(el);
        }}
        className="w-full h-full object-cover"
        poster={story.thumbnail}
        playsInline
        autoPlay
        loop
        muted
      />
    ) : (
      <img
        src={story.mediaUrl}
        alt={story.title}
        className="w-full h-full object-cover"
      />
    );
  };
  

  if (isFetching) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading stories...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900 relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute top-10 right-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full max-md:hidden"
        >
          <ChevronUp className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute bottom-10 right-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full max-md:hidden"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        {/* Swiper Stories */}
        {sortedStories.length > 0 ? (
          <Swiper
            ref={swiperRef}
            modules={[Mousewheel]}
            mousewheel={{ forceToAxis: true }}
            direction="vertical"
            onSlideChange={handleSlideChange}
            className="h-[90vh] w-[30vw] max-md:w-[100vw] max-md:h-[100vh] rounded-xl shadow-lg overflow-hidden"
            speed={500}
            spaceBetween={0}
            slidesPerView={1}
          >
            {sortedStories.map((story, index) => (
              <SwiperSlide key={story.id}>
                <div className="relative h-full w-full flex items-center justify-center bg-black">
                  <VideoPlayer story={story} index={index} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-lg font-semibold">
                      {story.title}
                    </h3>
                    <p className="text-white/80 text-sm">{story.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-screen flex items-center justify-center text-white">
            No stories available
          </div>
        )}
      </div>
    </>
  );
};

export default StoryPage;
