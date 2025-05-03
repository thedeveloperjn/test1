'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface EventItem {
  video: string;
  quote: string;
  name: string;
  title: string;
}

interface EventsProps {
  events: EventItem[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
  button?:string;
  className?: string;
  textcolour?:string;
  tagText?: string;
  navigator?:string;
}

export default function Events({
  events = [],
  title = "Upcoming Events",
  navigator="black",
  description = "Stay Informed: Join Our Community Newsletter! Discover how Rolbol is making a difference through our Corporate Social Responsibility initiatives.",
  showViewAll = true,
  textcolour="text-[#02000A]",
  className = "",
  button="bg-black/5 hover:bg-black/20",
  tagText = "Upcoming Events"
}: EventsProps) {
  return (
    <section className={`events pb-10 md:pb-20  pt-16 md:pt-20 relative ${className}`}>
      <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-4 flex flex-col justify-between">
        <div className='flex flex-col justify-center items-center'>
          <h2 className={`text-[36px] md:text-[62px] font-[100] -tracking-[0.01em] font-movatif leading-[50px] ${textcolour}`}>
            {title}
          </h2>
          <p className={`max-w-4xl opacity-70  py-4 md:pt-8 text-center  noto-sans text-[15px] md:text-[16px] ${textcolour}`}>
            {description}
          </p>
        </div>

        <div className="z-10 md:-mt-[50px] gap-4 p-2 justify-end items-end flex">
          <button className={`custom-prev w-10 h-10 md:w-14 md:h-14 ${button} rounded-full flex items-center justify-center`}>
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={`${navigator}`} style={{ transform: "rotate(90deg)" }}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          <button className={`custom-next w-10 h-10 md:w-14 md:h-14  ${button} text-black rounded-full flex items-center justify-center`}>
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={`${navigator}`} style={{ transform: "rotate(270deg)" }}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="wrapper test-wrapper flex md:mx-0">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ 
            nextEl: ".custom-next", 
            prevEl: ".custom-prev",
          }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            waitForTransition: true
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={'auto'}
          breakpoints={{
            320: { slidesPerView: 1.32, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4.1, spaceBetween:10 },
          }}
          centeredSlides={false}
          className=' !pl-[13px] md:!pl-14'
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="!ml-[0] mr-[0px] md:!m-[8px] !w-[280px] md:!w-[300px]">
              <figure className="w-full">
                <div className="relative flex aspect-portrait bg-[#EBEBEB] items-end overflow-hidden h-[470px] md:!h-[526px] rounded-2xl">
                  {event.video.endsWith('.mp4') ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={event.video}
                      autoPlay
                      loop
                      muted
                    />
                  ) : event.video ? (
                    <Image
                      height={300}
                      width={400}
                      className="absolute inset-0 !h-[360px] md:!h-[400px] object-cover"
                      src={event.video}
                      alt="Event Image"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <span className="text-black">No Image Available</span>
                    </div>
                  )}
                  <div className='absolute bottom-0 py-3 px-5 h-[110px] md:h-[126px]'>
                    <p className='text-[#5D5D5D] noto-sans text-[14px]  md:text-[16px] pb-1'>{event.name}</p>
                    <div className='flex'>
                      <h3 className='text-black leading-[26px] font-movatif text-[20px] md:text-[22px]'>
                        {event.quote.length > 40 ? `${event.quote.slice(0, 40)}...` : event.quote}
                      </h3>
                      <Link href="#" className='w-[75px]'><ArrowUpRight className="h-[40px] w-[40px] p-2 mt-2 rounded-full bg-black text-white"/></Link>
                    </div>
                  </div>
                  <Link 
                    href="#" 
                    className="absolute left-3 top-3 bg-white text-[14px] text-black px-3 py-1 rounded-[6px]"
                  >
                    {tagText}
                  </Link>
                </div>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showViewAll && (
        <div className='w-full mt-10 py-4 flex justify-center items-center'>
          <Link href="" className={`${button}  ${textcolour} font-movatif flex justify-center items-center text-center px-6 py-[10px] md:py-3 rounded-full`}>
            See All Events <ArrowUpRight className='ml-2'/>
          </Link>
        </div>
      )}
    </section>
  );
}