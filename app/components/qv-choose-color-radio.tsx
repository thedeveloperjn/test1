import { Product } from "../interfaces/product/product";
import { cn } from "../lib/utils";
import { createImageUrl } from "../utils/functions/createImageUrl";
import Image from "next/image";
import React from "react";

interface RadioGroupProps {
  selectedAge?: string;
  productDetail: Product;
  options?: Array<string>;
  selectedOption: string;
  images: Array<string>;
  onChange: (value: string) => void;
}

const ColorSelectionRadio: React.FC<RadioGroupProps> = ({
  options,
  selectedOption,
  images,
  onChange,
}) => {
  return (
    <div className="flex gap-4">
      {options &&
        options?.map((color, idx) => {
          return (
            <div
              key={color}
              className="flex flex-col gap-2 justify-center items-center"
            >
              <label
                key={color}
                className={`relative rounded-full overflow-hidden w-14 sm:w-14 h-14 sm:h-14 bg-secondary  box-border ${
                  selectedOption === color
                    ? "ring-2 ring-[#AF7346] ring-offset-2"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="radioGroup"
                  value={color}
                  checked={selectedOption === color}
                  onChange={() => onChange(color)}
                />
                {images[idx] ? (
                  <Image
                    className="w-12 h-12"
                    fill
                    src={createImageUrl(images[idx])}
                    alt={images[idx]}
                  />
                ) : (
                  <>
                    <div
                      className="w-12 h-12"
                      style={{ backgroundColor: color }}
                    />
                  </>
                )}
              </label>
              <p className="text-sm font-light capitalize">{color}</p>
            </div>
          );
        })}
    </div>
  );
};
export default ColorSelectionRadio;

//   <div key={idx} className="flex flex-col gap-2 justify-center items-center">
//     <Button

//       className={`relative rounded-full overflow-hidden w-14 sm:w-20 h-14 sm:h-20 bg-secondary ${
//         selectedColor === variant.colorSlug
//           ? "ring-2 ring-primary ring-offset-2"
//           : ""
//       }`}
//     >
//       <Image
//         src={createImageUrl(variant.colorImages)}
//         alt={variant.colorSlug + " "}
//         fill
//         className="object-cover w-full h-full"
//       />
//     </Button>
//     <p className="text-sm font-light">{variant.title}</p>
//   </div>;
