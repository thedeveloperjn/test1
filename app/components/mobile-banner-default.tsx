"use client";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../components/ui/carousel";
import { Banner } from "../interfaces/banners/dextop-banner";
import { createImageUrl } from "../utils/functions/createImageUrl";
import Autoplay, { type AutoplayType } from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import VideoPlayerCustom from "./cards/video-player-custom";

export function MobileBannerDefault({
  allMobileBannerData,
}: {
  allMobileBannerData: Banner[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const autoplayRef = useRef<AutoplayType>();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (!allMobileBannerData || allMobileBannerData.length === 0) return null;

  return (
    <Carousel
      className="w-full mt-0"
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
          stopOnMouseEnter: true,
        }),
      ]}
      opts={{ loop: true }}
      setApi={setApi}
    >
      <CarouselContent>
        {allMobileBannerData.map((banner, index) => (
          <CarouselItem key={index} className=" border-none px-0 basis-full">
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
                        createImageUrl(banner.bannerImage) || "/placeholder.svg"
                      }
                      alt={banner.bannerTitle}
                      width={10}
                      height={10}
                      layout="responsive"
                      className="w-full object-contain"
                      priority
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
    </Carousel>
  );
}
