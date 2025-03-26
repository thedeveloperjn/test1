import React from "react";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
const sections = [
  {
    title: "Master every area of your life",
    description:
      "Close the gap between where you are and where you want to be with Tony Robbins’ scientifically proven system.",
    videoSrc:
      "https://cdnsnty.tonyrobbins.com/2024-05-01T17-53-23.772Z-Homepage_FullScreen_Reel.mp4",
    buttonLink: "/start",
  }
];

const RedirectSection = () => {
  return (
    <div>
      {sections.map((section, index) => (
        <section
          key={index}
          className="theme--dark relative overflow-hidden h-[75vh] md:h-[96vh] pt-32 md:pt-56 pb-32 md:pb-56"
          style={{ zIndex: 1 }}
        >
          {/* Background Video */}
          <video
            loop
            muted
            playsInline
            autoPlay
            className="absolute inset-0 h-full w-full bg-black object-cover"
            src={section.videoSrc}
          ></video>

          {/* Dark Overlay */}
          <div className="absolute -inset-1 bg-black opacity-15"></div>

          {/* Content Wrapper */}
          <div className=" flex text-white text-balance h-[100%] items-center justify-center">
            <div className=" max-w-3xl h-full text-center">
              <div className="!*:opacity-100  relative">
                <div className="h-full">
                  <h2 className="md:text-[75px] text-[42px] leading-[46px] md:leading-[80px] font-movatif">Our Social & CSR Projects </h2>
                  <p className="my-4">{section.description}</p>
                </div>
              </div>

              {/* Call-to-Action Button */}
              <Link href={section.buttonLink} className="mt-5 relative inline-block cursor-pointer group inline-flex items-center text-black bg-white font-movatif justify-center gap-2  text-center  rounded-full w-auto text-xs md:text-lg py-3 md:py-4 px-6 md:px-8">
                   Explore Now <MoveUpRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default RedirectSection;
