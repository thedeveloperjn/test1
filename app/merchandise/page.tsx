"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation"; // Import hooks
import { Breadcrumb } from "../components/breadcrumb";
// import FilterChipList from "../components/filter-chip-arr";
// import { FilterSidebar } from "../components/filter/filter-sidebar";
// import { MobileFilterDrawer } from "../components/filter/mobile-filter";
// import ProductListWithTabs from "../components/layaouts/~product-list-tab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { cn } from "../lib/utils";
import ProductBox from "../components/Productbox";
import { FeatureBannerSectionListing } from "../sections/feature-banner-listing-page";
import { changeFilter, changeSortBy, clearFilter } from "../store/action/filter";
import { useFilterSlice } from "../store/slice/filter";
import { ChevronLeft, ListFilter, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() { // Remove props since we'll use hooks
  const selectedFilters = useFilterSlice((state) => state.filters);
  const params = useParams(); // Get route params
  const searchParams = useSearchParams(); // Get search params
  const slug = params?.slug || ""; // Access slug directly
  const category = searchParams.get("category") || "";
  const type = searchParams.get("sort") || "";
  const collection = searchParams.get("collection") || "";
  const router = useRouter();

  // const [selectedFilters, setSelectedFilters] = useState<FilterProps[]>([]);
  const [sortBy, setSortBy] = useState(type);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://swarnakriti-api.technolitics.com/api/v1/product/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status && data.product) {
          const mappedProducts = data.product.map((item: any) => ({
            _id: item._id || item.id,
            seoSlug: item.seoSlug || item.slug || "default-slug",
            title: item.title || item.name,
            images: item.images || [{ values: [{ url: item.thumbnail || "" }] }],
            rows: item.price
              ? [{ perProductPrice: item.price, mrp: item.mrp || item.price }]
              : [],
            thumbnail: item.thumbnail,
            variants: item.variants || [],
            isWishlisted: item.isWishlisted || false,
          }));
          setProducts(mappedProducts);
          setTotalProducts(data.count);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // const handleFilterChange = (filter: FilterProps) => {
  //   // setSelectedFilters((prev) =>
  //   //   prev.find((f) => f.type === filter.type && f.value === filter.value)
  //   //     ? prev.filter((f) => f.type !== filter.type && f.value !== filter.value)
  //   //     : [
  //   //         ...prev.filter(
  //   //           (f) => f.type !== filter.type && f.value !== filter.value
  //   //         ),
  //   //         filter,
  //   //       ]
  //   // );
  //   let newFilterObj: FilterProps, newFilter: FilterProps[];
  //   const pArrByCat = selectedFilters.find((f) => f.type === filter.type);

  //   const checkExistingFilterValue = (pArrByCat?.value as string[])?.includes(
  //     filter.value as string
  //   );
  //   if (pArrByCat && checkExistingFilterValue) {
  //     newFilterObj = {
  //       type: filter.type,
  //       value: [
  //         ...(pArrByCat?.value as string[]).filter(
  //           (fValue) => !fValue.includes(filter.value as string)
  //         ),
  //       ],
  //     };
  //     const removedExistingFilterArr = selectedFilters.filter(
  //       (f) => f.type !== filter.type
  //     );
  //     newFilter = [...removedExistingFilterArr, newFilterObj];
  //     setSelectedFilters(newFilter);
  //   } else {
  //     newFilterObj = {
  //       type: filter.type,
  //       value: [...(filter.value as string)],
  //     };
  //     const removedExistingFilterArr = selectedFilters.filter(
  //       (f) => f.type !== filter.type
  //     );
  //     newFilter = [...removedExistingFilterArr, newFilterObj];
  //     setSelectedFilters(newFilter);
  //   }
  // };

  // const handleFilterChange = (filter: FilterProps) => {
  //   const updatedFilters = selectedFilters.map((existingFilter) => {
  //     if (existingFilter.type === filter.type) {
  //       const currentValue = existingFilter.value as string[];

  //       if (Array.isArray(currentValue)) {
  //         // Handle array case: add/remove the value
  //         const valueExists = currentValue.includes(filter.value as string);
  //         const updatedValue = valueExists
  //           ? currentValue.filter((val) => val !== filter.value)
  //           : [...currentValue, filter.value as string];

  //         return {
  //           ...existingFilter,
  //           value: updatedValue.length > 0 ? updatedValue : null, // Remove the filter if the array becomes empty
  //         };
  //       } else if (currentValue === filter.value) {
  //         // If the current value is a single match, remove it
  //         return { ...existingFilter, value: null };
  //       } else {
  //         // Replace single value with a new one in an array
  //         return {
  //           ...existingFilter,
  //           value: [currentValue, filter.value].filter(Boolean),
  //         };
  //       }
  //     }
  //     return existingFilter;
  //   });

  //   // If no filter of this type exists, add a new one
  //   if (!selectedFilters.some((f) => f.type === filter.type)) {
  //     updatedFilters.push({
  //       type: filter.type,
  //       value: Array.isArray(filter.value) ? filter.value : [filter.value],
  //     });
  //   }

  //   // Remove any filters with null values (optional cleanup)
  //   const finalFilters = updatedFilters.filter((f) => f.value !== null);

  //   setSelectedFilters(finalFilters);
  // };

  // const handleFilterChange = (filter: FilterProps) => {
  //   setSelectedFilters((prevFilters) => {
  //     // Check if the filter with the given type already exists
  //     const filterIndex = prevFilters.findIndex((f) => f.type === filter.type);

  //     if (filterIndex !== -1) {
  //       // Filter exists, replace its value with newValues
  //       const updatedFilters = [...prevFilters];
  //       updatedFilters[filterIndex] = {
  //         ...updatedFilters[filterIndex],
  //         value: filter.value,
  //       };
  //       return updatedFilters;
  //     } else {
  //       // Filter does not exist, add a new filter
  //       return [
  //         ...prevFilters,
  //         {
  //           type: filter.type,
  //           value: filter.value,
  //         },
  //       ];
  //     }
  //   });
  // };

  return (
    <main className="relative animate-in duration-300  min-h-screen bg-white pb-10 flex justify-center">
      {/* <FeatureBannerSectionListing /> */}
      <div id="main-content" className="sticky top-0 max-w-[1200px] flex flex-col justify-center">
        {/* <div className="sticky top-0 h-[30vh] z-10 border">
          <div className="relative w-full h-full">
            <div className=" absolute top-0 w-full h-full  bg-gradient-to-b from-[#FFF0E3] to-white to-30%"></div>
          </div>
        </div> */}
        <div className="container mx-auto px-4 py-8 mb-20" id="plsh">
          <div className="sticky top-0 lg:h-auto h-auto items-center justify-between lg:mb-6 z-10">
            <div className="flex lg:flex-row flex-col justify-start lg:justify-between lg:items-center items-start lg:gap-4 gap-2 w-full bg-white">
              <Breadcrumb
                items={[
                  { label: "home", href: "/" },
                  { label: "products", href: "/products" },
                ]}
              />
              {/* Mobile Content */}
              <div className="lg:hidden flex w-full justify-between">
                {/* <MobileFilterDrawer
                  selectedFiltersGlobal={selectedFilters}
                  onFilterChange={changeFilter}
                /> */}
                <div className="lg:hidden flex sticky top-0">
                  <Select
                    onValueChange={(e) => setSortBy(e as any)}
                    value={sortBy}
                  >
                    <SelectTrigger
                      className="w-auto rounded-none lg:text-sm shadow-none focus:ring-0 text-black hover:text-secondary flex justify-start items-center p-0 border-none"
                      rightIcon={null}
                    >
                      <ListFilter className="mr-2 h-4 w-4" />
                      <SelectValue
                        placeholder="Sort By"
                        className="rounded-none text-primary text-start capitalize font-federo"
                      />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col gap-6 rounded-none shadow-none p-0 bg-[#FFF0E3] border border-primary/10">
                      <SelectItem value="NEW_ARRIVALS">New Arrival</SelectItem>
                      <SelectItem value="BEST_SELLER">Best sellers</SelectItem>
                      <SelectItem value="low_to_heigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="heigh_to_low">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-6">
                <div className="lg:flex hidden items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <p className="lg:text-sm text-xs text-secondary gap-2 tracking-wider font-light">
                    Genuine Kanchivaram Silks - Pure & Authentic
                  </p>
                </div>
                <div className="font-public-sans text-black lg:text-base text-sm">
                  {totalProducts > 0 ? `${totalProducts} Products` : null}
                </div>
                <div className="lg:flex hidden">
                  <Select
                    onValueChange={(e) => {
                      changeSortBy(e);
                      setSortBy(e as any);
                    }}
                    value={sortBy}
                  >
                    <SelectTrigger
                      className="w-auto rounded-none lg:text-sm shadow-none focus:ring-0 text-black hover:text-secondary lg:flex hidden justify-start items-center p-0 border-none"
                      rightIcon={null}
                    >
                      <ListFilter className="mr-2 h-4 w-4" />
                      <SelectValue
                        placeholder="Sort By"
                        className="rounded-none text-primary text-start capitalize font-federo"
                      />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col gap-6 rounded-none shadow-none p-0 bg-[#FFF0E3] border border-primary/10">
                      <SelectItem value="NEW_ARRIVALS">New Arrival</SelectItem>
                      <SelectItem value="BEST_SELLER">Best sellers</SelectItem>
                      <SelectItem value="low_to_heigh">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="heigh_to_low">
                        Price: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Render Products */}
          {loading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {products.map((product, index) => (
                <ProductBox key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No products available</div>
          )}

          {/* Filter Chip List */}
          {/* <FilterChipList filterProp={selectedFilters} /> */}

          {/* <div
            className={cn("relative lg:grid lg:grid-cols-9 lg:gap-8", {
              " lg:flex ": !isOpen,
            })}
          >
            <div
              className={cn("mt-2 lg:block lg:col-span-2 hidden", {
                hidden: !isOpen,
              })}
            >
              <div
                className={cn(
                  "flex gap-5 items-center justify-between sticky top-24 z-20 bg-white ",
                  {
                    hidden: !isOpen,
                  }
                )}
              >
                <h2
                  className={cn("text-black font-light italic", {
                    hidden: !isOpen,
                  })}
                >
                  FILTER BY
                </h2>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex text-xs text-gray-400 gap-2 hover:cursor-pointer",
                      { hidden: !isOpen }
                    )}
                    onClick={() => {
                      clearFilter();
                      router.push(
                        `/products?category=all&sort=${sortBy}&collection=all`,
                        { scroll: false }
                      );
                    }}
                  >
                    Reset <RotateCcw className="w-4 h-4" />
                  </div>
                  <div
                    className={cn(
                      "flex justify-center items-center border rounded-full bg-secondary w-5 h-5 hover:scale-110 hover:cursor-pointer",
                      { "rotate-180 hidden": !isOpen }
                    )}
                  >
                    <ChevronLeft
                      className="text-white"
                      onClick={() => setIsOpen(!isOpen)}
                    />
                  </div>
                </div>
              </div>

              <div
                className={cn("sticky top-36 h-[calc(100vh-20rem)] z-0", {
                  hidden: !isOpen,
                })}
              >
                <FilterSidebar
                  selectedFilters={selectedFilters}
                  onFilterChange={changeFilter}
                  isOpen={isOpen}
                />
              </div>
            </div>
            <div
              className={cn(
                " hidden justify-center items-center border rounded-full bg-secondary w-5 h-5 hover:scale-110 hover:cursor-pointer",
                { "rotate-180 absolute lg:flex top-3 -left-4": !isOpen }
              )}
            >
              <ChevronLeft
                className="text-white"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <div
              className={cn("lg:col-span-9 sticky top-16", {
                "lg:col-span-9": !isOpen,
              })}
            >
              <ProductListWithTabs
                category={category}
                collection={collection}
                selectedFilters={selectedFilters}
                sortBy={sortBy}
                setTotalProducts={setTotalProducts}
                isOpenSideBar={isOpen}
              />
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}