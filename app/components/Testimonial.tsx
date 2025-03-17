'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const testimonials = [
  {
    video: 'https://cdnsnty.tonyrobbins.com/2024-04-30T02-39-31.324Z-BM_Testimonial_LilianaTeaser.jpg.mp4',
    quote: '...you are accomplishing in five days, what it would probably take you five years to learn.',
    name: 'Liliana',
    title: 'Business Owner'
  },
  {
    video: 'https://cdnsnty.tonyrobbins.com/2024-04-30T02-37-20.051Z-BM_Testimonial_KarlaTeaser.jpg.mp4',
    quote: 'The resources are in me to find the solutions for the business...',
    name: 'Karla',
    title: 'Business Owner'
  },
  {
    video: 'https://cdnsnty.tonyrobbins.com/2024-04-30T02-36-38.590Z-BM_Testimonial_DanielTeaser.jpg.mp4',
    quote: "I'm no longer just interested in retiring. I have a whole career ahead of me.",
    name: 'Daniel',
    title: 'Business Owner'
  },
  {
    video: 'https://cdnsnty.tonyrobbins.com/2024-04-30T02-34-44.565Z-BM_Testimonial_Adelle&GarrettTeaser.jpg.mp4',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'Adelle & Garrett',
    title: 'Business Owners'
  },
  {
    video: './video1.mp4',
    quote: "This is an opportunity to remove yourself from the weeds of your business...",
    name: 'Adelle & Garrett',
    title: 'Business Owners'
  }
];

export default function TestimonialCarousel() {
  return (
    <section className="pb-10 md:pb-20 bg-white pt-10 md:pt-20 relative">
      <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-10 flex justify-between ">
        <h2 className="text-[40px] md:text-[62px]  font-[100] -tracking-[0.01em]   font-movatif leading-[50px]">See what others <br /> are saying</h2>
      <div className="z-10 hidden gap-4 p-2 items-end md:flex">
          <button className="custom-prev w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
          <svg
                        className=" h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="black"
                        style={{transform:"rotate(90deg)"}}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
          </button>
          <button className="custom-next w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
          <svg
                        className=" h-7 w-7"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="black"
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
      <div className="wrapper test-wrapper flex gap-[25px] mx-3 md:mx-0">
        
       
       <Swiper
  modules={[Navigation]}
  navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
  loop={true}
  spaceBetween={25}
  breakpoints={{
    320: { slidesPerView: 1 }, // 1 slide on small screens
    640: { slidesPerView: 2 }, // 2 slides on tablets
    1024: { slidesPerView: 3 }, // 3 slides on medium screens
    1280: { slidesPerView: 4 }, // 4 slides on large screens
  }}
  centeredSlides={false}
>

            
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="!m-0 !md:m-[12px]" style={{ width: '380px' }}> 
              <figure className="w-full">
                <div className="relative flex aspect-portrait items-end overflow-hidden h-[570px] rounded-2xl">
                  <video
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                    src={testimonial.video}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                  ></video>

                  <button className="absolute left-5 top-5 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full">
                    ▶ Watch
                  </button>
                </div>
                <blockquote className="space-y-2 my-2">
                  <p className="text-[22px] font-[500] font-movatif">"{testimonial.quote}"</p>
                  <footer className="text-[16px] opacity-60">{testimonial.name}, {testimonial.title}</footer>
                </blockquote>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
