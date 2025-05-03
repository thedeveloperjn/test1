"use client";

import { div } from "framer-motion/dist/types/client";
import React from "react";

// JSON data for members
const members = [
  {
    id: 1,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 2,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 3,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 4,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 5,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 6,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 7,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
  {
    id: 8,
    name: "Name of the member",
    designation: "Designation",
    image: "/apexd.jpeg",
  },
];

const CommitteeMembers = () => {
  return (
    <div className="bg-[#f5f5f5] mt-20 pb-8 pt-10 rounded-t-[50px]">
    <div className="max-w-full  mx-auto p-4 pb-8 md:p-6 md:pb-16">
<div className="flex flex-col md:flex-row max-w-[1380px] justify-between mx-auto">
<h2 className="text-[32px] leading-[40px] md:text-[62px]  font-movatif md:w-[52%] font-bold text-black mb-4 md:leading-[80px]">
  <div className="text-left">National <span className="inline-block">Working</span></div>
  <div className="md:text-right"><span>Committee</span> <span className="inline-block">Members</span></div>
</h2>


      <p className="md:w-[32%] text-[16px] noto-sans text-gray-600   mb-10">
        Hear from the Stars: See What Celebrities Are Saying About Rolbol’s
        Impact Through Our Community Efforts!
      </p></div>
      <div className="flex flex-wrap justify-center md:gap-0 gap-[4%]">
        {members.map((member) => (
          <div
            key={member.id}
            className="  rounded-lg md:p-3 mb-0 md:mb-8 h-[312px] w-[48%] md:w-[360px]  md:h-[449] text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="rounded-lg   h-[214px] w-full md:w-[360px]   md:h-[377px] object-cover"
            />
            <h3 className="text-[16px] md:text-[22px] mt-3 mb-1 leading-[26px] font-semibold -tracking-[0.05em] text-black noto-sans">
              {member.name} 
            </h3>
            <p className="text-[#5d5d5d] noto-sans font-[600] text-[14px] md:text-[16px]">{member.designation}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="relative max-w-full  h-[1px] bg-gray-700">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
  </div>
    </div>
  );
};

export default CommitteeMembers;