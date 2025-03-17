"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterProps } from "@/interfaces/filter/filter";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/services/category/category";
import { Filter, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FilterOptionComp from "./filter-option-comp";

import { getAllColorFamily } from "@/services/color/color-family";
import { getAllOccassions } from "@/services/occassion/occassion";
import { changeAllFilter, clearFilter } from "@/store/action/filter";
import { WEAVING_PATTERN, ZARI } from "@/utils/constants/filter";
import { PriceRangeSlider } from "./price-slider";

type MobileFilterDrawerProps = {
  selectedFiltersGlobal: FilterProps[];
  onFilterChange: (filter: FilterProps) => void;
};
const filters = {
  CATEGORY: ["Saree", "Dhoti"],
  OCCATION: ["Wedding", "Festival", "Casual", "Party Wear"],
  "PRICE RANGE": ["Under ₹10,000", "₹10,000 - ₹20,000", "Above ₹20,000"],
  COLOR: ["Red", "Blue", "Green", "Purple", "Pink", "Yellow", "Gold"],
  ZARI: ["Gold Zari", "Silver Zari", "Copper Zari"],
  "WEAVING PATTERN": ["Traditional", "Contemporary", "Geometric"],
};

export function MobileFilterDrawer({
  selectedFiltersGlobal,
  onFilterChange,
}: MobileFilterDrawerProps) {
  const router = useRouter();
  const { allCategoriesData, isAllCategoriesPending } = getAllCategories();
  const { allOccassionsData, isAllOccassionsPending } = getAllOccassions();
  const { allColorFamilyData, isAllColorFamilyPending } = getAllColorFamily();
  const [selectedFilters, setSelectedFilters] = useState<FilterProps[]>(
    selectedFiltersGlobal || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    5000, 1_00_000,
  ]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    handleChangeFilter({
      type: "PRICE-RANGE",
      value: priceRange[0].toString() + "-" + priceRange[1].toString(),
    });
  }, [priceRange]);

  const handleChangeFilter = async (filter: FilterProps) => {
    setSelectedFilters((filters) => {
      // Check if the filter with the given type already exists
      const filterIndex = filters.findIndex((f) => f.type === filter.type);

      if (filterIndex !== -1) {
        // Filter exists, replace its value with newValues
        return [
          ...filters.slice(0, filterIndex),
          { ...filters[filterIndex], value: filter.value },
          ...filters.slice(filterIndex + 1),
        ];
      } else {
        // Filter does not exist, add a new filter
        return [...filters, { type: filter.type, value: filter.value }];
      }
    });
  };

  const FilterOptions = (filterType: any) => {
    switch (filterType) {
      case "CATEGORY": {
        const getFilterCategory = selectedFilters?.find(
          (filter) => filter.type === "CATEGORY"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            <div
              className={cn(
                "hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters?.find(
                      (filter) => filter.type === "CATEGORY"
                    )?.value === "all",
                }
              )}
              onClick={() => {
                router.replace(`/${"all"}/new-arrivals/all`, { scroll: false });
                handleChangeFilter({ type: "CATEGORY", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"CATEGORY"}
              />
            </div>

            {allCategoriesData &&
              allCategoriesData.map((cat, idx) => (
                <div
                  key={cat._id}
                  className={cn(
                    "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                    {
                      "text-[#F3238A]": (
                        getFilterCategory?.value as string[]
                      )?.includes(cat.slug as never),
                    }
                  )}
                  onClick={() => {
                    router.replace(`/${cat.slug}/new-arrivals/all`, {
                      scroll: false,
                    });
                    handleChangeFilter({
                      type: "CATEGORY",
                      value: cat.slug,
                    });
                  }}
                >
                  <FilterOptionComp
                    cat={cat}
                    selectedFilters={selectedFilters}
                    filterType="CATEGORY"
                  />
                </div>
              ))}
          </div>
        );
      }
      case "OCCATION": {
        const getFilterCategory = selectedFilters.find(
          (filter) => filter.type === "OCCATION"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            <div
              className={cn(
                "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "OCCATION")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                handleChangeFilter({ type: "OCCATION", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"OCCATION"}
              />
            </div>

            {allOccassionsData &&
              allOccassionsData.map((occassion, idx) => (
                <div
                  key={occassion._id}
                  className={cn(
                    "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                    {
                      "text-[#F3238A]": (
                        getFilterCategory?.value as string[]
                      )?.includes(occassion.slug),
                    }
                  )}
                  onClick={() => {
                    const currentValues =
                      typeof getFilterCategory?.value === "string"
                        ? []
                        : (getFilterCategory?.value as string[]) || [];
                    const valueExists = currentValues?.includes(
                      occassion?.slug as string
                    );

                    const updatedValue = valueExists
                      ? currentValues.filter(
                          (val) =>
                            val !== occassion?.slug &&
                            val !== null &&
                            val !== "all"
                        )
                      : [...currentValues, occassion?.slug as string];

                    handleChangeFilter({
                      type: "OCCATION",
                      value: updatedValue as string[],
                    });
                  }}
                >
                  <FilterOptionComp
                    cat={occassion}
                    selectedFilters={selectedFilters}
                    filterType="OCCATION"
                  />
                </div>
              ))}
          </div>
        );
      }
      case "PRICE RANGE":
        return (
          <div className="space-y-4 capitalize text-sm">
            <PriceRangeSlider setPriceRangeProps={setPriceRange} />
          </div>
        );
      case "COLOR": {
        const getFilterCategory = selectedFilters.find(
          (filter) => filter.type === "COLOR"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            <div
              className={cn(
                "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "COLOR")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                handleChangeFilter({ type: "COLOR", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"COLOR"}
              />
            </div>

            {allColorFamilyData &&
              allColorFamilyData.map((color, idx) => (
                <div
                  key={color._id}
                  className={cn(
                    "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                    {
                      "text-[#F3238A]":
                        selectedFilters.find(
                          (filter) => filter.type === "COLOR"
                        )?.value ===
                        `${
                          color?.colorName?.toLowerCase() +
                          "-" +
                          color?.hexaColor?.toLowerCase()
                        }`,
                    }
                  )}
                  onClick={() => {
                    const currentValues =
                      typeof getFilterCategory?.value === "string"
                        ? []
                        : (getFilterCategory?.value as string[]) || [];
                    const valueExists = currentValues?.includes(
                      `${
                        color?.colorName?.toLowerCase() +
                        "-" +
                        color?.hexaColor?.toLowerCase()
                      }` as string
                    );

                    const updatedValue = valueExists
                      ? currentValues.filter(
                          (val) =>
                            val !==
                              `${
                                color?.colorName?.toLowerCase() +
                                "-" +
                                color?.hexaColor?.toLowerCase()
                              }` && val !== null
                        )
                      : [
                          ...currentValues,
                          `${
                            color?.colorName?.toLowerCase() +
                            "-" +
                            color?.hexaColor?.toLowerCase()
                          }` as string,
                        ];

                    handleChangeFilter({
                      type: "COLOR",
                      value: updatedValue,
                    });
                  }}
                >
                  <FilterOptionComp
                    cat={{
                      name: color.colorName,
                      slug:
                        color?.colorName?.toLowerCase() +
                        "-" +
                        color?.hexaColor?.toLowerCase(),
                      colorCode: color.hexaColor,
                    }}
                    selectedFilters={selectedFilters}
                    filterType="COLOR"
                  />
                </div>
              ))}
          </div>
        );
      }
      case "ZARI": {
        const getFilterCategory = selectedFilters.find(
          (filter) => filter.type === "ZARI"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            <div
              className={cn(
                "hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "ZARI")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                handleChangeFilter({ type: "ZARI", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"ZARI"}
              />
            </div>

            {ZARI.map((cat, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                  {
                    "text-[#F3238A]":
                      selectedFilters.find((filter) => filter.type === "ZARI")
                        ?.value === cat.slug,
                  }
                )}
                onClick={() => {
                  const currentValues =
                    typeof getFilterCategory?.value === "string"
                      ? []
                      : (getFilterCategory?.value as string[]) || [];
                  const valueExists = currentValues?.includes(
                    cat?.slug as string
                  );

                  const updatedValue = valueExists
                    ? currentValues.filter(
                        (val) => val !== cat?.slug && val !== null
                      )
                    : [...currentValues, cat?.slug as string];
                  handleChangeFilter({ type: "ZARI", value: updatedValue });
                }}
              >
                <FilterOptionComp
                  cat={cat}
                  selectedFilters={selectedFilters}
                  filterType="ZARI"
                />
              </div>
            ))}
          </div>
        );
      }
      case "WEAVING PATTERN": {
        const getFilterCategory = selectedFilters.find(
          (filter) => filter.type === "WEAVING PATTERN"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            <div
              className={cn(
                "hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find(
                      (filter) => filter.type === "WEAVING PATTERN"
                    )?.value === "all",
                }
              )}
              onClick={() => {
                handleChangeFilter({ type: "WEAVING PATTERN", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"WEAVING PATTERN"}
              />
            </div>

            {WEAVING_PATTERN.map((cat, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                  {
                    "text-[#F3238A]":
                      selectedFilters.find(
                        (filter) => filter.type === "WEAVING PATTERN"
                      )?.value === cat.slug,
                  }
                )}
                onClick={() => {
                  const currentValues =
                    typeof getFilterCategory?.value === "string"
                      ? []
                      : (getFilterCategory?.value as string[]) || [];
                  const valueExists = currentValues?.includes(
                    cat?.slug as string
                  );

                  const updatedValue = valueExists
                    ? currentValues.filter(
                        (val) => val !== cat?.slug && val !== null
                      )
                    : [...currentValues, cat?.slug as string];
                  handleChangeFilter({
                    type: "WEAVING PATTERN",
                    value: updatedValue,
                  });
                }}
              >
                <FilterOptionComp
                  cat={cat}
                  selectedFilters={selectedFilters}
                  filterType="WEAVING PATTERN"
                />
              </div>
            ))}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden w-auto rounded-none text-lg border-none shadow-none focus:ring-0 text-black hover:text-[#F3238A] flex justify-start items-center bg-transparent p-0 focus:bg-transparent focus:text-black"
        >
          <Filter className=" h-5 w-5" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90%]">
        <DrawerHeader className="sticky top-0 z-10 bg-background">
          <DrawerTitle className="font-light uppercase">Filters</DrawerTitle>
          <DrawerDescription hidden>
            Apply filters to refine your search
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="overflow-y-scroll max-h-[60vh] no-scrollbar">
            <Accordion type="multiple" className="w-full">
              {Object.entries(filters).map(([category, options]) => (
                <AccordionItem
                  key={category}
                  value={category}
                  className="border-b border-dashed border-gray-200 py-2"
                >
                  <AccordionTrigger className="text-sm text-black font-normal hover:no-underline">
                    {category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allCategoriesData && FilterOptions(category)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <DrawerFooter className="flex flex-row" hidden>
          <Button
            variant="outline"
            onClick={() => {
              clearFilter();
              setOpen(false);
            }}
            className="w-1/2"
          >
            Reset Filters
            <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
          <DrawerClose asChild className="w-1/2">
            <Button
              variant="default"
              onClick={() => {
                changeAllFilter(selectedFilters);
                setOpen(false);
              }}
              className=" font-normal uppercase text-white"
            >
              Apply Filters
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
