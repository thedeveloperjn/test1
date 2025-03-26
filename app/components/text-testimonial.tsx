"use client";
import { extractYouTubeId } from "../utils/youtubelink";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import VideoModal from "./videomodal";

const TestimonialsSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const charLimit = 80;
  const swiperRef = useRef(null);

  const testimonials = [
    {
      id: 0,
      name: "Serena Williams",
      designation: "Professional Tennis Player",
      quote: "Tony Robbins helped me discover what I am really made of. With Tony's help, I've set new standards for myself, and I've taken my tennis game—and my life—to a whole new level! Tony Robbins helped me discover what I am really made of. With Tony's help, I've set new standards for myself, and I've taken my tennis game—and my life—to a whole new level!",
      backgroundColor: "rgb(63, 41, 42)",
      imageLarge: "/rkweb.png",
      imageSmall: "https://cdn.sanity.io/images/nyyhaljw/production/c468e8ceb1525755d095d5e49a6ba55ec763f139-64x64.jpg",
      mobileImage: "/rkmobile.png",
      videoUrl: "https://youtu.be/MnBRGbCHFUQ?si=gc3Kf4OY0Da1elPh"
    },
    {
      id: 1,
      name: "Conor McGregor",
      designation: "World Champion Fighter",
      quote: "Tony is top... and it's not just about words. There's an action and a structure to what he's saying. He's shaping up to be a life coach of mine, and I'm very happy with that.",
      backgroundColor: "rgb(11, 26, 105)",
      imageLarge: "/rkweb.png",
      imageSmall: "https://cdn.sanity.io/images/nyyhaljw/production/882f2c09c0e496399595085a8f11bb0e8bd963d0-64x64.jpg",
      mobileImage: "/rkmobile.png",
      videoUrl: "https://youtu.be/MnBRGbCHFUQ?si=gc3Kf4OY0Da1elPh"
    },
  ];

  const handleWatchClick = (testimonial) => {
    const videoId = extractYouTubeId(testimonial.videoUrl);
    if (videoId) {
      setCurrentVideoId(videoId);
      setIsModalOpen(true);
    } else {
      console.error("Invalid YouTube URL");
    }
  };

  const activeTestimonial = testimonials[activeIndex] || testimonials[0];
  const isLongText = activeTestimonial?.quote?.length > charLimit;
  const displayedText = expanded
    ? activeTestimonial?.quote
    : `${activeTestimonial?.quote?.slice(0, charLimit)}${isLongText ? "..." : ""}`;

  const handleProfileClick = (id) => {
    setActiveIndex(id);
    setExpanded(false);
    if (swiperRef.current) {
      swiperRef.current.slideTo(id);
    }
  };

  const handleSwiperChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setExpanded(false);
  };

  return (
    <section className="relative flex h-[120vh] md:h-[130vh] items-end overflow-hidden bg-black py-10 lg:py-20">
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full duration-500" style={{ background: activeTestimonial?.backgroundColor }}>
        <picture>
          <source media="(max-width: 767px)" srcSet={activeTestimonial?.mobileImage} />
          <source media="(min-width: 768px)" srcSet={activeTestimonial?.imageLarge} />
          <img
            src={activeTestimonial?.imageLarge}
            alt={activeTestimonial?.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to bottom, black 5%, transparent 100%)` }}></div>
      </div>

      {/* Content */}
      <div className="wrapper relative w-full h-[105%] text-white">
        <div className="h-[20%] text-center">
          <h2 className="md:text-[62px] text-[35px] pt-12 pb-4 md:py-4 font-movatif text-white uppercase">What they said</h2>
          <p className="text-[16px] noto-sans text-white">
            Hear from the Stars: See What Celebrities Are Saying About Rolbol's Impact Through Our Community Efforts!
          </p>
        </div>

        <div className="relative space-y-10 md:pr-20 flex flex-col h-[80%] md:h-[100%] justify-between md:justify-center md:items-end">
          {/* Testimonial Quote */}
          <div className="relative my-10 pt-14 mb-20 pt-0 max-w-2xl">
            <div className="w-full">
              <blockquote 
                className="text-center !max-h-[130px] md:!max-h-[230px] w-full lg:text-left text-[24px] px-3 mb-0 leading-[28px] md:text-[48px] md:leading-[50px] font-movatif p-4 rounded-md text-white relative"
                style={{
                  maxHeight: expanded ? "230px" : "200px",
                  overflowY: expanded ? "auto" : "hidden",
                  wordBreak: "break-word",
                }}
              >
                <span className="inline">
                  {displayedText}
                  {isLongText && !expanded && (
                    <button
                      className="text-gray-400 text-[20px] ml-2 inline"
                      onClick={() => setExpanded(true)}
                    >
                      Read More
                    </button>
                  )}
                </span>
              </blockquote>
              <div className="flex w-full md:justify-start justify-center mt-6">
                <button
                  className="z-[50] relative mt-2 ml-4 bg-white/40 hover:bg-white/60 backdrop-blur-[20px] text-white px-6 py-3 rounded-full"
                  onClick={() => handleWatchClick(activeTestimonial)}
                >
                  ▶ Watch
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Swiper */}
          <div className="hidden lg:block mt-6 mb-10 relative w-[100%] max-w-2xl">
            <Swiper
              ref={swiperRef}
              slidesPerView={4}
              spaceBetween={20}
              autoplay={{
                delay: 300,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSwiperChange}
              modules={[Autoplay]}
              initialSlide={activeIndex}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className={`flex flex-col items-center text-center duration-500 ${
                      activeIndex === testimonial.id ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                    onClick={() => handleProfileClick(testimonial.id)}
                  >
                    <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
                      <img
                        src={testimonial.imageSmall}
                        alt={testimonial.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm opacity-70">{testimonial.designation}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Swiper */}
          <div className="lg:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSlideChange={handleSwiperChange}
              modules={[Autoplay]}
              initialSlide={activeIndex}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div
                    className={`flex flex-col items-center text-center duration-500 ${
                      activeIndex === testimonial.id ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                    onClick={() => handleProfileClick(testimonial.id)}
                  >
                    <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
                      <img
                        src={testimonial.imageSmall}
                        alt={testimonial.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm opacity-70">{testimonial.designation}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        videoId={currentVideoId} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default TestimonialsSection;