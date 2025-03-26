// components/About.js
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
export default function About() {
    // JSON content embedded in the file
    const content = {
      cards: [
        {
          video: "https://www.macro.io/sade.mp4",
          label: "Lifestyle"
        },
        {
          video: "https://www.macro.io/sage.mp4",
          label: "Learning"
        },
        {
          video: "https://www.macro.io/leo.mp4",
          label: "Social"
        },
        {
          video: "https://www.macro.io/kory.mp4",
          label: "Connect"
        }
      ],
      description: "At ROLBOL, we celebrate our journey together by focusing on four core values: community, innovation, resilience, and joy. Each moment we share strengthens our bond and enriches our mission.",
      buttonText: "Explore About Us"
    };

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center py-10">
        {/* Heading */}
        <h1 className="text-white text-[34px] leading-[38px] font-movatif md:leading-[60px] md:text-[55px] font-bold text-center mb-12 md:mb-6 px-4">
        Making Rest of Life, <br /> <span className='gradient-text'>Best of Life</span>
        </h1>

        {/* Cards Section with Videos */}
        <div className="flex flex-wrap justify-center md:h-[220px] mx-[20px] items-center gap-10 mb-12">
          {content.cards.map((card, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center ${index % 2 === 0 ? "mt-0" : "md:mt-16"}`}
            >
              <div className="w-28 h-28 relative rounded-[32%] hover:outline hover:outline-[10px] outline-[#45454545] overflow-hidden">
                <video
                  src={card.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-white uppercase font-movatif text-[20px] tracking-[0.04em] mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Description and Button */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between max-w-[1200px] px-4">
          <p className="text-[#ffffff66] text-[16px] noto-sans md:text-[18px] text-center md:text-left md:w-[72%] mb-6">{content.description}</p>
          <div className="md:w-[20%] w-full flex justify-center">
          <Link href="#" className="  max-w-[220px] md:max-w-none  px-6 py-2 rounded-full flex justify-center h-[50px] items-center gap-2 border border-white/10  bg-white/10 hover:bg-white/20 text-white transition">
            {content.buttonText}<MoveUpRight />
          </Link>
        </div></div>

       
      </div>
    );
}
