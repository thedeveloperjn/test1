"use client";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import {
  CustomerCartItem,
  RemoveCartItemPayload,
  UpdateCartItemQtyPayload,
} from "../interfaces/cart/cart";
import { cn } from "../lib/utils";
import { removeCartItem, updateCartItemQty } from "../store/action/cart";
import { PRODUCT_PLACEHOLDER } from "../utils/constants/paths";
import { createImageUrl } from "../utils/functions/createImageUrl";
import {
  formatCurrency,
  getDiscountPercentage,
  getDiscountPrice,
} from "../utils/functions/productPriceUtil";
import { useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash, X } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: CustomerCartItem;
}

export default function CartProductOne({ product }: ProductCardProps) {
  const queryClient = useQueryClient();

  const handleIncrement = () => {
    const cartPayload: UpdateCartItemQtyPayload = {
      variant: product.rows.variantData,
      productId: product?._id,
      quantity: product.quantity + 1,
    };

    updateCartItemQty(cartPayload);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      const cartPayload: UpdateCartItemQtyPayload = {
        variant: product.rows.variantData,
        productId: product?._id,
        quantity: product.quantity - 1,
      };

      updateCartItemQty(cartPayload);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      const cartPayload: UpdateCartItemQtyPayload = {
        variant: product.variant.map((variant) => ({
          title: variant.title,
          value: variant.options[0],
          image: variant.images[0],
        })),
        productId: product?._id,
        quantity: value,
      };

      updateCartItemQty(cartPayload);
    }
  };

  const handleRemoveCartItem = () => {
    const cartPayload: RemoveCartItemPayload = {
      variant: product.rows.variantData,
      productId: product?._id,
    };
    removeCartItem(cartPayload);
  };
  return (
    <div className="flex flex-row sm:flex-row gap-4 pb-8">
      {/* Product Image */}
      <div className="aspect-[3/4] sm:h-32 h-32 relative overflow-hidden flex-shrink-0 rounded-lg">
        {product?.image ? (
          <Image
            src={
              product?.rows?.variantData?.length > 1
                ? createImageUrl(
                    product?.rows?.variantData?.filter(
                      (e) => e?.title == "color"
                    )[0]?.image || ""
                  )
                : product?.image
            }
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <Image
            src={PRODUCT_PLACEHOLDER.path}
            alt={PRODUCT_PLACEHOLDER.title}
            fill
            unoptimized
            className="object-cover"
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between sm:py-2 pr-2">
        <div>
          {/* Title and Remove Button */}
          <div className="flex justify-between items-start">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 font-federo sm:line-clamp-2 line-clamp-1 sm:pr-14 max-w-3/4 hover:underline hover:underline-offset-4 hover:cursor-pointer transition-all duration-150 animate-in">
              {product?.title}
            </h3>

            <div
              onClick={() => handleRemoveCartItem()}
              className="group text-black hover:text-primary hover:bg-transparent bg-transparent shadow-none w-2 h-2 mr-2 hover:cursor-pointer "
            >
              <X
                strokeWidth={1.5}
                className="group-hover:fill-primary/20 transition-colors duration-100 animate-in animate-out"
              />
            </div>
          </div>
          {/* Size */}
          {/* <div className="inline-block text-xs sm:text-sm font-dm-sans capitalize">
            {product?.rows?.variantData
              ? product?.rows?.variantData[0]?.title
              : null}
          </div> */}
        </div>
        {/* varient section */}
        {/* <div>
          <div className="flex gap-2">
            {product?.rows?.variantData?.filter(
              (e) => e?.title == "color"
            )[0] && (
              <div className="relative w-8 h-8 border border-gray-200 p-1 my-2">
                {product?.rows.variantData.filter((e) => e?.title == "color")[0]
                  .colorWith === "IMAGE" ? (
                  <div className="inline-block text-xs sm:text-sm font-dm-sans capitalize">
                    <Image
                      src={createImageUrl(
                        product?.rows?.variantData?.filter(
                          (e) => e?.title == "color"
                        )[0]?.image || ""
                      )}
                      alt=""
                      fill
                    />
                  </div>
                ) : (
                  <div
                    className=" h-full w-full  "
                    style={{
                      backgroundColor: product?.rows.variantData.filter(
                        (e) => e?.title == "color"
                      )[0]?.value,
                    }}
                  />
                )}
              </div>
            )}
            {product?.rows?.variantData?.filter((e) => e?.title == "size")[0]
              ?.value && (
              <div className="flex items-center justify-center text-center text-nowrap overflow-hidden text-xl">
                Size:
                {
                  product?.rows?.variantData?.filter(
                    (e) => e?.title == "size"
                  )[0]?.value
                }
              </div>
            )}
          </div>
        </div> */}
        {/* Price Section */}
        <div className="flex sm:flex-row flex-col items-baseline gap-y-1 justify-between">
          <div className="flex flex-row sm:items-center items-start sm:mt-1 mt-1 text-center justify-between text-black w-full">
            <div>
              <div className=" flex sm:justify-center items-center gap-2 font-federo  flex-wrap">
                <p className=" sm:text-lg text-sm lg:text-center text-start whitespace-nowrap ">
                  INR{" "}
                  {formatCurrency(
                    product?.rows.perProductPrice as unknown as number
                  )}
                </p>
                <p className=" text-sm lg:text-center text-start  text-[#D1AB66] line-through whitespace-nowrap ">
                  INR {formatCurrency(product?.rows.mrp as unknown as number)}
                </p>
                <p className=" text-sm lg:text-center text-start  text-[#AF7346] whitespace-nowrap">
                  {getDiscountPercentage(
                    product?.rows.perProductPrice,
                    product?.rows.mrp as unknown as number
                  ) &&
                    `(${getDiscountPercentage(
                      product?.rows.perProductPrice,
                      product?.rows.mrp as unknown as number
                    )})`}
                </p>
              </div>
            </div>
            {formatCurrency(
              getDiscountPrice(
                product?.rows.perProductPrice,
                product?.rows.mrp as unknown as number
              ) as number
            ) != null && (
              <div className="text-green-700 text-sm">
                Saved{" "}
                {formatCurrency(
                  getDiscountPrice(
                    product?.rows.perProductPrice,
                    product?.rows.mrp as unknown as number
                  ) as number
                )}
              </div>
            )}
          </div>
        </div>
        {/* Quantity Selector */}
        <div className="flex items-center border rounded-full w-fit overflow-hidden border-[#F0C87E] bg-white text-black h-8">
          <Button
            variant="outline"
            onClick={() => (product?.quantity <= 1 ? null : handleDecrement())}
            // disabled={product.quantity<= 1}
            className={cn(
              " sm:h-full w-1 sm:w-1  rounded-none border-none bg-white hover:bg-primary group transition-all duration-300 animate-in animate-out shadow-none hover:bg-white hover:text-black ",
              {
                "hover:cursor-not-allowed hover:bg-white  border-secondary/10":
                  product?.quantity <= 1,
              }
            )}
          >
            <Minus
              className={cn("h-1 w-1 group-hover:shadow-lg", {
                "group-hover:text-primary": product?.quantity <= 1,
              })}
            />
          </Button>

          <Input
            type="number"
            min="1"
            value={product?.quantity}
            onChange={handleQuantityChange}
            className="w-4 max-w-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-none border-none shadow-none px-0"
          />
          <Button
            variant="outline"
            onClick={handleIncrement}
            className=" w-1 sm:w-1 rounded-none border-none bg-white hover:bg-primary group transition-all duration-300 animate-in animate-out shadow-none hover:bg-white hover:text-black"
          >
            <Plus className={cn("h-full w-1 group-hover:shadow-lg")} />
          </Button>
        </div>
      </div>
    </div>
  );
}
