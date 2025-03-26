"use client";
import ProductList from "../components/product-list";
import { ProductListSkeleton } from "../components/product-list-skeleton";
import { cn } from "../lib/utils";
import { getAllProductsByType } from "../services/product/product-by-type";
import Link from "next/link";
import { Suspense } from "react";

type Props = {};

function RecommendedProducts({}: Props) {
  const { allProductsByTypeData, isAllProductsByTypePending } =
    getAllProductsByType("NEW_ARRIVALS", 1, 8);
  if (allProductsByTypeData && allProductsByTypeData?.length > 0)
    return (
      <section
        className={cn(
          "flex flex-col justify-center items-center lg:gap-8 gap-10 lg:px-0 px-2 container mx-auto mb-10"
        )}
        id="collections"
      >
        <h2 className="text-4xl capitalize text-black font-federo mb-8">
          Explore Suggestions
        </h2>
        <div className="w-full">
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList products={allProductsByTypeData} />
          </Suspense>
        </div>

        <Link
          href={`/products?category=all&sort=NEW_ARRIVALS&collection=all`}
          className="flex items-center border text-black hover:bg-white bg-transparent hover:text-black rounded-full h-12 text-lg border-black px-12 font-federo"
        >
          View All
        </Link>
      </section>
    );
}

export default RecommendedProducts;
