"use client";
import React from 'react';
import Link from 'next/link';

// Define the props interface for TypeScript
interface MemberCardProps {
  name: string;
  title: string;
  chapter: string;
  member: string; // e.g., "Pioneer"
  business: string;
  image: string;
}

// Define the MemberCard component as a named function component
const MemberCard: React.FC<MemberCardProps> = ({ name, title, chapter, member, business, image }) => {
  return (
    <div className="relative w-[190px] md:w-[250px] max-w-[49%] group shadow-md overflow-hidden transition-all duration-300">
      {/* Image with grayscale and hover effect */}
      <Link href="/membersdirectory/rameshkothari">
        <div className="relative h-[243px] md:h-[320px] object-cover overflow-hidden rounded-[25px]">
          <img
            src={image}
            alt={name}
            className="w-[190px] md:w-[250px] h-[243px] md:h-[320px] object-cover rounded-[25px] btn-gradient-4 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          />
          <div className="absolute bottom-[25%] md:bottom-[19.8%] mb-[3px] -left-[39%] md:-left-[24.5%]">
            {member === 'Pioneer' && (
              <div className="relative noto-sans bg-purple-600 rounded-tl-[34px] rounded-br-[55px] text-white text-[14px] font-bold px-6 py-2 -rotate-90">
                Pioneer member
              </div>
            )}
          </div>
        </div>
        {/* Member Info */}
        <div className="md:p-4 space-y-1 mt:space-y-0 mt-2 md:mt-0">
          <h3 className="text-lg font-semibold text-[#f5f5f5]">{name}</h3>
          <p className="text-sm text-white/70">{title}</p>
          {business && <p className="text-sm text-white/70 truncate">{business}</p>}
        </div>
      </Link>
    </div>
  );
};

export default MemberCard;