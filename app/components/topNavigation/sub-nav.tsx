"use client";

import { Category } from "../../interfaces/categories/caegory";
import { cn } from "../../lib/utils";
import { getAllSubCategoryBySlug } from "../../services/category/sub-category";
import { createImageUrl } from "../../utils/functions/createImageUrl";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";


// interface Collection {
//   title: string;
//   subtitle: string;
//   image: string;
//   href: string;
// }

// interface Category {
//   name: string;
//   collections: Collection[];
// }

// const categories: Category[] = [
//   {
//     name: "Vivaah Varnam",
//     collections: [
//       {
//         title: "SUNDRAVALLI",
//         subtitle: "BRIDAL COLLECTION",
//         image: "/images/submenu.webp",
//         href: "/collections/sundravalli",
//       },
//       {
//         title: "NARMUGAI",
//         subtitle: "FORMAL COLLECTION",
//         image: "/images/submenu.webp",
//         href: "/collections/narmugai",
//       },
//       {
//         title: "DIVINE THREADS",
//         subtitle: "TRADITIONAL COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/divine-threads",
//       },
//       {
//         title: "OCCATIONAL HIGHLIGHT",
//         subtitle: "SPECIAL COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/occational-highlight",
//       },
//       {
//         title: "OCCATIONAL HIGHLIGHT 2",
//         subtitle: "SPECIAL COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/occational-highlight",
//       },
//       {
//         title: "OCCATIONAL HIGHLIGHT 3",
//         subtitle: "SPECIAL COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/occational-highlight",
//       },
//     ],
//   },
//   {
//     name: "Professional Grace",
//     collections: [
//       {
//         title: "OFFICE WEAR",
//         subtitle: "PROFESSIONAL COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/office-wear",
//       },
//     ],
//   },
//   {
//     name: "Divine Threads",
//     collections: [
//       {
//         title: "TRADITIONAL",
//         subtitle: "ETHNIC COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/traditional",
//       },
//     ],
//   },
//   {
//     name: "Occational Highlight",
//     collections: [
//       {
//         title: "FESTIVE",
//         subtitle: "CELEBRATION COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/festive",
//       },
//     ],
//   },
//   {
//     name: "Occational Highlight 2",
//     collections: [
//       {
//         title: "FESTIVE",
//         subtitle: "CELEBRATION COLLECTION",
//         image: "/images/submenu.png",
//         href: "/collections/festive",
//       },
//     ],
//   },
// ];

export function SubNav({
  setOpenCategory,
  category,
}: {
  setOpenCategory: (any: any) => void;
  category: Category;
}) {
  const plugin = Autoplay();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const {
    allSubCategoryBySlugData,
    refetchAllSubCategoryBySlug,
    isAllSubCategoryBySlugPending,
    isAllSubCategoryBySlugError,
  } = getAllSubCategoryBySlug(category.slug);

  // if (isAllSubCategoryBySlugPending) {
  //   return null;
  // }

  if (isAllSubCategoryBySlugError) {
    return <ErrorComponent onRetry={refetchAllSubCategoryBySlug} />;
  }

  if (allSubCategoryBySlugData && allSubCategoryBySlugData?.length > 0) {
    const extendedSubCategoryData =
      allSubCategoryBySlugData.length > 4
        ? [...allSubCategoryBySlugData, ...allSubCategoryBySlugData]
        : allSubCategoryBySlugData;
    return (
      <div className="px-6   h-[441px]">
        {/* <div className="container mx-auto"> */}
        <div className="grid grid-cols-5  py-8">
          {/* Left Column - Categories */}
          <div className="col-span-1 border-r border-gray-200">
            <h2
              className={cn(
                "px-6 text-lg text-[#F3238A] mb-4 font-federo tracking-wider"
              )}
            >
              COLLECTIONS
            </h2>
            <ul className="flex flex-col gap-6 max-h-80 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">


              {allSubCategoryBySlugData?.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={`/${category.slug}/new_arrivals/${collection.slug}`}
                    onClick={() => {
                      setOpenCategory(null);
                    }}
                    className={cn(
                      "w-full px-6 py-2 text-left hover:text-[#F3238A] transition-colors capitalize font-public-sans font-light",
                      activeCategory === collection.slug
                        ? "text-[#F3238A] bg-amber-50"
                        : "text-black"
                    )}
                  >
                    {collection?.name?.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Collections Grid */}
          <div className="col-span-4 px-6 overflow-x-scroll no-scrollbar mr-4">
            <div className="grid grid-flow-col  gap-6 ">
              <Carousel
                className="w-full max-w-full mx-auto"
                plugins={[
                  Autoplay({
                    delay: 1000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
                opts={{
                  loop: true,
                  align: "start",
                }}
              >
                <CarouselContent>
                  {allSubCategoryBySlugData &&
                    extendedSubCategoryData.map((collection, idx) => (
                      <CarouselItem
                        className="md:basis-[237px] sm:basis-[45%] basis-[3/2] lg:mx-0 mx-0 ml-0 h-[364px]"
                        key={idx}
                      >
                        <Link
                          onClick={() => setOpenCategory(null)}
                          href={`/${category.slug}/new_arrivals/${collection.slug}`}
                          className="group w-[237px]  h-full"
                        >
                          <div className="relative group/card overflow-hidden h-[299px]  ">
                            {collection.thumbNailType != "video" ? (
                              <Image
                                src={createImageUrl(collection.icon)}
                                alt={collection.name}
                                fill
                                className="group-hover/card:scale-110 transition-all duration-150 object-cover"
                              />
                            ) : (
                              <div className="w-full h-[541px]">
                                <VideoPlayerCustom
                                  videoLink={createImageUrl(
                                    collection?.videoFile
                                  )}
                                />
                              </div>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900  font-[federo] text-center line-clamp-2 mt-4 uppercase">
                            {collection.name}
                          </h3>
                          <p className="text-sm text-[#F3238A] text-center mt-1">
                            {collection.subTitle}
                          </p>
                        </Link>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}
