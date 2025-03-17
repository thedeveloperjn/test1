'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

type SwiperBannerProps = {
  images: string[];
  className?: string;
  imgClassName?: string;
  hoverPlay?: boolean;
};

const SwiperBanner: React.FC<SwiperBannerProps> = ({
  images,
  className = 'w-full',
  imgClassName = 'w-full',
  hoverPlay = false,
}) => {
  const swiperRef = useRef<any>(null);

  if (!images || images.length === 0) {
    return <p>No images to display</p>;
  }

  return (
    <div
      className={className}
      onMouseEnter={() => {
        if (hoverPlay && swiperRef.current) {
          swiperRef.current.autoplay.start();
          swiperRef.current.params.autoplay.delay = 1000;
          swiperRef.current.slideNext();
          swiperRef.current.update();
        }
      }}
      onMouseLeave={() => {
        if (hoverPlay && swiperRef.current) {
          swiperRef.current.autoplay.stop();
        }
      }}
    >
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={false}
        autoplay={hoverPlay ? false : { delay: 2000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {images.map((img, index) => (
          <SwiperSlide key={`${img}-${index}`}>
            <img className={imgClassName} src={img} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;