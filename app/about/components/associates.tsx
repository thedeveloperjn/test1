'use client';

import Image from 'next/image';
import 'swiper/css';

const Associationcontent = [
  { id: 1, src: '/associate1.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 2, src: '/associate6.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 3, src: '/associate3.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 4, src: '/associate4.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 5, src: '/associate5.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 6, src: '/associate6.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  { id: 7, src: '/associate7.png', 
    alt: 'Feature 1' ,
     name: 'Association Name' ,
     owner:'Owned by'
  },
  

 
];

const Associations = () => {
  return (
    <section className=" bg-[#F5F5F5]">
          <div className="relative max-w-full  h-[1px] bg-gray-700">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
  </div>

      <div className=" py-6 md:py-28 pt-14 md:pt-22 container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-[34px] font-movatif md:text-5xl font-bold text-gray-900 mb-8 md:mb-16">
         Our Associations
        </h2>

        {/* Two-row scrolling wrapper */}
        <div className="relative w-full overflow-hidden space-y-0  md:space-y-4 ">
        <div className="absolute top-0 left-0 w-10 md:w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-10 md:w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex animate-marquee mb-8 md:mb-10">
            {[...Associationcontent, ...Associationcontent,...Associationcontent].map((logo, index) => (
              <div key={`row1-${index}`} className="flex gap-2 md:gap-4 justify-center items-center w-auto  mx-4 p-[14px] md:p-[20px] bg-white  rounded-full ">
                <div className='rounded-[50px] overflow-hidden border border-[#EBEBEB]'>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="object-contain !h-[50px] !w-[50px] md:!h-[80px] md:!w-[80px]   flex justify-center items-center"
                /></div>
                <div className='text-start'>
                  <h3 className='font-movatif text-[18px] md:text-[24px]'>{logo.name}</h3>
                  <p className='text-[#02000A] noto-sans text-[14px]  md:text-[18px]'>{logo.owner}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative  overflow-hidden ">
  {/* Gradient Overlay */}
  <div className="absolute top-0 left-0 w-10 md:w-20 h-full bg-gradient-to-r from-white to-transparent z-10 "></div>
  <div className="absolute top-0 right-0 w-10 md:w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

  {/* Scrolling Row */}
  <div className="flex animate-marquee-reverse pb-8">
    {[...Associationcontent, ...Associationcontent,...Associationcontent].map((logo, index) => (
      <div key={`row1-${index}`} className="flex gap-2 md:gap-4 justify-center items-center w-auto  mx-4 p-[14px] md:p-[20px] bg-white  rounded-full">
      <div className='rounded-[50px] overflow-hidden border border-[#EBEBEB]'>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={80}
        height={80}
        className="object-contain !h-[50px] !w-[50px] md:!h-[80px] md:!w-[80px]   flex justify-center items-center"
      /></div>
      <div className='text-start'>
        <h3 className='font-movatif text-[18px] md:text-[24px]'>{logo.name}</h3>
        <p className='text-[#02000A] noto-sans text-[14px]  md:text-[18px]'>{logo.owner}</p>
      </div>
    </div>
    ))}
  </div>
</div>
<div className="flex md:!hidden animate-marquee mb-8 md:mb-10">
            {[...Associationcontent, ...Associationcontent,...Associationcontent].map((logo, index) => (
              <div key={`row1-${index}`} className="flex gap-2 md:gap-4 justify-center items-center w-auto  mx-4 p-[14px] md:p-[20px] bg-white  rounded-full ">
              <div className='rounded-[50px] overflow-hidden border border-[#EBEBEB]'>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={80}
                className="object-contain !h-[50px] !w-[50px] md:!h-[80px] md:!w-[80px]   flex justify-center items-center"
              /></div>
              <div className='text-start'>
                <h3 className='font-movatif text-[18px] md:text-[24px]'>{logo.name}</h3>
                <p className='text-[#02000A] noto-sans text-[14px]  md:text-[18px]'>{logo.owner}</p>
              </div>
            </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Associations;
