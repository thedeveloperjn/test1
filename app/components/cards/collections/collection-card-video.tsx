"use client";

import { Button } from "@/components/ui/button";
import { Subcategory } from "@/interfaces/categories/sub-category";
import { cn } from "@/lib/utils";
import { createImageUrl } from "@/utils/functions/createImageUrl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import VideoPlayerCustom from "../video-player-custom";

export function CollectionCardVideo(collection: Subcategory) {
  const words = collection.name.split(" ");
  const router = useRouter();
  return (
    <Link
      href={`/products?category=${collection.categorySlug}&sort=new_arrivals&collection=${collection.slug}`}
      className={cn(
        "relative lg:h-[540px] sm:h-[540px] h-96 lg:min-w-full sm:min-w-full w-72 cursor-pointer overflow-hidden rounded-none group hover:cursor-pointer font-federo"
      )}
    >
      {/* Base State Image */}
      <div className="relative inset-0 transition-opacity duration-500 lg:min-h-[541px] sm:min-h-[541px] min-h-[339px]">
        <div className="w-full h-[541px]">
          <VideoPlayerCustom
            videoLink={createImageUrl(collection?.videoFile)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black" />
        <div
          className={cn(
            "absolute bottom-6 left-10 right-10 transition-opacity duration-500 group-hover:opacity-0"
          )}
        >
          <h2 className="lg:text-3xl text-xl font-light tracking-wide text-white text-center">
            {words.map((word, index) => (
              <React.Fragment key={index}>
                {word}
                {index < words.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>
        <div className="absolute bottom-6 left-4 right-4 flex-col items-center text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:flex  ">
          <h2 className="lg:text-3xl text-xl font-light tracking-wide text-white ">
            {words.map((word, index) => (
              <React.Fragment key={index}>
                {word}
                {index < words.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="mt-3 lg:text-base text-sm leading-relaxed text-white/90 tracking-wider">
            {collection.subTitle}
          </p>
          <Button
            variant="outline"
            size="default"
            className="mt-4 border text-white hover:bg-secondary bg-transparent hover:text-white hover:border-secondary rounded-full px-4 py-2 text-sm border-white h-auto"
          >
            Explore Now
          </Button>
        </div>
      </div>
    </Link>
  );
}
