"use client";

import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Product } from "../interfaces/product/product";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";
import { ProductInfoQuickView } from "./product-info-quickview";

interface Props {
  params: { slug: string };
  searchParams: { [key: string]: string };
  productOneData: Product;
  productPath: string;
}

export default function QuickViewProduct(props: Props) {
  const { productOneData, searchParams, productPath } = props;

  return (
    <div className="animate-in">
      <div className="bg-gradient-to-b from-[#FFF0E3] from-10% via-gray-[#FFF0E3] via-15% to-white to-60%">
        <div className="container mx-auto ">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 relative ">
            <div className="sm:col-span-1 col-span-1 ">
              {productOneData?.images[0] && (
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
                    {[
                      ...productOneData?.images[0]?.values.map((image) => ({
                        type: "IMG",
                        link: image.url,
                      })),
                      ...(productOneData?.videoLink
                        ? [{ type: "VID", link: productOneData?.videoLink }]
                        : []),
                    ].map((data, index) => (
                      <CarouselItem
                        key={index}
                        className="ml-0 border-none px-0"
                      >
                        {data.type === "IMG" && (
                          <Card className="border-0 rounded-none p-0">
                            <CardContent className="relative aspect-[3/4.5] p-0">
                              <Image
                                src={data.link}
                                alt={data.link}
                                fill
                                style={{ objectFit: "fill" }}
                                priority
                              />
                            </CardContent>
                          </Card>
                        )}
                        {data.type === "VID" && (
                          <Card className="border-0 rounded-none p-0">
                            <CardContent className="relative aspect-[3/4.5] p-0">
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
                  {productOneData?.images[0]?.values.length > 1 && (
                    <CarouselNext className="right-2" />
                  )}
                  {productOneData?.images[0]?.values.length > 1 && (
                    <CarouselPrevious className="left-2" />
                  )}
                </Carousel>
              )}
            </div>
            <div className="sm:col-span-1 col-span-1 ">
              <ProductInfoQuickView
                product={productOneData}
                color={searchParams.color}
                searchParams={searchParams}
                productPath={productPath}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
