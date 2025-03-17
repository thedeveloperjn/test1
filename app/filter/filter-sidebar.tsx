import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FilterProps } from "@/interfaces/filter/filter";
import { cn } from "@/lib/utils";
import { getAllCategories } from "@/services/category/category";
import { getAllColorFamily } from "@/services/color/color-family";
import { getAllOccassions } from "@/services/occassion/occassion";
import { changeFilter } from "@/store/action/filter";
import { WEAVING_PATTERN, ZARI } from "@/utils/constants/filter";
import { useRouter } from "next/navigation";
import FilterOptionComp from "./filter-option-comp";
import { PriceRangeSlider } from "./price-slider";

type SidebarProps = {
  selectedFilters: FilterProps[];
  onFilterChange: (filter: FilterProps) => void;
  isOpen: boolean;
};

const filters = {
  CATEGORY: ["Saree", "Dhoti"],
  // AVAILABILITY: ["In Stock", "Out of Stock"],
  OCCATION: ["Wedding", "Festival", "Casual", "Party Wear"],
  "PRICE-RANGE": ["Under ₹10,000", "₹10,000 - ₹20,000", "Above ₹20,000"],
  COLOR: ["Red", "Blue", "Green", "Purple", "Pink", "Yellow", "Gold"],
  ZARI: ["Gold Zari", "Silver Zari", "Copper Zari"],
  "WEAVING PATTERN": ["Traditional", "Contemporary", "Geometric"],
};

export function FilterSidebar({ selectedFilters }: SidebarProps) {
  const router = useRouter();
  const { allCategoriesData, isAllCategoriesPending } = getAllCategories();
  const { allOccassionsData, isAllOccassionsPending } = getAllOccassions();
  const { allColorFamilyData, isAllColorFamilyPending } = getAllColorFamily();
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
                    selectedFilters.find((filter) => filter.type === "CATEGORY")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                router.replace(`/${"all"}/new-arrivals/all`, { scroll: false });
                changeFilter({ type: "CATEGORY", value: "all" });
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
                    changeFilter({
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
            {/* <div
              className={cn(
                "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "OCCATION")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                changeFilter({ type: "OCCATION", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"OCCATION"}
              />
            </div> */}

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

                    changeFilter({
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
      case "PRICE-RANGE":
        return (
          <div className="space-y-4 capitalize text-sm">
            <PriceRangeSlider />
          </div>
        );
      case "COLOR": {
        const getFilterCategory = selectedFilters.find(
          (filter) => filter.type === "COLOR"
        );
        return (
          <div className="space-y-4 capitalize text-sm">
            {/* <div
              className={cn(
                "flex items-center gap-2 hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "COLOR")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                changeFilter({ type: "COLOR", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"COLOR"}
              />
            </div> */}

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

                    changeFilter({
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
            {/* <div
              className={cn(
                "hover:cursor-pointer hover:text-[#F3238A] group ml-2",
                {
                  "text-[#F3238A]":
                    selectedFilters.find((filter) => filter.type === "ZARI")
                      ?.value === "all",
                }
              )}
              onClick={() => {
                changeFilter({ type: "ZARI", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"ZARI"}
              />
            </div> */}

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
                  changeFilter({ type: "ZARI", value: updatedValue });
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
            {/* <div
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
                changeFilter({ type: "WEAVING PATTERN", value: "all" });
              }}
            >
              <FilterOptionComp
                cat={{ slug: "all", name: "All" }}
                selectedFilters={selectedFilters}
                filterType={"WEAVING PATTERN"}
              />
            </div> */}

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
                  changeFilter({
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
    <div
      className={cn("md:block hidden md:w-auto transition-all duration-500")}
    >
      <div className="sticky- top-20 z-10 pb-4 pt-2">
        <div className="space-y-4">
          <Accordion
            type="single"
            className="w-auto bg-transparent"
            collapsible
          >
            {Object.entries(filters).map(([category, options]) => (
              <AccordionItem
                key={category}
                value={category}
                className=" border-dashed border-gray-200 py-2"
              >
                <AccordionTrigger
                  className={cn(
                    "text-sm text-black font-normal  border-none hover:no-underline data-[state=open]:font-semibold"
                  )}
                >
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  {allCategoriesData && FilterOptions(category)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
