"use client";

import { Button } from "@/components/ui/button";
import { FilterProps } from "@/interfaces/filter/filter";
import { changeFilter, clearFilter } from "@/store/action/filter";
import { useFilterSlice } from "@/store/slice/filter";
import { formatCurrency } from "@/utils/functions/productPriceUtil";
import { ChevronLeft, X } from "lucide-react";
import { useRef } from "react";

const FilterChipList = ({
  filterProp = [],
}: {
  filterProp?: FilterProps[];
}) => {
  const filterProp2 = useFilterSlice((state) => state.filters) || [];
  // const changeFilter = useFilterSlice((state) => state.changeFilter);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to flatten all filter values into an array of objects with {type, value}
  const flattenValues = () => {
    return filterProp2.reduce<{ type: string; value: string }[]>(
      (acc, filter) => {
        if (!filter.type) {
          // Skip filters with null or undefined type
          return acc;
        }

        if (Array.isArray(filter.value)) {
          // Map each value in the array to an object with type and value
          acc.push(
            ...filter.value.map((val) => ({
              type: filter.type as string,
              value: String(val),
            }))
          );
        } else if (filter.value) {
          // Add a single object with type and value
          acc.push({
            type: filter.type as string,
            value: String(filter.value),
          });
        }
        return acc;
      },
      []
    );
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const flattenedValues = flattenValues();
  function containsAllValue(arr: { type: string; value: string }[]): boolean {
    return arr.some((item) => item.value === "all");
  }
  return (
    <div className="flex items-center w-full space-x-3 sticky- top-9 z-20 bg-white">
      {/* Scroll Button */}
      {flattenedValues.length > 0 && (
        <Button
          onClick={handleScrollLeft}
          className="flex-shrink-0 p-1 bg-secondary text-white rounded-full hover:bg-secondary/90 h-auto"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      )}

      {/* Scrolling Container for Chips */}
      <div
        ref={scrollContainerRef}
        className="relative flex-1 overflow-x-auto no-scrollbar"
        style={{ direction: "rtl" }}
      >
        <div
          className="flex p-2 min-w-fit justify-end space-x-2"
          style={{ direction: "ltr" }}
        >
          {/* Iterate over the flattened array of values */}
          {flattenedValues
            .filter((f2) => f2.type !== "PRICE-RANGE" && f2.type !== "COLOR")
            .map((f, idx) =>
              f.type !== "PRICE-RANGE" && f.value !== "all" ? (
                <div
                  key={idx}
                  className="flex items-center gap-1 pl-3 pr-1 py-1 border border-secondary/20 text-black font-light text-sm rounded-full whitespace-nowrap leading-6 capitalize"
                >
                  <span>{f.value.replace(/[_-]/g, " ").toLowerCase()}</span>

                  {/* Remove Button */}
                  <Button
                    onClick={() => {
                      const filterToUpdate = filterProp2.find((filter) =>
                        Array.isArray(filter.value)
                          ? (filter.value as string[]).includes(f.value)
                          : filter.value === f.value
                      );

                      if (filterToUpdate) {
                        const updatedValue = Array.isArray(filterToUpdate.value)
                          ? (filterToUpdate.value as string[]).filter(
                              (val) => val !== f.value
                            )
                          : [];

                        changeFilter({
                          type: filterToUpdate.type,
                          value: updatedValue,
                        });
                      }
                    }}
                    className="text-white hover:text-black h-4 w-4 rounded-full p-1 bg-transparent group shadow-none hover:bg-transparent"
                  >
                    <X className="w-2 h-2 text-gray-600 group-hover:text-black" />
                  </Button>
                </div>
              ) : (
                ""
              )
            )}

          {flattenedValues.find((f2, idx) => f2.type === "PRICE-RANGE")?.type &&
            flattenedValues.find((f2, idx) => f2.type === "PRICE-RANGE")
              ?.value && (
              <div
                // key={idx}
                className="flex items-center gap-1 pl-3 pr-1 py-1 border border-secondary/20 text-black font-light text-sm rounded-full whitespace-nowrap leading-6 capitalize"
              >
                {
                  <div>
                    <span>Price ₹</span>
                    {formatCurrency(
                      parseInt(
                        flattenedValues
                          .find((f2, idx) => f2.type === "PRICE-RANGE")
                          ?.value.split("-")[0] as string
                      )
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      parseInt(
                        flattenedValues
                          .find((f2, idx) => f2.type === "PRICE-RANGE")
                          ?.value.split("-")[1] as string
                      )
                    )}
                  </div>
                }

                {/* Remove Button */}
                <Button
                  onClick={() => {
                    const filterToUpdate = filterProp2.find((filter) =>
                      Array.isArray(filter.value)
                        ? (filter.value as string[]).includes(
                            flattenedValues.find(
                              (f2, idx) => f2.type === "PRICE-RANGE"
                            )?.value as string
                          )
                        : filter.value ===
                          flattenedValues.find(
                            (f2, idx) => f2.type === "PRICE-RANGE"
                          )?.value
                    );

                    if (filterToUpdate) {
                      const updatedValue = Array.isArray(filterToUpdate.value)
                        ? (filterToUpdate.value as string[]).filter(
                            (val) =>
                              val !==
                              flattenedValues.find(
                                (f2, idx) => f2.type === "PRICE-RANGE"
                              )?.value
                          )
                        : [];

                      changeFilter({
                        type: filterToUpdate.type,
                        value: updatedValue,
                      });
                    }
                  }}
                  className="text-white hover:text-black h-4 w-4 rounded-full p-1 bg-transparent group shadow-none hover:bg-transparent"
                >
                  <X className="w-2 h-2 text-gray-600 group-hover:text-black" />
                </Button>
              </div>
            )}

          {flattenedValues.find((f2, idx) => f2.type === "COLOR")?.type &&
            flattenedValues.find((f2, idx) => f2.type === "COLOR")?.value &&
            flattenedValues.find((f2, idx) => f2.type === "COLOR")?.value !==
              "all" && (
              <div
                // key={idx}
                className="flex items-center gap-1 pl-3 pr-1 py-1 border border-secondary/20 text-black font-light text-sm rounded-full whitespace-nowrap leading-6 capitalize"
              >
                {
                  <div>
                    {
                      flattenedValues
                        .find((f2, idx) => f2.type === "COLOR")
                        ?.value.split("-")[0] as string
                    }
                    {/* {" "}
                    -{" "}
                    {
                      flattenedValues
                        .find((f2, idx) => f2.type === "COLOR")
                        ?.value.split("-")[1] as string
                    } */}
                  </div>
                }

                {/* Remove Button */}
                <Button
                  onClick={() => {
                    const filterToUpdate = filterProp2.find((filter) =>
                      Array.isArray(filter.value)
                        ? (filter.value as string[]).includes(
                            flattenedValues.find(
                              (f2, idx) => f2.type === "COLOR"
                            )?.value as string
                          )
                        : filter.value ===
                          flattenedValues.find((f2, idx) => f2.type === "COLOR")
                            ?.value
                    );

                    if (filterToUpdate) {
                      const updatedValue = Array.isArray(filterToUpdate.value)
                        ? (filterToUpdate.value as string[]).filter(
                            (val) =>
                              val !==
                              flattenedValues.find(
                                (f2, idx) => f2.type === "COLOR"
                              )?.value
                          )
                        : [];

                      changeFilter({
                        type: filterToUpdate.type,
                        value: updatedValue,
                      });
                    }
                  }}
                  className="text-white hover:text-black h-4 w-4 rounded-full p-1 bg-transparent group shadow-none hover:bg-transparent"
                >
                  <X className="w-2 h-2 text-gray-600 group-hover:text-black" />
                </Button>
              </div>
            )}
          {/* {flattenedValues
            .filter((f2, idx) => f2.type === "PRICE-RANGE" && f2.type === "COLOR")
            .map(() => {
              <>dd</>;
            })} */}
        </div>
      </div>

      {/* Clear All Button */}
      {flattenedValues.length > 0 && (
        <Button
          onClick={() => {
            clearFilter();
          }}
          className="flex items-center px-2 py-1 border border-primary text-white font-light text-sm rounded-full whitespace-nowrap leading-6"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChipList;
