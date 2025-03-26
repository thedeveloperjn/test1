"use client";
import { div } from "framer-motion/client";
import Image from "next/image";
import { useEffect, useRef } from "react";


const LifeMasterySection = ({ flexdirection ,color }: { flexdirection: "row" | "row-reverse" , color:string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Required for autoplay
      video.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction.");
      });
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="bg-white py-20 px-2">
    <div className="wrapper max-w-[1440px] mx-auto">
      

    <div className={`flex flex-col items-stretch ${flexdirection === "row-reverse" ? "md:flex-row-reverse" : "md:flex-row"}`}>
        {/* Image Section */}
        <div className="flex h-auto w-full items-end md:w-1/3 md:order-first">
          <div
            className="relative z-10 flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl p-10"
            style={{ background: ` ${color} `}}
          >
            <Image
              src="https://cdn.sanity.io/images/nyyhaljw/production/d92beff6b17c2bbfdc517e95fe53ab9be275bfab-400x247.svg"
              alt="Life Mastery"
              width={500}
              height={300}
              className="absolute inset-0 h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 block md:hidden" style={{ background: `linear-gradient(transparent 50%, ${color} 100%)` }}></div>
            <div className="absolute inset-0 hidden md:block" style={{ background: `linear-gradient(to right bottom, transparent 70%, ${color}` }}></div>
          </div>
        </div>

        {/* Text Section */}
        <div className="relative z-10 order-first bg-white rounded-[25px] flex w-full items-center py-5 md:w-2/3 md:p-10 md:order-last">
          <h2 className=" text-[45px] text-center md:text-left md:text-[62px] text-black font-[100] -tracking-[0.01em] font-movatif leading-[50px] md:leading-[70px]">
            Led by Tony’s <br /> team of wellness experts
          </h2>
        </div>
      </div>

      {/* Decorative Divs */}
      <div className="grid h-2 grid-cols-5 md:hidden" style={{ background: `${color}` }}>
        <div className="col-span-1 rounded-r-full bg-white"></div>
        <div className="col-span-3 bg-primary"></div>
        <div className="col-span-1 rounded-l-full bg-white"></div>
      </div>

      <div className={`flex flex-col ${flexdirection === "row-reverse" ? "md:flex-row-reverse" : "md:flex-row"}`}>
        {/* Left Side Text */}
        <div className="relative z-10 bg-white rounded-[25px] order-last w-full py-5 md:w-1/3 md:p-10 md:order-first">
          <p className="prose text-[20px] text-[#00000099]">
            Take your energy — and life — to a higher level with the guidance and cutting-edge research of the world’s top health, nutrition, and fitness experts.
          </p>
        </div>

        {/* Video Section */}
        <div className="relative w-full overflow-visible md:w-2/3">
          <div
            className={`absolute top-0 hidden h-20 w-20 -translate-y-1/2 md:block  ${flexdirection === "row-reverse" ? "translate-x-1/2 right-0" : " -translate-x-1/2 "}`}
            style={{ background: `${color}` }}
          >
            <div className="absolute h-20 w-20 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary"></div>
            <div className="absolute h-20 w-20 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary"></div>
          </div>

          <div className="relative flex aspect-square translate-x-0 items-center justify-center overflow-hidden rounded-2xl md:aspect-video">
          <video
              ref={videoRef}
              loop
              playsInline
              autoPlay
              className="absolute inset-0 h-full w-full object-cover"
              preload="metadata"
              src="./video1.mp4"
            ></video>
            <div className="absolute inset-0 hidden md:block" style={{background: `linear-gradient(to  ${flexdirection === "row-reverse" ? "right" : "left"} top, transparent 70%, ${color} 90%)` }}></div>
            <div className="absolute inset-0 block md:hidden" style={{ background: `linear-gradient(to top, transparent 50%, ${color} 100%)` }}></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LifeMasterySection;



// "use client";

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";

// const TestimonialsSection = () => {
//   const [expanded, setExpanded] = useState(false);
//   const [activeIndex, setActiveIndex] = useState(1);
//   const charLimit = 80;

//   const testimonials = [
//     {
//       id: 1,
//       name: "Serena Williams",
//       designation: "Professional Tennis Player",
//       quote:
//         "Tony Robbins helped me discover what I am really made of. With Tony's help, I've set new standards for myself, and I've taken my tennis game—and my life—to a whole new level! Tony Robbins helped me discover what I am really made of. With Tony's help, I've set new standards for myself, and I've taken my tennis game—and my life—to a whole new level!",
//       backgroundColor: "rgb(63, 41, 42)",
//       imageLarge:
//         "https://cdn.sanity.io/images/nyyhaljw/production/70d5989786046902444a3de3262f3ce5e7ed6bed-1600x900.jpg",
//       imageSmall:
//         "https://cdn.sanity.io/images/nyyhaljw/production/c468e8ceb1525755d095d5e49a6ba55ec763f139-64x64.jpg",
//     },
//     {
//       id: 2,
//       name: "Conor McGregor",
//       designation: "World Champion Fighter",
//       quote:
//         "Tony is top... and it’s not just about words. There's an action and a structure to what he's saying. He's shaping up to be a life coach of mine, and I'm very happy with that.",
//       backgroundColor: "rgb(11, 26, 105)",
//       imageLarge:
//         "https://cdn.sanity.io/images/nyyhaljw/production/a67c08dfac1506c9db9677c5a23d760289b1f0ce-1600x900.jpg",
//       imageSmall:
//         "https://cdn.sanity.io/images/nyyhaljw/production/882f2c09c0e496399595085a8f11bb0e8bd963d0-64x64.jpg",
//     },
//   ];

