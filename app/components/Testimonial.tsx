"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import VideoModal from "./videomodal"; // Your existing modal component

const testimonials = [
  {
    video: "https://cdnsnty.tonyrobbins.com/2024-04-30T02-39-31.324Z-BM_Testimonial_LilianaTeaser.jpg.mp4",
    quote: "...you are accomplishing in five days, what it would probably take you five years to learn.",
    name: "Liliana",
    title: "Business Owner",
  },
  {
    video: "https://cdnsnty.tonyrobbins.com/2024-04-30T02-37-20.051Z-BM_Testimonial_KarlaTeaser.jpg.mp4",
    quote: "The resources are in me to find the solutions for the business...",
    name: "Karla",
    title: "Business Owner",
  },
  {
    video: "https://youtu.be/HEEibYnZw_s?si=MmpStvI8ozeu_woL",
    quote: "I'm no longer just interested in retiring. I have a whole career ahead of me.",
    name: "Daniel",
    title: "Business Owner",
  },
  {
    video: "https://cdnsnty.tonyrobbins.com/2024-04-30T02-34-44.565Z-BM_Testimonial_Adelle&GarrettTeaser.jpg.mp4",
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: "Adelle & Garrett",
    title: "Business Owners",
  },
  {
    video: "./video1.mp4",
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: "Adelle & Garrett",
    title: "Business Owners",
  },
];
const isYouTubeLink = (url) => {
  return url?.includes("youtube.com") || url?.includes("youtu.be");
};

const extractYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const TestimonialSlide = ({ testimonial, onWatchClick }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isYouTubeLink(testimonial.video)) return;

    const handleMouseEnter = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      }
    };

    const handleMouseLeave = () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [testimonial.video]);

  return (
    <figure className="w-[350px]" ref={containerRef}>
      <div className="relative flex items-center justify-center overflow-hidden w-full h-[530px] rounded-2xl">
        {isYouTubeLink(testimonial.video) ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${extractYouTubeId(testimonial.video)}?autoplay=1&mute=1&loop=1&playlist=${extractYouTubeId(testimonial.video)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 scale-[2.8] w-full h-full"
          />
        ) : (
          <video
            ref={videoRef}
            loop
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            src={testimonial.video}
          />
        )}
        <button 
          className="absolute left-5 top-5 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full"
          onClick={() => onWatchClick(testimonial.video)}
        >
          ▶ Watch
        </button>
      </div>
      <blockquote className="space-y-2 my-2">
        <p className="text-[22px] font-[500] font-movatif">"{testimonial.quote}"</p>
        <footer className="text-[16px] opacity-60">
          {testimonial.name}, {testimonial.title}
        </footer>
      </blockquote>
    </figure>
  );
};

export default function TestimonialCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [isYouTube, setIsYouTube] = useState(false);
  const swiperRef = useRef(null);

  const handleWatchClick = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setIsYouTube(isYouTubeLink(videoUrl));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
    setIsYouTube(false);
  };


  return (
    <>
      <section className="pb-10 md:pb-20 bg-white pt-10 md:pt-20 relative">
        <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-10 flex justify-between">
          <h2 className="text-[40px] md:text-[62px] font-[100] -tracking-[0.01em] font-movatif leading-[50px]">
            See what Members <br /> are saying
          </h2>
          <div className="z-10 hidden gap-4 p-2 justify-end items-end md:flex">
            <button className="test-prev w-14 h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(90deg)" }}>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="test-next w-14 h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(270deg)" }}>
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="wrapper testimonial-wrapper flex gap-[25px] md:mx-0">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Autoplay]}
            autoplay={{ 
              delay: 3000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{ 
              nextEl: ".test-next", 
              prevEl: ".test-prev",
              disabledClass: "swiper-button-disabled"
            }}
            loop={true}
            loopAdditionalSlides={1}
            spaceBetween={45}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4, spaceBetween: 0 },
            }}
            centeredSlides={false}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="!ml-2 !mr-2 md:!ml-4 md:!mr-4 !w-[350px]">
                <TestimonialSlide 
                  testimonial={testimonial} 
                  onWatchClick={handleWatchClick}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        videoId={isYouTube ? extractYouTubeId(currentVideo) : null}
        videoUrl={!isYouTube ? currentVideo : null}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}