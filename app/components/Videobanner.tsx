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
