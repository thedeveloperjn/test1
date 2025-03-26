"use client";

import { Button } from "../../../components/Button";
import { CartItem } from "../../../interfaces/cart/cart";
import { Product } from "../../../interfaces/product/product";
import { cn } from "../../../lib/utils";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../../../services/wishlist/wishlist";
import { addToCart } from "../../../store/action/cart";
import { changeLoginModalType } from "../../../store/action/login-modal";
import { useAuthSlice, useCartSlice } from "../../../store/main-store";
import { checkProductInCart } from "../../../utils/functions/checkProductInCart";
import { getColorFamilyIndex } from "../../../utils/functions/getVariantIndex";
import { Heart, Share } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface MobileActionsProps {
  product: Product;
  className?: string;
}

export function MobileActions({ product, className }: MobileActionsProps) {
  const [inputValues, setInputValues] = useState({});
  const { WishListAddMutation } = useAddToWishlist();
  const { WishListRemoveMutation } = useRemoveFromWishlist();
  const authToken = useAuthSlice((state) => state.authToken);
  const isLoading = useCartSlice((state) => state.isLoading.state);

  const inputFieldsData = Object.entries(inputValues).map(([key, value]) => ({
    key,
    value: String(value),
  }));
  let colorWith, colorName, image;
  const matchedindex = getColorFamilyIndex(
    [product?.rows[0]],
    product.variants
  );
  colorName = product.variants.find(
    (variant) => variant.title.toLowerCase() === "color"
  )?.colorFamilies[matchedindex]?.title;

  colorWith = product.variants.find(
    (variant) => variant.title.toLowerCase() === "color"
  )?.colorWith;

  image = product.variants.find(
    (variant) => variant.title.toLowerCase() === "color"
  )?.colorFamilies[matchedindex]?.colorImages;

  const sample: CartItem = {
    productDetail: {
      ...product,
      rows: product.rows.map((row) => ({
        ...row,
        variantData: row?.variantData
          ? row?.variantData.map((variant) =>
              variant.title == "color"
                ? {
                    ...variant,
                    colorName: colorName,
                    colorWith: colorWith,
                    image: image,
                  }
                : variant
            )
          : [],
      }))[0],
    },
    quantity: 1,
    inputFields: {
      inputTextFields: inputFieldsData.map(({ key, value }) => ({ title: key, value: value })),
      inputImageFields: [], // Add appropriate data here if available
    }
  };

  const alreadyInCart = checkProductInCart(sample);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  const handleWishlist = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (authToken) {
      if (product.isWishlisted) {
        WishListRemoveMutation(product?._id, {
          onSuccess: (res) => {
            toast.success("Removed From Wishlist");
          },
          onError: (e) => {
            toast.error(e.message);
          },
        });
      } else {
        WishListAddMutation(product?._id, {
          onSuccess: (data) => {
            // other.refetch();
            toast.success("Successfully Added to Wishlist");
            // customEventTrack(
            //   TRACKING_ACTIONS.ADD_TO_WISHLIST,
            //   EVENT_METHODS.CLICK,
            //   {
            //     id: product._id,
            //     name: product.title,
            //     path: pathName,
            //     other: product,
            //   }
            // );
          },
        });
      }
    } else {
      toast.warning("Please Login To Wishlist");
      changeLoginModalType("MOBILE_INPUT");
    }
  };

  const handleAddTocArt = async (e: any) => {
    e.stopPropagation();

    let colorWith, colorName, image;
    const matchedindex = getColorFamilyIndex(product.rows, product.variants);
    colorName = product.variants.find(
      (variant) => variant.title.toLowerCase() === "color"
    )?.colorFamilies[matchedindex]?.title;

    colorWith = product.variants.find(
      (variant) => variant.title.toLowerCase() === "color"
    )?.colorWith;

    image = product.variants.find(
      (variant) => variant.title.toLowerCase() === "color"
    )?.colorFamilies[matchedindex]?.colorImages;

    const sample: CartItem = {
      productDetail: {
        ...product,
        rows: product.rows.map((row) => ({
          ...row,
          discount: row?.discount || row?.mrp - row?.perProductPrice,
          variantData: row?.variantData
            ? row?.variantData.map((variant) =>
                variant.title == "color"
                  ? {
                      ...variant,
                      colorName: colorName,
                      colorWith: colorWith,
                      image: image,
                    }
                  : variant
              )
            : [],
        }))[0],
      },
      quantity: 1,
      inputFields: {
        inputTextFields: inputFieldsData.map(({ key, value }) => ({ title: key, value: value })),
        inputImageFields: [], // Add appropriate data here if available
      },
    };
    addToCart(sample);
  };
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center gap-4 z-10",
        className
      )}
    >
      {/* <Button
          variant="outline"
          size="icon"
          className="border-sectext-[#F3238A] text-[#F3238A] hover:bg-sectext-[#F3238A] hover:text-white rounded-full p-0 w-20 h-20"
        > */}
      <div
        className="flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 
                 hover:cursor-pointer hover:bg-secondary/10   border-2 border-[#AF7346] rounded-full 
                p-2 sm:p-2.5 md:p-3 lg:p-4 "
      >
        <Share color="#AF7346" />
      </div>
      <div
        onClick={handleWishlist}
        className={cn(
          "flex justify-center items-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 hover:cursor-pointer hover:bg-secondary/10   border-2 border-[#AF7346] rounded-full p-2 sm:p-2.5 md:p-3 lg:p-4 ",
          { "fill-red-600 text-red-600": product?.isWishlisted }
        )}
      >
        <Heart color="#AF7346" />
      </div>

      <Button
        disabled={alreadyInCart}
        onClick={handleAddTocArt}
        variant="secondary"
        className="flex-1 bg-[#AF7346] hover:bg-secondary text-white rounded-full border-[#AF7346]  h-10  sm:h-12  md:h-14 lg:h-16"
      >
        {alreadyInCart
          ? "Already In Cart"
          : isLoading
          ? "Adding To Cart"
          : "  Add to Cart"}
      </Button>
    </div>
  );
}
