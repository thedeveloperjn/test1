"use client";

import { Card, CardContent } from "../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

interface Props {
  type: string;
  link: string;
}

function ImageCarousel({ imageArray }: { imageArray: Props[] }) {
  return (
    <Carousel
      className="w-full mt-0"
      plugins={[
        // AutoHeight(),
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
      opts={{ loop: true }}
    >
      <CarouselContent className="ml-0">
        {imageArray.map((data, index) => (
          <CarouselItem key={index} className="ml-0 border-none px-0">
            {data.type === "IMG" && (
              <Card className="border-0 rounded-none p-0">
                <CardContent className="relative aspect-[1/1] p-0">
                  <Image
                    src={data.link}
                    alt={data.link}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </CardContent>
              </Card>
            )}
            {data.type === "VID" && (
              <Card className="border-0 rounded-none p-0">
                <CardContent className="relative aspect-[1/1] p-0">
                  <ReactPlayer
                    url={data.link}
                    width="100%"
                    height="100%"
                    playing
                    muted
                    loop
                    controls={false}
                    config={{
                      youtube: {
                        playerVars: {
                          disablekb: 1,
                          fs: 0,
                          iv_load_policy: 3,
                          modestbranding: 1,
                          rel: 0,
                          showinfo: 0,
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-2" />
      <CarouselPrevious className="left-2" />
      <CarouselDots className="translate-y-16" />
    </Carousel>
  );
}

export default ImageCarousel;
