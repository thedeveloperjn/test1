"use client"; // Mark this as a Client Component

import { useState } from "react";
const Speakers = () => {
    const [hovered, setHovered] = useState<number | null>(null);
    const speakermembers = [
        {
          id: 1,
          name: "Ramesh Bais",
          designation: "Hon’ble Ex Governor of Maharashtra",
          image: "/ramrdh.png",
        },
        {
          id: 2,
          name: "Vishnu Deo Sai",
          designation: "Hon’ble CM of Chhattisgarh",
          image: "/vishnu.png",
        },
        {
          id: 3,
          name: "Amit Sial",
          designation: "Indian Actor, Bollywood",
          image: "/amit.png",
        },
        {
          id: 4,
          name: "Shailesh Lodha",
          designation: "Actor, Poet, Author",
          image: "/shailesh.png",
        },
        {
          id: 5,
          name: "Ramesh Bais",
          designation: "Hon’ble Ex Governor of Maharashtra",
          image: "/ramrdh.png",
        },
        {
          id: 6,
          name: "Vishnu Deo Sai",
          designation: "Hon’ble CM of Chhattisgarh",
          image: "/vishnu.png",
        },
        {
          id: 7,
          name: "Amit Sial",
          designation: "Indian Actor, Bollywood",
          image: "/amit.png",
        },
        {
          id: 8,
          name: "Shailesh Lodha",
          designation: "Actor, Poet, Author",
          image: "/shailesh.png",
        },
      ];
    return (
    <div className="min-h-[88vh] md:min-h-[95vh] relative pb-[80px] w-screen overflow-hidden">
      <div className="  inset-0 w-full flex md:flex-row flex-col justify-between my-[50px] md:my-[80px] mb-[20px] md:mb-[50px] max-w-[1350px] px-6 md:mx-auto">
        <h1 className="text-[36px] text-balance leading-[40px] md:text-[62px]  font-movatif md:w-[60%] font-bold text-white mb-4 md:leading-[66px]">
          <div className="text-left">Meet and Get <span className="inline-block">Inspired by</span></div>
          <div className="md:text-right "><span>The</span> <span className="inline-block">Speakers</span></div>
        </h1>
        <p className="text-[16px] flex text-[#f5f5f5] opacity-70 noto-sans w-[100%] md:w-[30%]">The Rolbol Talks feature diverse thought leaders who share unique insights, engaging the audience in inspiring discussions. </p>
       
      </div>
    <div className="flex flex-wrap max-w-[14000px] justify-center p-4 md:gap-8 gap-[4%]">
            {speakermembers.map((member , index) => (
              <div
                key={member.id}
                className="  rounded-lg md:p-3 md:pb-0 mb-4 md:mb-0 h-[312px] w-[48%] md:w-[318px]  md:h-[435px] text-center"
              >
               <div
                    key={index}
                    className={`border border-[2px] border-[#F5F5F5]/10 h-[180px] md:w-[318px] md:h-[318px] rounded-[22px] overflow-hidden
                        ${hovered === index ? "btn-gradient-2" : ""}`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >

                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-lg  grayscale  h-[180px] w-full md:w-[318px]   md:h-[318px] object-cover"
                />
                </div>
                <h3 className="text-[22px] gradient-text md:text-[22px] mt-5 md:mt-7 mb-3 leading-[26px] font-semibold   font-movatif">
                  {member.name} 
                </h3>
                <p className="text-[#F5F5F5]/70 noto-sans  text-[14px] md:text-[16px]">{member.designation}</p>
              </div>
            ))}
          </div>
    </div>
  );
};

export default Speakers;