//   const handleProfileClick = (id) => {
//     setActiveIndex(id);
//     setExpanded(false); // Reset expansion on new testimonial selection
//   };

//   const activeTestimonial = testimonials.find((t) => t.id === activeIndex);
//   const isLongText = activeTestimonial.quote.length > charLimit;
//   const displayedText = expanded
//     ? activeTestimonial.quote
//     : `${activeTestimonial.quote.slice(0, charLimit)}...Read More`;

//   return (
//     <section className="relative flex h-[120vh] md:h-[135vh] items-end overflow-hidden bg-black py-10 lg:py-20">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 h-full w-full duration-500"
//         style={{ background: activeTestimonial.backgroundColor }}
//       >
//         <img
//           src={activeTestimonial.imageLarge}
//           alt={activeTestimonial.name}
//           className="absolute inset-0 h-full w-full object-cover"
//           loading="lazy"
//         />
//         <div
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             background: `linear-gradient(to bottom, black 5%, transparent 100%)`,
//           }}
//         ></div>
//       </div>

//       {/* Content */}
//       <div className="wrapper relative w-full h-[105%] text-white">
//         <div className="h-[20%] text-center">
//           <h2 className="md:text-[62px] text-[35px] pt-12 pb-4 md:py-4 font-movatif text-white uppercase">
//             What they said
//           </h2>
//           <p className="text-[16px] noto-sans text-white">
//             Hear from the Stars: See What Celebrities Are Saying About Rolbol's
//             Impact Through Our Community Efforts!
//           </p>
//         </div>

//         <div className="relative space-y-10 md:pr-20 flex flex-col h-[80%] md:h-[100%] justify-between md:justify-center md:items-end">
//           {/* Testimonial Quote */}
//           <div className="relative my-10 pt-14 mb-20 pt-0 max-w-2xl">
//           <div className="w-full">
//   <blockquote 
//     className="text-center !max-h-[130px] md:!max-h-[230px] w-full lg:text-left text-[24px] px-3 mb-0 leading-[28px] md:text-[48px] md:leading-[50px] font-movatif p-4 rounded-md text-white relative"
//     style={{
//       maxHeight: expanded ? "230px" : "200px",
//       overflowY: expanded ? "auto" : "hidden",
//       wordBreak: "break-word",
//       position: "relative",
//     }}
//   >
//     <span className="inline">
//       {expanded ? activeTestimonial.quote : `${activeTestimonial.quote.slice(0, charLimit)}...`}  
//       {isLongText && !expanded && (
//         <button
//           className="text-gray-400  text-[20px] ml-2 inline"
//           onClick={() => setExpanded(true)}
//         >
//           Read More
//         </button>
//       )}
//     </span>
//   </blockquote>
//   <div className="flex w-full md:justify-start justify-center mt-6">
//   <button className="z-[50] relative mt-2 ml-4  bg-white/40 hover:bg-white/60  backdrop-blur-[20px] text-white px-6 py-3 rounded-full">
//                     ▶ Watch
//                   </button></div>
// </div>

//           </div>

//           {/* Desktop Swiper */}
//           <div className="hidden lg:block mt-6 mb-10 relative w-[100%] max-w-2xl">
//             <Swiper slidesPerView={4} spaceBetween={20} className="w-full">
//               {testimonials.map((testimonial) => (
//                 <SwiperSlide key={testimonial.id}>
//                   <div
//                     className={`flex flex-col items-center text-center duration-500 ${
//                       activeIndex === testimonial.id
//                         ? "opacity-100"
//                         : "opacity-50 hover:opacity-100"
//                     }`}
//                     onClick={() => handleProfileClick(testimonial.id)}
//                   >
//                     <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
//                       <img
//                         src={testimonial.imageSmall}
//                         alt={testimonial.name}
//                         className="absolute inset-0 h-full w-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                     <p className="font-bold">{testimonial.name}</p>
//                     <p className="text-sm opacity-70">{testimonial.designation}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Mobile Swiper */}
//           <div className="lg:hidden">
//             <Swiper slidesPerView={1} spaceBetween={20} className="w-full">
//               {testimonials.map((testimonial) => (
//                 <SwiperSlide key={testimonial.id}>
//                   <div
//                     className={`flex flex-col items-center text-center duration-500 ${
//                       activeIndex === testimonial.id
//                         ? "opacity-100"
//                         : "opacity-50 hover:opacity-100"
//                     }`}
//                     onClick={() => handleProfileClick(testimonial.id)}
//                   >
//                     <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full">
//                       <img
//                         src={testimonial.imageSmall}
//                         alt={testimonial.name}
//                         className="absolute inset-0 h-full w-full object-cover"
//                         loading="lazy"
//                       />
//                     </div>
//                     <p className="font-bold">{testimonial.name}</p>
//                     <p className="text-sm opacity-70">{testimonial.designation}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;
