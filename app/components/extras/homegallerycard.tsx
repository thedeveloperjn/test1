'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProps {
  images: GalleryItem[];
  heading: string;
  paragraph: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function HomeGallery({
  images,
  heading,
  paragraph,
  buttonText = "See All Events",
  buttonLink = "#"
}: GalleryProps) {
  return (
    <div className="homegallery w-full bg-[#f5f5f5] pt-10">
      <div className="wrapper mx-3 md:mx-12 mb-4 md:mb-4 flex flex-col justify-between">
        <div className='flex flex-col md:flex-row justify-between'>
          <h2 className="max-w-2xl text-[34px] leading-[40px] md:text-[62px] text-black font-[100] -tracking-[0.01em] mb-3 font-movatif md:leading-[64px]">
            {heading}
          </h2>
          <p className='max-w-2xl text-[#00000099] text-[16px] md:text-[18px]'>{paragraph}</p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden mt-6">
      <div className="flex w-max animate-marquee">
        {[...images, ...images].map((item, index) => (
          <div key={index} className="relative rounded-xl w-auto overflow-hidden shadow-lg mx-2">
            <Image
              height={400}
              width={525}
              src={item.src}
              alt={item.alt}
              className="!w-auto h-[360px] md:h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white text-lg noto-sans p-2 rounded-md">
              {item.caption}
            </div>
          </div>
        ))}
      </div>
    </div>


      {buttonText && (
        <div className='w-full mt-10 md:mt-18 flex justify-center items-center'>
          <Link href={buttonLink} className="bg-black/5 hover:bg-black/20 text-black font-movatif mb-16 md:mb-28 flex justify-center items-center text-center px-6 py-3 rounded-full">
            {buttonText} <ArrowUpRight size={20} className='ml-2'/>
          </Link>
        </div>
      )}
    </div>
  );
}