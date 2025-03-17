'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

const events = [
  {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  },
  {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }, {
    title: 'Grow your business exponentially',
    videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
    imageSrc: 'https://cdn.sanity.io/images/nyyhaljw/production/9fc4ecf5a801e10e563ced83f062d542430e67b2-600x344.svg',
    link: '/events/business-mastery',
    alt: 'Tony Robbins Business Mastery'
  }
];

export default function EventsCarousel() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = true; // Ensures autoplay works
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
    <section className="bg-white pb-10 md:pb-20 pt-10 md:pt-20 relative overflow-hidden">
      <div className="wrapper mx-6 space-y-5 lg:space-y-10">
        <div className="flex  items-center  justify-between">
          <div className='md:gap-[15px] gap-[8px] flex flex-col md:flex-row'>
            <h2 className="text-nowrap text-3xl font-medium tracking-tighter">Upcoming Events</h2>
            <Link href="/events" className="group flex gap-2 items-center font-medium opacity-60 hover:opacity-100 duration-500">
              <span>Explore all events</span>
              <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current duration-500 group-hover:translate-x-1">
                <path d="M10.9724 10.0006L6.84766 5.87577L8.02616 4.69727L13.3295 10.0006L8.02616 15.3038L6.84766 14.1253L10.9724 10.0006Z" />
              </svg>
            </Link>
          </div>
          <div className="z-10 hidden gap-4 p-2 items-end md:flex">
            <button className="event-prev w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{transform:"rotate(90deg)"}}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="event-next w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
              <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{transform:"rotate(270deg)"}}>
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper modules={[Navigation]} navigation={{ nextEl: ".event-next", prevEl: ".event-prev" }} spaceBetween={0} slidesPerView={'auto'} className="!overflow-visible ">
          {events.map((event, index) => (
            <SwiperSlide key={index} className="max-w-[300px] h-[450px] !mr-4">
              <Link href={event.link} className="relative flex aspect-portrait h-[450px] items-end overflow-hidden rounded-2xl text-white">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  loop
                  playsInline
                  muted
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                  src={event.videoSrc}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80"></div>
                <div className="absolute flex w-full flex-col items-center justify-end px-10 py-6 text-center">
                  <Image src={event.imageSrc} alt={event.alt} width={160} height={160} className="object-cover" />
                  <h3 className="mb-5 opacity-70">{event.title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}