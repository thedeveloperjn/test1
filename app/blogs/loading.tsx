"use client";
export default function Loading() {
  return (
    <div className="flex flex-wrap justify-center md:justify-start md:gap-[25px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-[360px] mb-[25px] md:mb-[0px] animate-pulse">
          <div className="w-full h-[202px] bg-[#1a1a1a] rounded-[12px] mb-2"></div>
          <div className="h-5 bg-[#1a1a1a] w-3/4 rounded-[12px] mb-2"></div>
          <div className="h-4 bg-[#1a1a1a] w-1/2 rounded-[12px]"></div>
        </div>
      ))}
    </div>
  );
}
