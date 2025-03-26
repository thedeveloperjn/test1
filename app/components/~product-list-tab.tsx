"use client"; // Keep only if necessary

import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { FilterProps } from "../interfaces/filter/filter";
import { Product } from "../interfaces/product/product";
import { cn } from "../lib/utils";
import { getAllSubCategoryBySlug } from "../services/category/sub-category";
import { getAllProductsByTypeCollection } from "../services/product/product-by-type-collection";
import { useFilterSlice } from "../store/slice/filter";
import { generateFilterUrl } from "../utils/functions/generateFilterUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProductCard } from "./product-card";

interface ProductListProps {
  category: string;
  collection: string;
  selectedFilters: FilterProps[];
  sortBy: string;
  setTotalProducts: (total: number) => void;
  isOpenSideBar?: boolean;
}

export default function ProductListWithTabs({
  category,
  selectedFilters,
  collection,
  sortBy,
  setTotalProducts,
  isOpenSideBar,
}: ProductListProps) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState(collection);

  const paramsUrl = generateFilterUrl(selectedFilters);
  const sortByStore = useFilterSlice((state) => state.sortBy);
  const {
    allProductsByTypeCollectionData,
    isAllProductsByTypeCollectionError,
    refetchAllProductsByTypeCollection,
  } = getAllProductsByTypeCollection(
    collection === "all" ? category : collection,
    sortBy?.toLowerCase(),
    paramsUrl,
    page,
    8
  );

  const { allSubCategoryBySlugData, refetchAllSubCategoryBySlug } =
    getAllSubCategoryBySlug(category);

  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchProducts = async () => {
    // setLoading(true);

    try {
      const res = await refetchAllProductsByTypeCollection();
      const data = res?.data;
      const newProducts = data?.data || [];
      setTotalProducts(data?.totalProducts || 0);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setProducts(newProducts); // Reset products on page 1
        } else {
          setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts, ...newProducts];
            return updatedProducts;
          });
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      // Wait for the next rendering cycle for `setProducts` to complete
      setTimeout(() => setLoading(false), 0);
    }
  };

  // Reset when filters, category, or collection changes
  useEffect(() => {
    setLoading(true);

    setPage(1);
    setHasMore(true);
    refetchAllSubCategoryBySlug();
  }, [selectedFilters, collection, category, sortByStore]);

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="relative pb-10 ">
      {/* <div
        className={cn("sticky top-20 z-20 sm:pb-4 bg-white", {
          "top-9":
            selectedFilters.length <= 0 ||
            (selectedFilters.length == 1 &&
              selectedFilters[0].type === "CATEGORY" &&
              (selectedFilters[0].value as string[]).length <= 0),
        })}
      >
        <Tabs
          defaultValue={activeCategory}
          value={activeCategory!}
          onValueChange={(e) => {
            setActiveCategory(e);
          }}
        >
          <TabsList className="lg:w-full w-full lg:max-w-screen justify-start h-auto p-0 bg-transparent border-none rounded-none overflow-x-scroll no-scrollbar">
            {allSubCategoryBySlugData &&
              [
                {
                  name: `all ${category === "all" ? "" : category}`,
                  slug: "all",
                },
                ...allSubCategoryBySlugData,
              ].map((cat, idx) => (
                <TabsTrigger
                  key={cat.slug + 2 * idx}
                  value={cat.slug}
                  onClick={() => {
                    router.replace(
                      `/${category}/${sortBy
                        .toLowerCase()
                        .split("_")
                        .join("-")}/${
                        cat.slug === category ? "all" : `${cat.slug}`
                      }`,
                      { scroll: false }
                    );
                  }}
                  className="px-4 sm:py-2 -mb-px data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-secondary data-[state=active]:text-[#F3238A] data-[state=active]:shadow-none rounded-none uppercase hover:text-[#F3238A]"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
          </TabsList>
        </Tabs>
      </div> */}
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mt-4 -z-40",
          { "md:grid-cols-4 lg:grid-cols-4": !isOpenSideBar }
        )}
      >
        {products.map((product, index) => (
          <div
            key={`${product._id}-${index}`}
            // ref={index === products.length - 1 ? lastProductElementRef : null}
            className="group relative"
          >
            <ProductCard key={index} {...product} />
          </div>
        ))}
        {loading &&
          hasMore &&
          [...Array(6)].map((_, index) => (
            <Card
              key={index}
              className="border-0 shadow-none rounded-none animate-out"
            >
              <Skeleton className="aspect-[3/4] rounded-none bg-gray-100" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-4 w-1/3 mx-auto" />
              </div>
            </Card>
          ))}
      </div>

      {!hasMore && products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full w-full gap-2">
          <div className="relative flex justify-center items-center w-24 h-24">
            {/* <AspectRatio
                 ratio={1 / 1}
                 className=" overflow-hidden w-40 h-40 border"
               > */}

            <Image
              src={"/images/icons/no-product.svg"}
              alt="No Wishlist Item"
              fill
              className=""
            />
            {/* </AspectRatio> */}
          </div>
          <p className="capitalize text-gray-700 text-center font-public-sans text-sm">
            No Product Found
          </p>
        </div>
      )}
     
    </div>
  );
}
