'use client'; // Since we're using client-side features (Swiper)

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules'; // Import Swiper modules
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // Import navigation styles
import 'swiper/css/pagination'; // Import pagination styles
import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';
// JSON data for the celebrity gallery
const celebrityGallery = [
  { src: '/galllery3.jpeg', alt: 'Award Ceremony', caption: 'The passion that a person needs' },
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  { src: '/galler1.jpeg', alt: 'Panel Discussion', caption: 'The resilience to keep going' },
  { src: '/galllery3.jpeg', alt: 'Award Ceremony', caption: 'The passion that a person needs' },
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  { src: '/galllery2.jpeg', alt: 'Motivational Speaker', caption: 'The courage to face challenges' },
  
  { src: '/galler1.jpeg', alt: 'Panel Discussion', caption: 'The resilience to keep going' },
];

export default function CelebrityGallery() {
  return (
    <div className="w-full bg-white pt-10">
   <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-4 flex flex-col justify-between ">
        <div className='flex flex-col md:flex-row justify-between'>
        <h2 className="max-w-2xl text-[35px] leading-[40px] md:text-[62px] text-black font-[100] -tracking-[0.01em]  mb-3  font-movatif md:leading-[64px]">Celebrity Moments: A Star-Studded Gallery!</h2>
        <p className='max-w-2xl text-[#00000099] text-[18px]'>Hear from the Stars: See What Celebrities Are Saying About Rolbol's Impact Through Our Community Efforts!</p>
        </div>
        <div className="z-10 md:-mt-[50px]   gap-4 p-2 justify-end items-end flex">
          <button className="gallery-prev w-14 h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(90deg)" }}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="gallery-next w-14 h-14 border border-black/10 bg-black/10 hover:bg-black/20 text-black rounded-full flex items-center justify-center">
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{ transform: "rotate(270deg)" }}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
     
      </div>
      {/* Swiper Gallery */}
      <div className="relative mt-6">
        <Swiper
          modules={[ Navigation,Autoplay]} // Enable Swiper modules
          spaceBetween={24} // Space between slides
          slidesPerView={"auto"} // Default for mobile
          
          navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
          pagination={{ clickable: true }} // Enable pagination dots
          autoplay={{
            delay: 3000, // 3 seconds delay between transitions
            disableOnInteraction: false, // Continue autoplay after user interaction
          }}
          loop={true} // Infinite loop
          className="w-full !pl-4 md:!pl-10"
        >
          {celebrityGallery.map((item, index) => (
           <SwiperSlide key={index} className='!w-auto'>
           <div className="relative rounded-xl w-auto overflow-hidden shadow-lg">
             <Image
             height={400}
             width={525}
               src={item.src}
               alt={item.alt}
               className="!w-auto h-[400px] object-cover"
             />
         
             {/* Gradient Overlay */}
             <div className="absolute bottom-0 left-0 w-full h-3/3 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
         
             {/* Caption */}
             <div className="absolute bottom-4 left-4 text-white text-lg noto-sans p-2 rounded-md">
               {item.caption}
             </div>
           </div>
         </SwiperSlide>
         
          ))}
        </Swiper>
      </div>

      <div className='w-full mt-18  flex justify-center items-center'>
      <Link href="" className=" bg-black/10 hover:bg-black/20 text-black font-movatif mb-28 flex justify-center items-center text-center px-6 py-3 rounded-full">
                   See All Events <MoveUpRight className='ml-2'/>
                  </Link></div>
    </div>
  );
}