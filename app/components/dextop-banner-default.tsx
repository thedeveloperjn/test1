"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import type { Banner } from "../interfaces/banners/dextop-banner";
import { createImageUrl } from "../utils/functions/createImageUrl";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoPlayerCustom from "./cards/video-player-custom";

export function DesktopBannerDefault({
  bannerProps,
  showNavButtons,
}: {
  bannerProps: Banner[];
  showNavButtons?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef<AutoplayType>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNavButtonClick = useCallback(
    (direction: "prev" | "next") => {
      if (api) {
        direction === "prev" ? api.scrollPrev() : api.scrollNext();
        if (autoplayRef.current) {
          autoplayRef.current.stop();
        }
      }
    },
    [api]
  );

  const onNavButtonMouseLeave = useCallback(() => {
    if (autoplayRef.current) {
      autoplayRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (api) {
      const autoplayPlugin = api.plugins().autoplay as AutoplayType | undefined;
      if (autoplayPlugin) {
        autoplayRef.current = autoplayPlugin;
      }

      api.on("select", () => {
        setCurrentIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  if (!bannerProps || bannerProps.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        opts={{ loop: true, align: "start" }}
        setApi={setApi}
        className="h-auto"
      >
        <CarouselContent className="-ml-0 h-auto">
          {bannerProps.map((banner, index) => (
            <CarouselItem
              key={index}
              className="relative pl-0 h-auto bg-[#FFF0E3] overflow-hidden"
            >
              <Link href={banner.link} target="_blank">
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "auto",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{
                      scale: currentIndex === index ? 1 : 1.1,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                  >
                    {banner.fileType != "ATTACH_VIDEO" ? (
                      <Image
                        placeholder="empty"
                        src={
                          createImageUrl(banner.bannerImage) ||
                          "/placeholder.svg"
                        }
                        alt={banner.bannerTitle}
                        width={10}
                        height={10}
                        layout="responsive"
                        className="w-full object-contain"
                        priority
                        unoptimized
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      <VideoPlayerCustom
                        videoLink={createImageUrl(banner?.bannerVideo)}
                      />
                    )}
                  </motion.div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Custom Dots */}
        {/* {bannerProps.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {bannerProps.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )} */}
        {showNavButtons && bannerProps.length > 1 && (
          <CarouselPrevious
            className="left-10"
            onClick={() => onNavButtonClick("prev")}
            onMouseLeave={onNavButtonMouseLeave}
          />
        )}
        {showNavButtons && bannerProps.length > 1 && (
          <CarouselNext
            className="right-10 "
            onClick={() => onNavButtonClick("next")}
            onMouseLeave={onNavButtonMouseLeave}
          />
        )}
      </Carousel>
    </motion.div>
  );
}
