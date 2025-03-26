'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { MoveUpRight } from 'lucide-react';
import Link from 'next/link';

const Upcoming = [
  {
    video: '/events.jpeg',
    quote: 'Join us for the Grand Festival of Colours where joy and wonder!',
    name: 'April 8 , 2025',
    title: 'Business Owner'
  },
  {
    video: '/events.jpeg',
    quote: 'Join us for the Grand Festival of Colours where joy and wonder!',
    name: 'April 8 , 2025',
    title: 'Business Owner'
  },
  {
    video: '/events.jpeg',
    quote: "I'm no longer just interested in retiring. I have a whole career ahead of me.",
    name: 'April 8 , 2025',
    title: 'Business Owner'
  },
  {
    video: '/events.jpeg',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'April 8 , 2025',
    title: 'Business Owners'
  },
  {
    video: '/events.jpeg',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'April 8 , 2025',
    title: 'Business Owners'
  },
  {
    video: '/events.jpeg',
    quote: "I'm no longer just interested in retiring. I have a whole career ahead of me.",
    name: 'April 8 , 2025',
    title: 'Business Owner'
  },
  {
    video: '/events.jpeg',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'April 8 , 2025',
    title: 'Business Owners'
  },
  {
    video: '/events.jpeg',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'April 8 , 2025',
    title: 'Business Owners'
  }
];

export default function Events() {
  return (
    <section className="pb-10 md:pb-20 bg-white pt-16 md:pt-20 relative">
      <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-4 flex flex-col justify-between">
        <div className='flex flex-col justify-center items-center'>
          <h2 className="text-[40px] md:text-[62px] text-black font-[100] -tracking-[0.01em] font-movatif leading-[50px]">
            Upcoming Events
          </h2>
          <p className='max-w-4xl py-4 md:pt-8 text-center text-[#00000099] text-[18px]'>
            Stay Informed: Join Our Community Newsletter! Discover how Rolbol is making a difference through our Corporate Social Responsibility initiatives.
          </p>
        </div>

        <div className="z-10 md:-mt-[50px] gap-4 p-2 justify-end items-end flex">
          <button className="custom-prev w-10 h-10 md:w-14 md:h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(90deg)" }}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="custom-next w-10 h-10 md:w-14 md:h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(270deg)" }}>
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
            disabledClass: "swiper-button-disabled" 
          }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            waitForTransition: true
          }}
          loop={true}
          loopAdditionalSlides={2}
          loopPreventsSliding={false}
          loopFillGroupWithBlank={false}
          spaceBetween={20}
          slidesPerView={'auto'}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4.35, spaceBetween: 20 },
          }}
          centeredSlides={false}
          className='pl-2'
          onInit={(swiper) => {
            setTimeout(() => {
              swiper.update();
              swiper.loopFix();
            }, 100);
          }}
        >
          {Upcoming.map((testimonial, index) => (
            <SwiperSlide key={index} className="!ml-[12px] mr-[0px] !md:m-[1px] !w-[300px]">
              <figure className="w-full">
                <div className="relative flex aspect-portrait bg-[#EBEBEB] items-end overflow-hidden !h-[526px] rounded-2xl">
                  {testimonial.video.endsWith('.mp4') ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      src={testimonial.video}
                      autoPlay
                      loop
                      muted
                    />
                  ) : testimonial.video ? (
                    <Image
                      height={300}
                      width={400}
                      className="absolute inset-0 !h-[400px] object-cover"
                      src={testimonial.video}
                      alt="Event Image"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <span className="text-black">No Image Available</span>
                    </div>
                  )}
                  <div className='absolute bottom-0 py-3 px-5 h-[126px]'>
                    <p className='text-[#5D5D5D] noto-sans text-[16px] pb-1'>{testimonial.name}</p>
                    <div className='flex'>
                      <h3 className='text-black leading-[26px] font-movatif text-[22px]'>
                        {testimonial.quote.length > 40 ? `${testimonial.quote.slice(0, 40)}...` : testimonial.quote}
                      </h3>
                      <Link href="#" className='w-[75px]'><MoveUpRight className="h-[40px] w-[40px] p-2 mt-2 rounded-full bg-black text-white"/></Link>
                    </div>
                  </div>
                  <Link 
                    href="#" 
                    className="absolute left-4 top-4 bg-white text-black px-4 py-2 rounded-[10px] animate-pulse"
                  >
                    Upcoming Events
                  </Link>
                </div>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='w-full mt-10 py-4 flex justify-center items-center'>
        <Link href="" className="bg-black/10 hover:bg-black/20 text-black font-movatif flex justify-center items-center text-center px-6 py-3 rounded-full">
          See All Events <MoveUpRight className='ml-2'/>
        </Link>
      </div>
    </section>
  );
}