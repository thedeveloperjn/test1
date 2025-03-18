"use client"; // Mark this as a Client Component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Image_url } from "../config/constants";
import LightboxKeyboardHandler from "../components/LightboxKeyboardHandler";
import Link from "next/link";
import Image from "next/image";
interface MediaDetails {
  images: string[];
}

interface DataItem {
  id: string | number;
  title: string;
  mediaDetails?: MediaDetails;
}

export default function Gallery({ data = [] }: { data?: DataItem[] }) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const router = useRouter();

  // Flatten all images into a single array for lightbox navigation
  const allImages: string[] = [];
  data.forEach((item) => {
    if (item.mediaDetails?.images) {
      allImages.push(...item.mediaDetails.images);
    }
  });

  // Function to open the lightbox
  const openLightbox = (index: number) => {
    router.push(`#lightbox-${index}`); // Update the URL hash
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    router.push(router.pathname); // Remove the hash from the URL
  };

  if (data.length === 0) {
    return (
      <div className="text-white text-center text-xl py-20">
        No gallery images available.
      </div>
    );
  }

  const filteredData = selectedTitle ? data.filter((item) => item.title === selectedTitle) : data;

  return (
    <div className="max-w-[1130px] pb-20 mx-auto">
      <h1 className="text-[#ffffff66] font-ibmplexmono !text-[14px] uppercase text-center tracking-[0.05rem] pt-20 pb-1 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#ffffff66] inline-block"></span> Gallery
      </h1>

      <p className="text-[40px] md:text-[62px] text-white font-[100] -tracking-[0.01em] text-center pb-14 font-movatif leading-[50px] md:leading-[70px]">
        Browse, admire, and get inspired
      </p>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 mb-8">
        {data.map((item) => (
          <button
            key={item.id}
            className={`px-5 py-[7px] text-[16px] text-[#ffffff66] rounded-[60px] transition ${
              selectedTitle === item.title ? "text-white border-white bg-[#ffffff20]" : "bg-[#ffffff10]"
            }`}
            onClick={() => setSelectedTitle((prev) => (prev === item.title ? null : item.title))}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="mx-4">
        {/* Image Grid */}
        <div
          className="columns-1 max-w-[400px] md:columns-2 md:max-w-[800px] lg:max-w-[100%] mx-auto lg:columns-3"
          style={{ gap: "18px" }}
        >
          {filteredData.map((item, itemIndex) =>
  item?.mediaDetails?.images?.map((image, index) => {
    const imageIndex = allImages.indexOf(image); // Get index safely
    if (imageIndex === -1) return null; // Avoid incorrect links

    return (
      <a key={`${itemIndex}-${index}`} href={`#lightbox-${imageIndex}`}>
        <Image
          src={`${Image_url}${image}`}
          alt="Blog Gallery"
          width={500}
          height={500}
          className="w-full h-auto object-cover rounded-lg mb-[18px] cursor-pointer"
        />
      </a>
    );
  })
)}

        </div>
      </div>

      {/* Lightbox Modal */}
       {allImages.map((image, index) => (
              <div key={index} id={`lightbox-${index}`} className="lightbox">
                <a href="#" className="close">&times;</a>
                <a
                  href={`#lightbox-${index === 0 ? allImages.length - 1 : index - 1}`}
                  className="prev"
                >
                  &#10094;
                </a>
                <a
                  href={`#lightbox-${index === allImages.length - 1 ? 0 : index + 1}`}
                  className="next"
                >
                  &#10095;
                </a>
                <img
                  src={`${Image_url}${image}`}
                  alt="Blog Image"
                  className="lightbox-content"
                />
                {/* Image Counter */}
                <div className="image-counter">
                  {index + 1} of {allImages.length}
                </div>
              </div>
            ))}
      

      {/* Keyboard Handler */}
      <LightboxKeyboardHandler totalImages={allImages.length} />
    </div>
  );
}