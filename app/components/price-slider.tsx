import { Slider } from "../components/ui/slider";
import { SetStateAction, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { changeFilter } from "../store/action/filter";
import { FilterProps } from "../interfaces/filter/filter";

// Utility function to format numbers with commas
const formatWithCommas = (value: number) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
interface PriceRangeProps {
  onChangePriceRange?: (value: FilterProps) => void;
  setPriceRangeProps?: React.Dispatch<React.SetStateAction<[number, number]>>;
}
export function PriceRangeSlider(priceProps: PriceRangeProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    5000, 1_00_000,
  ]);
  const { onChangePriceRange, setPriceRangeProps } = priceProps;
  // useEffect(() => {
  //   changeFilter({
  //     type: "PRICE-RANGE",
  //     value: priceRange[0].toString() + "-" + priceRange[1].toString(),
  //   });
  // }, [priceRange]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
    setPriceRangeProps && setPriceRangeProps([values[0], values[1]]);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, "");
    const minValue = Math.min(Number(value), priceRange[1]);
    setPriceRange([minValue, priceRange[1]]);
    setPriceRangeProps && setPriceRangeProps([minValue, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, "");
    const maxValue = Number(value);
    setPriceRange([priceRange[0], maxValue]);
    setPriceRangeProps && setPriceRangeProps([priceRange[0], maxValue]);
  };

  const handleMinBlur = () => {
    const minValue = Math.max(2000, priceRange[0]);
    setPriceRange([minValue, priceRange[1]]);
    setPriceRangeProps && setPriceRangeProps([minValue, priceRange[1]]);
  };

  const handleMaxBlur = () => {
    const maxValue = Math.max(2000, Math.min(2_00_000, priceRange[1]));
    // Ensure max is not less than min
    const adjustedMax = maxValue < priceRange[0] ? priceRange[0] : maxValue;
    setPriceRange([priceRange[0], adjustedMax]);
    setPriceRangeProps && setPriceRangeProps([priceRange[0], adjustedMax]);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto px-0 py-1 bg-[#fff7f5e8]w rounded-lg">
      {/* Min and Max Inputs */}
      <div className="flex justify-between items-center gap-4 w-full">
        {/* Min Input */}
        <div className="flex flex-col items-center gap-3">
          <Label
            htmlFor="minPrice"
            className="text-xs text-black font-light hidden"
          >
            Min. Price(₹)
          </Label>
          <Input
            id="minPrice"
            type="text"
            value={priceRange[0] === 0 ? "" : formatWithCommas(priceRange[0])}
            onChange={handleMinChange}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              changeFilter({
                type: "PRICE-RANGE",
                value:
                  priceRange[0].toString() + "-" + priceRange[1].toString(),
              })
            }
            onBlur={() => {
              handleMinBlur();
              changeFilter({
                type: "PRICE-RANGE",
                value:
                  priceRange[0].toString() + "-" + priceRange[1].toString(),
              });
            }}
            className="w-20 px-2 border rounded-full no-spinner text-black font-light h-auto"
          />
        </div>

        {/* Max Input */}
        <div className="flex flex-col items-center gap-3 px-1">
          <Label
            htmlFor="maxPrice"
            className="text-xs text-black font-light hidden"
          >
            Max. Price(₹)
          </Label>
          <Input
            id="maxPrice"
            type="text"
            value={priceRange[1] === 0 ? "" : formatWithCommas(priceRange[1])}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              changeFilter({
                type: "PRICE-RANGE",
                value:
                  priceRange[0].toString() + "-" + priceRange[1].toString(),
              })
            }
            onChange={handleMaxChange}
            onBlur={() => {
              handleMaxBlur();
              changeFilter({
                type: "PRICE-RANGE",
                value:
                  priceRange[0].toString() + "-" + priceRange[1].toString(),
              });
            }}
            className="w-20 px-2 border rounded-full no-spinner text-black font-light h-auto"
          />
        </div>
      </div>
      {/* Slider */}
      <div className=" w-full">
        <Slider
          value={priceRange}
          onValueChange={handleSliderChange}
          onValueCommit={() =>
            changeFilter({
              type: "PRICE-RANGE",
              value: priceRange[0].toString() + "-" + priceRange[1].toString(),
            })
          }
          min={2000}
          max={2_00_000}
          step={500}
          className="w-full"
          showMaxThumb={true}
        />
      </div>

      {/* Display Price Range */}
      <p className="text-xs text-gray-600">
        Selected Range: ₹{formatWithCommas(priceRange[0])} - ₹
        {formatWithCommas(priceRange[1])}
      </p>
    </div>
  );
}
