"use client";
import { useGetProductBySlug } from "../../../services/product/product-one";
import { useEffect, useState } from "react";
import { Breadcrumb } from "../../../components/breadcrumb";
import RecommendedProducts from "../../../sections/recommended-sections";
import { ProductInfo } from "./product-info";
import { MobileActions } from "./mobile-actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
}

export default function ProductPage(props: Props) {
  const { params, searchParams } = props;
  const paramSlug = params?.slug;
  const paramOtherVarients = searchParams?.color;

  const { productOneData, productOneRefetch } = useGetProductBySlug(paramSlug, paramOtherVarients);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    console.log("Refetching product data...");
    productOneRefetch();
  }, [paramOtherVarients]);

  const queryString = new URLSearchParams(searchParams).toString();

  if (!productOneData) {
    console.log("No product data found, showing loading state...");
    return <div>Loading...</div>;
  }

  const images = productOneData?.images[0]?.values?.map((img) => img.url) ?? [];

  return (
    <div className="min-h-screen bg-white animate-in">
      <div className="max-w-[1300px] mx-auto">
        <div>
          <div className="container px-4 py-6 max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: paramSlug, href: `/${paramSlug}?${queryString}` },
              ]}
            />
            <div className="lg:flex lg:gap-8 lg:m-8 lg:mb-0 lg:pb-20">
              <div className="lg:w-[45%] gap-6 flex-wrap sticky self-start top-[90px]">
                <Swiper
                  spaceBetween={10}
                  navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex + 1)}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Navigation, Thumbs]}
                  className="w-full h-[550px] rounded-[12px]"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={img}
                        alt={`Product Image ${index}`}
                        width={600}
                        height={500}
                        unoptimized
                        className="rounded-lg w-full h-[600px] object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="absolute bottom-22 right-4 z-50 flex items-center bg-gray-900 opacity-[0.7] text-white px-1 py-1 rounded-lg">
                  <button className="custom-prev">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <span className="text-sm font-semibold">
                    {activeIndex} of {images.length}
                  </span>
                  <button className="custom-next">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={5}
                  freeMode
                  watchSlidesProgress
                  modules={[Thumbs]}
                  className="mini w-full max-w-lg gap-[15px] h-[60px] opacity-[0.8] flex justify-center rounded-[12px] mt-4"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index} className="cursor-pointer !w-[60px]">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index}`}
                        width={100}
                        height={100}
                        unoptimized
                        className={`border rounded-lg !w-[60px] h-[60px] object-cover ${
                          activeIndex - 1 === index ? "border-3 border-green-600" : ""
                        }`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="lg:w-[53%] p-5 lg:pt-0">
                <ProductInfo
                  product={productOneData}
                  otherVarients={paramOtherVarients}
                  searchParams={searchParams}
                />
              </div>
            </div>
            <MobileActions product={productOneData} className="sm:hidden" />
          </div>
        </div>
        <RecommendedProducts />
      </div>
    </div>
  );
}