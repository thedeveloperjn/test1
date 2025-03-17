"use client";

export default function Loading() {
  return (
    <div className="max-w-[1130px] mx-auto pb-20 mt-[20px] px-4">
      {/* Breadcrumb & Title Skeleton */}
      <div className="flex justify-center items-center gap-2 py-20">
        <div className="h-2 w-2 bg-[#1a1a1a] rounded-full"></div>
        <div className="h-4 w-20 bg-[#1a1a1a] rounded"></div>
      </div>
      <div className="h-[62px] w-[80%] mx-auto bg-[#1a1a1a] animate-pulse rounded-lg"></div>

      {/* Filter Buttons Skeleton */}
      <div className="flex justify-center gap-4 my-10">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-[100px] h-[36px] bg-[#1a1a1a] animate-pulse rounded-md"></div>
        ))}
      </div>

      {/* Image Grid Skeleton */}
      <div style={{ columnCount: 3, gap: "18px" }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[200px] bg-[#1a1a1a] animate-pulse rounded-lg mb-[18px]"
          ></div>
        ))}
      </div>
    </div>
  );
}
