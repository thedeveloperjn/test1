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

export default function Initiatives() {
  return (
    <section className="pb-10 md:pb-20 bg-black pt-10 md:pt-20 relative">
      <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-4 flex flex-col justify-between ">
        <div className='flex justify-between'>
        <h2 className="text-[40px] md:text-[62px] text-white font-[100] -tracking-[0.01em]   font-movatif leading-[50px]">Our Initiatives</h2>
        <p className='max-w-2xl text-[#ffffff66] text-[18px]'>Hear from the Stars: See What Celebrities Are Saying About Rolbol's Impact Through Our Community Efforts!</p>
        </div>
      <div className="z-10 hidden gap-4 p-2 justify-end items-end md:flex">
          <button className="custom-prev w-14 h-14 border border-white/10  bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center">
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
          <button className="custom-next w-14 h-14 border border-white/10  bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center">
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
                
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}





// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useRef } from 'react';

// const events = [
//   {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   },
//   {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }, {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }, {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }, {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }, {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }, {
//     title: 'Grow your business exponentially',
//     videoSrc: 'https://cdnsnty.tonyrobbins.com/2024-05-08T01-20-51.563Z-Homepage_Cards_BM.mp4',
//     link: '/events/business-mastery',
//     alt: 'Tony Robbins Business Mastery'
//   }
// ];

// export default function EventsCarousel() {
//   const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

//   const handleMouseEnter = (index: number) => {
//     const video = videoRefs.current[index];
//     if (video) {
//       video.muted = true; // Required for autoplay in most browsers
//       video.play().then(() => {
//         console.log(`Playing video ${index}`);
//       }).catch(err => console.error(`Error playing video ${index}:`, err));
//     }
//   };
  
//   const handleMouseLeave = (index: number) => {
//     const video = videoRefs.current[index];
//     if (video) {
//       video.pause();
//     }
//   };
  

//   return (
//     <section className="bg-white pb-10 md:pb-20 pt-10 md:pt-20 relative overflow-hidden">
//       <div className="wrapper mx-6 space-y-5 lg:space-y-10">
//         <div className="flex  items-center  justify-between">
//           <div className='md:gap-[15px] gap-[8px] flex flex-col md:flex-row'>
//             <h2 className="text-nowrap text-3xl font-medium tracking-tighter">Upcoming Events</h2>
//             <Link href="/events" className="group flex gap-2 items-center font-medium opacity-60 hover:opacity-100 duration-500">
//               <span>Explore all events</span>
//               <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current duration-500 group-hover:translate-x-1">
//                 <path d="M10.9724 10.0006L6.84766 5.87577L8.02616 4.69727L13.3295 10.0006L8.02616 15.3038L6.84766 14.1253L10.9724 10.0006Z" />
//               </svg>
//             </Link>
//           </div>
//           <div className="z-10 hidden gap-4 p-2 items-end md:flex">
//             <button className="event-prev w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
//               <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{transform:"rotate(90deg)"}}>
//                 <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//               </svg>
//             </button>
//             <button className="event-next w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center">
//               <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" style={{transform:"rotate(270deg)"}}>
//                 <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         <Swiper modules={[Navigation]} navigation={{ nextEl: ".event-next", prevEl: ".event-prev" }} spaceBetween={0} slidesPerView={'auto'} className="!overflow-visible ">
//           {events.map((event, index) => (
//             <SwiperSlide key={index} className="max-w-[300px] h-[450px] !mr-4">
//               <Link href={event.link} className="relative flex aspect-portrait h-[450px] items-end overflow-hidden rounded-2xl text-white">
//               <video
//   loop
//   playsInline
//   preload="metadata"
//   className="absolute inset-0 h-full w-full object-cover pointer-events-none"
//   src={event.videoSrc}
//   onMouseEnter={(e) => e.target.play()}
//   onMouseLeave={(e) => e.target.pause()}
// />

//                 <div className="absolute flex w-full flex-col items-center justify-end px-10 py-6 text-center">
//                   <h3 className="text-white font-movatif ">{event.title}</h3>
//                 </div>
//               </Link>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }