"use client";

import { Product } from "../interfaces/product/product";
import { PRODUCT_PLACEHOLDER } from "../utils/constants/paths";
import { createImageUrl } from "../utils/functions/createImageUrl";
import { formatCurrency } from "../utils/functions/productPriceUtil";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function SearchProductOne({ product }: ProductCardProps) {
  let queryParams = `/${product.seoSlug}`;
  let color, size;

  product?.variants?.map((variant) => {
    switch (variant.title.toLowerCase()) {
      case "color":
        color = variant.optionsImageColorSlug[0];
      case "size":
        size = variant.options[0];
    }
  });
  if (color !== null && color !== undefined) {
    queryParams += `?color=${color}`;
  }
  if (size !== null && size !== undefined) {
    queryParams += `${
      color !== null && color !== undefined ? "&" : "?"
    }size=${size}`;
  }
  // if (age !== null) {
  //   queryParams += `${color !== null || size !== null ? '&' : '?'}age=${age}`
  // }

  const productPath = `/products${queryParams}`;
  return (
    <Link
      className="flex flex-row sm:flex-row gap-4   last:border-b-none border-b last:border-b-0 border-dashed border-b-[#D1AB66] py-3"
      href={productPath}
      passHref
    >
      {/* Product Image */}
      <div className="aspect-[1/1] h-auto sm:h-20  relative overflow-hidden flex-shrink-0 rounded-lg">
        {product.thumbnail ? (
          <Image
            src={createImageUrl(product.thumbnail)}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={PRODUCT_PLACEHOLDER.path}
            alt={PRODUCT_PLACEHOLDER.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between sm:py-0 pr-2">
        <div>
          {/* Title and Remove Button */}
          <div className="flex justify-between items-start">
            <h3 className="text-base sm:text-sm font-medium text-gray-900 font-federo line-clamp-2 max-w-3/4 hover:underline hover:underline-offset-4 hover:cursor-pointer transition-all duration-150 animate-in">
              {product.title}
            </h3>
          </div>
        </div>
        {/* Price Section */}
        <div className="flex sm:flex-row flex-col items-baseline gap-y-1 justify-between">
          <div className="flex items-center sm:mt-1 mt-1 text-center justify-between text-black w-full">
            <div>
              <div className=" flex justify-center items-center gap-2 font-federo">
                <p className=" text-xs lg:text-start text-start ">
                  INR 20
                  {/* {formatCurrency(
                    product?.perProductPrice as unknown as number
                  )} */}
                </p>
                <p className=" text-xs lg:text-start text-start  text-[#F3238A] line-through">
                  INR 40
                  {formatCurrency(product?.rows[0]?.mrp as unknown as number)}
                </p>
                <p className=" text-xs lg:text-start text-start  text-[#F3238A]">
                  {/* {`(${getDiscountPercentage(
                    product?.rows[0]?.perProductPrice,
                    product?.rows[0]?.mrp as unknown as number
                  )})`} */}
                  50%
                </p>
              </div>
            </div>
            <div className="text-green-700 text-xs">
              Saved ₹20
              {/* {formatCurrency(
                getDiscountPrice(
                  product.rows[0].perProductPrice,
                  product.rows[0].mrp as unknown as number
                ) as number
              )} */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
