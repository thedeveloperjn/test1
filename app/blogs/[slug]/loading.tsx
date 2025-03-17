export default function Loading() {
    return (
      <div className="max-w-[1130px] mx-auto pb-20 mt-[20px] px-4">
        {/* Breadcrumb & Title Skeleton */}
        <div className="flex justify-center items-center gap-2 py-20">
          <div className="h-2 w-2 bg-[#1a1a1a] rounded-full"></div>
          <div className="h-4 w-20 bg-[#1a1a1a] rounded-[12px]"></div>
        </div>
        <div className="h-[62px] w-[80%] mx-auto bg-[#1a1a1a] animate-pulse rounded-[12px]"></div>
  
        <div className="flex gap-[25px] mt-10">
          {/* Blog Content Skeleton */}
          <div className="w-[70%]">
            <div className="h-[500px] bg-[#1a1a1a] animate-pulse rounded-[12px] mb-4"></div>
            <div className="h-5 bg-[#1a1a1a] w-3/4 animate-pulse rounded-[12px] mb-2"></div>
            <div className="h-4 bg-[#1a1a1a] w-1/2 animate-pulse rounded-[12px]"></div>
          </div>
  
          {/* Sidebar Skeleton */}
          <div className="w-[30%] sticky self-start top-[90px]">
            <div className="bg-[#1a1a1a] p-5 mb-[25px] rounded-lg pb-6">
              <div className="h-4 bg-[#1a1a1a] w-1/2 animate-pulse rounded-[12px] mb-4"></div>
              <div className="h-4 bg-[#1a1a1a] w-full animate-pulse rounded-[12px] mb-2"></div>
              <div className="h-4 bg-[#1a1a1a] w-3/4 animate-pulse rounded-[12px] mb-2"></div>
            </div>
            <div className="bg-[#1a1a1a] p-5 rounded-lg pb-6">
              <div className="h-5 bg-[#1a1a1a] w-1/3 animate-pulse rounded-[12px] mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-6 w-16 bg-[#1a1a1a] animate-pulse rounded-[12px]"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  