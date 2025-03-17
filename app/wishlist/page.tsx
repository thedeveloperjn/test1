"use client";
import ProductList from "../components/product-list";
import { ProductListSkeleton } from "../components/product-list-skeleton";
import ProductListWishList from "../components/product-list-wishlist";
import { cn } from "../lib/utils";
import { useGetAllWishlist } from "../services/wishlist/wishlist";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Suspense } from "react";

export default function Wishlist() {
  const { wishlistData, isWishlistLoading, isWishlistError } =
    useGetAllWishlist();
  if (wishlistData && wishlistData?.length > 0)
    return (
      <section
        className={cn(
          "flex flex-col justify-center items-center lg:gap-8 gap-10 lg:px-0 px-2 container mx-auto mb-10 py-10 animate-in duration-300"
        )}
        id="collections"
      >
        <h2 className="text-4xl capitalize text-black font-federo mb-8">
          Wishlists
        </h2>
        <div className="w-full">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductListWishList products={wishlistData} />
          </Suspense>
        </div>
      </section>
    );
  else {
    return (
      <div className="mb-10 py-10">
        <h2 className="order-1 sm:order-2 section-title-size capitalize text-gray-700 text-center font-federo ">
          Your WishList is <span className="text-[#F3238A]">Empty</span>
        </h2>
        <div className="relative flex justify-center items-center w-full h-32 mt-10">
          {/* <AspectRatio
            ratio={1 / 1}
            className=" overflow-hidden w-40 h-40 border"
          > */}

          <Image
            src={"/images/icons/no-product.svg"}
            alt="No Wishlist Item"
            fill
          />
          {/* </AspectRatio> */}
        </div>
      </div>
    );
  }
}
