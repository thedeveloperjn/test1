import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";

const News = [
  {
    title: "Master every area of your life",
    description:
      "Close the gap between where you are and where you want to be with Tony Robbins’ scientifically proven system.",
    videoSrc: "/Newsletter.jpeg", // ✅ Ensure this is inside the 'public' folder
    buttonLink: "/start",
  },
];

const Newsletter = () => {
  return (
    <div>
      {News.map((section, index) => (
        <section
          key={index}
          className="theme--dark relative overflow-hidden h-[70vh] pt-32 md:pt-56 pb-32 md:pb-56"
          style={{ zIndex: 1 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={section.videoSrc}
              alt="bg"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          {/* Content Wrapper */}
          <div className="relative px-4 w-full flex text-white h-full justify-center">
          <div className="relative w-full z-10 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-semibold font-movatif">Rest of Life - Best of Life</h2>
        <p className="mt-3 text-sm md:text-2sm noto-sans">Stay Updated: Subscribe to Our Newsletter!</p>

        {/* Subscription Form */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2">
          <input
            type="email"
            placeholder="Your Email ID"
            className="px-4 py-3 w-full md:w-[400px] bg-white/10  backdrop-blur-[8px] bg-opacity-30 border border-white rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button className="px-6 py-3  w-full md:w-[165px] bg-white font-movatif  text-black rounded-full text-lg font-medium hover:bg-gray-200 transition">
            Subscribe Now
          </button>
        </div>
      </div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 top-1/3"
            style={{ background: 'linear-gradient(transparent 0%, rgb(0, 0, 0) 100%)' }}
          ></div>
        </section>
      ))}
    </div>
  );
};

export default Newsletter;
