import { Category } from "@/interfaces/categories/caegory";
import { FilterProps } from "@/interfaces/filter/filter";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  selectedFilters: FilterProps[];
  cat: { slug: string; name: string; colorCode?: string };
  filterType: string;
};

function FilterOptionComp({ selectedFilters, cat, filterType }: Props) {
  return (
    <div className="flex items-center gap-2 ">
      {" "}
      <div
        className={cn(
          "flex justify-center items-center w-5 h-5 rounded-full border group-hover:bg-secondary group-hover:border-secondary",
          {
            " bg-secondary border-transparent": (
              selectedFilters.find((filter) => filter.type === filterType)
                ?.value as string[]
            )?.includes(cat.slug),
          }
        )}
      >
        {(
          selectedFilters.find((filter) => filter.type === filterType)
            ?.value as string[]
        )?.includes(cat.slug) && <Check className="w-4 h-4 text-white" />}
      </div>
      {filterType === "COLOR" &&
        (cat.slug !== "all" ? (
          <div
            className="w-3 h-3"
            style={{ backgroundColor: cat.colorCode }}
          ></div>
        ) : (
          <div className="w-3 h-3 bg-[radial-gradient(circle,_#ffffff,_#ffeb3b,_#ff5722,_#4caf50,_#2196f3)]"></div>
        ))}
      <div className=" text-black font-normal text-base">
        {cat?.name?.toLowerCase()}
      </div>{" "}
    </div>
  );
}

export default FilterOptionComp;
