'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation , Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { MoveUpRight } from 'lucide-react';
const events = [
  {
    title: 'Rolbol talk',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  },
  {
    title: 'coffee date',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  },  {
    title: 'Rolbol Tribe',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Rolbol film Festival',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  },{
    title: 'Rolbol conclave',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'rolbol podcast',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'rolbol retreats',
    videoSrc: '/initiatives.jpeg',
    link: '/events/business-mastery',
    desc: 'See What Celebrities Are Saying About Rolbols Impact Through Our Community Efforts!',
    alt: 'Tony Robbins Business Mastery'
  }
];

export default function EventsCarousel() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true; // Required for autoplay in most browsers
      video.play().catch(err => console.error(`Error playing video ${index}:`, err));
    }
  };
  
  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="initiatives bg-black relative overflow-hidden pb-6">
       <div className="relative max-w-5xl mx-auto h-[1px] bg-gray-500">
    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
  </div>
      <div className="wrapper mx-2 md:mx-6  space-y-5  pb-10 md:pb-20 pt-10 md:pt-20 lg:space-y-10">
      <div className="wrapper mx-3 md:mx-12 mb-0 md:mb-4 flex flex-col justify-between ">
        <div className='flex flex-col md:flex-row justify-between'>
        <h2 className="text-[40px] md:text-[62px] text-white font-[100] mb-2 -tracking-[0.01em]   font-movatif leading-[50px]">Our Initiatives</h2>
        <p className='max-w-2xl text-[#ffffff66] text-[16px] noto-sans  md:text-[18px]'>Hear from the Stars: See What Celebrities Are Saying About Rolbol's Impact Through Our Community Efforts!</p>
        </div>
      <div className="z-10  gap-4 p-2 justify-end items-end flex">
          <button className="event-prev w-10 h-10 md:w-14 md:h-14 border border-white/10  bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center">
          <svg
                        className=" h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="white"
                        style={{transform:"rotate(90deg)"}}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
          </button>
          <button className="event-next w-10 h-10 md:w-14 md:h-14 border border-white/10  bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center">
          <svg
                        className=" h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="white"
                        style={{transform:"rotate(270deg)"}}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
          </button>
        </div>
     
      </div>

=
<Swiper
  modules={[Navigation, Autoplay]}
  navigation={{ nextEl: ".event-next", prevEl: ".event-prev" }}
  autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-plays every 3 seconds
  loop={true} // Enables infinite looping
  spaceBetween={25}
  breakpoints={{
    320: { slidesPerView: 1.2 }, // 1 slide on small screens
    640: { slidesPerView: 2 }, // 2 slides on tablets
    1024: { slidesPerView: 3 }, // 3 slides on medium screens
    1280: { slidesPerView: 4 }, // 4 slides on large screens
  }}
  centeredSlides={false}
  className="!overflow-visible md:!px-10"
>

          {events.map((event, index) => (
              <SwiperSlide key={index} className="max-w-[325px] w-full h-[510px] !mr-[4px] md:!mr-4">
              <div
                className="init-card relative flex w-[100%] w-[325px] aspect-portrait h-[510px] items-end overflow-hidden rounded-[12px] text-white group"
              >
                {/* Background Image */}
                <Image
                  height={510}
                  width={325}
                  className="absolute inset-0 h-full w-[100%] w-[325px] object-cover pointer-events-none"
                  src={event.videoSrc}
                  alt={event.title}
                />
        
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80"></div>
        
                {/* Content Section */}
                <div className="absolute flex w-full flex-col items-center justify-end px-10 py-6 text-center">
                  {/* Title (Starts Lower and Moves Up on Hover) */}
                  <h3 className="text-white text-[36px] leading-[40px] pb-2 text-balance uppercase font-movatif transition-all duration-500 ease-in-out translate-y-35 group-hover:translate-y-0">
                    {event.title}
                  </h3>
        
                  {/* Description & Button (Hidden Initially, Visible on Hover) */}
                  <div className="transition-all flex flex-col justify-center items-center duration-500 ease-in-out   translate-y-35  group-hover:translate-y-0">
                    <p className="text-[16px] opacity-0 group-hover:opacity-100 transition noto-sans text-[#fef5f5]">{event.desc}</p>
        
                    <Link
                      href="#"
                      className="px-6 py-2 my-3 mb-5 rounded-full flex justify-center h-[50px] items-center  backdrop-blur-[10px] gap-2 border border-white/10  w-[200px] hover:bg-white/20 text-white transition"
                    >
                      Explore Now <MoveUpRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
