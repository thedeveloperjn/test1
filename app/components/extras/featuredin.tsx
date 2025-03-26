'use client';

import Image from 'next/image';
import 'swiper/css';

const featuredLogos = [
  { id: 1, src: '/feat1.png', alt: 'Feature 1' },
  { id: 2, src: '/feat2.png', alt: 'Feature 2' },
  { id: 3, src: '/feat3.png', alt: 'Feature 3' },
  { id: 4, src: '/feat4.png', alt: 'Feature 4' },
  { id: 5, src: '/feat5.png', alt: 'Feature 5' },
  { id: 6, src: '/feat6.png', alt: 'Feature 6' },
  { id: 7, src: '/feat7.png', alt: 'Feature 7' },
  { id: 8, src: '/feat8.png', alt: 'Feature 8' },
];

const FeaturedIn = () => {
  return (
    <section className=" bg-white">
          <div className="relative max-w-5xl mx-auto h-[1px] bg-gray-700">
    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
  </div>

      <div className=" py-28 pt-22 container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-movatif md:text-5xl font-bold text-gray-900 mb-16">
          Featured In
        </h2>

        {/* Two-row scrolling wrapper */}
        <div className="relative w-full overflow-hidden space-y-4 max-w-[1350px] mx-auto">
        <div className="absolute top-0 left-0 w-10 md:w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-10 md:w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          <div className="flex animate-marquee mb-10">
            {[...featuredLogos, ...featuredLogos].map((logo, index) => (
              <div key={`row1-${index}`} className="flex justify-center items-center w-auto  mx-4 p-[10px] bg-white  rounded-xl shadow-md">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={40}
                  className="object-contain w-auto !h-[40px] object-contain flex justify-center items-center"
                />
              </div>
            ))}
          </div>
          <div className="relative max-w-[1000px] overflow-hidden mx-auto">
  {/* Gradient Overlay */}
  <div className="absolute top-0 left-0 w-10 md:w-20 h-full bg-gradient-to-r from-white to-transparent z-10 "></div>
  <div className="absolute top-0 right-0 w-10 md:w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>

  {/* Scrolling Row */}
  <div className="flex animate-marquee-reverse pb-8">
    {[...featuredLogos, ...featuredLogos].map((logo, index) => (
      <div key={`row2-${index}`} className="flex justify-center items-center w-auto mx-4 p-[10px] bg-white  rounded-xl shadow-md">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={160}
          height={80}
          className="object-contain w-auto !h-[40px] object-contain flex justify-center items-center"
        />
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
