import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useInView } from "react-intersection-observer";
import { useGetStoriesQuery } from "../../redux/api/storyApi";
import { useParams } from "react-router-dom";
import { ChevronUp, ChevronDown, Volume2, VolumeX, Heart } from "lucide-react";
import "swiper/css";
import Header from "../Shared/Header/Header";

const StoryPage = () => {
  const { id } = useParams();
  const [cursor, setCursor] = useState(null);
  const { data, isFetching } = useGetStoriesQuery({ cursor, limit: 10 });
  const [sortedStories, setSortedStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedStories, setLikedStories] = useState({});
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
      currentVideo.muted = isMuted;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
    }
  };

  const toggleLike = (storyId) => {
    setLikedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
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
          if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(story.hlsUrl);
            hls.attachMedia(video);
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = story.hlsUrl;
          }
        } else {
          video.src = story.mediaUrl;
        }
  
        video.muted = isMuted;
  
        if (inView) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
  
        return () => {
          if (hls) hls.destroy();
        };
      }
    }, [inView, story.hlsUrl, story.mediaUrl, isMuted]);
  
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
        muted={isMuted}
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
      <Header chat={true}/>
      <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-[#59ffe669] to-[#00052459] relative ">
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

        {/* Story Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>

          {/* Like Button */}
          {sortedStories[activeIndex] && (
            <button
              onClick={() => toggleLike(sortedStories[activeIndex].id)}
              className={`bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all duration-200 hover:scale-110 ${
                likedStories[sortedStories[activeIndex].id]
                  ? "text-red-500"
                  : "text-white"
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  likedStories[sortedStories[activeIndex].id] ? "fill-current" : ""
                }`}
              />
            </button>
          )}
        </div>

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