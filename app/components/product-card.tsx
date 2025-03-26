"use client";

import { Product } from "../interfaces/product/product";
import { cn } from "../lib/utils";
import { addToCart } from "../store/action/cart";
import AnimationContainer from "../components/AnimationContainer";
import { QuickViewModal } from "../components/quick-view-modal";
import { CartItem } from "../interfaces/cart/cart";
import { useAddToWishlist, useRemoveFromWishlist } from "../services/wishlist/wishlist";
import { changeLoginModalType } from "../store/action/login-modal";
import { useAuthSlice } from "../store/main-store";
import { useCartSlice } from "../store/slice/cart";
import useFunctionExecutor from "../store/slice/execute-fn-slice";
import { checkProductInCart } from "../utils/functions/checkProductInCart";
import { checkProductStock } from "../utils/functions/checkStocks";
import { createImageUrl } from "../utils/functions/createImageUrl";
import { getColorFamilyIndex } from "../utils/functions/getVariantIndex";
import { getDiscountPercentage } from "../utils/functions/productPriceUtil";
import { Heart, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SwiperBanner from "./swiper";

export function ProductCard(ProductOne: Product) {
  const authToken = useAuthSlice((state) => state.authToken);
  const isLoading = useCartSlice((state) => state.isLoading);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { WishListAddMutation } = useAddToWishlist();
  const { WishListRemoveMutation } = useRemoveFromWishlist();
  const storeFunction = useFunctionExecutor((state) => state.storeFunction);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  let queryParams = `/${ProductOne.seoSlug}`;
  let queryParamsArray: string[] = [];
  let color, size;

  ProductOne?.variants?.forEach((variant) => {
    const key = encodeURIComponent(variant.title.toLowerCase());
    const value = encodeURIComponent(variant.options[0]);

    if (key === "color") {
      color = variant.optionsImageColorSlug[0];
    } else if (key === "size") {
      size = variant.options[0];
    }

    queryParamsArray.push(`${key}=${value}`);
  });

  const queryString = queryParamsArray.join("&");
  const productPath = `/merchandise/${queryParams}?${queryString}`;


  const checkStocks = checkProductStock(
    ProductOne,
    ProductOne?.rows[0]?.variantData,
    1
  );

  let colorWith, colorName, image;
  const matchedindex = getColorFamilyIndex(
    [ProductOne.rows[0]],
    ProductOne.variants
  );
  colorName = ProductOne?.variants?.find(
    (variant) => variant?.title?.toLowerCase() === "color"
  )?.colorFamilies[matchedindex]?.title;

  colorWith = ProductOne.variants.find(
    (variant) => variant.title.toLowerCase() === "color"
  )?.colorWith;

  image = ProductOne.variants.find(
    (variant) => variant.title.toLowerCase() === "color"
  )?.colorFamilies[matchedindex]?.colorImages;

  const sample: CartItem = {
    productDetail: {
      ...ProductOne,
      rows: ProductOne.rows?.map((row) => ({
        ...row,
        discount: row?.discount || row?.mrp - row?.perProductPrice,
        variantData: row?.variantData
          ? row?.variantData?.map((variant) =>
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
      inputTextFields: [],
      inputImageFields: [],
    },
  };

  const alreadyInCart = checkProductInCart(sample);

  const addToWishlistFn = () => {
    if (ProductOne.isWishlisted) {
      WishListRemoveMutation(ProductOne?._id, {
        onSuccess: (res) => {
          toast.success("Removed From Wishlist");
        },
        onError: (e) => {
          toast.error(e.message);
        },
      });
    } else {
      WishListAddMutation(ProductOne?._id, {
        onSuccess: (data) => {
          toast.success("Successfully Added to Wishlist");
        },
      });
    }
  };

  const handleWishlist = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (authToken) {
      addToWishlistFn();
    } else {
      storeFunction(addToWishlistFn);
      changeLoginModalType("MOBILE_INPUT");
    }
  };

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!alreadyInCart) {
      if (checkStocks?.status === "IN_STOCK") {
        addToCart(sample);
      } else {
        toast.dismiss();
        toast.error((checkStocks?.status).split("_").join(" "));
      }
    }
  };

  return (
    <Link href={productPath} className="w-[100%] md:w-[25%]">
      <div className="group md:w-[270px] rounded-[16px] relative h-[376px] shadow-[0px_0px_3px_rgb(0,0,0,0.2)] md:m-4 p-2">
        {/* Swiper Banner */}
        <div className="relative">
          <SwiperBanner
            imgClassName="h-[254px] w-[254px] object-cover"
            className="rounded-[12px] overflow-hidden"
            images={[createImageUrl(ProductOne.thumbnail)]} // Assuming you have an array of images
            hoverPlay={true}
          />
          {/* Action Buttons */}
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-opacity duration-300 ${
              isVisible ? "opacity-100 z-[50]" : "opacity-0"
            }`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={handleWishlist}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all ${
                ProductOne?.isWishlisted ? "bg-red-500" : ""
              }`}
            >
              <Heart className={`h-5 w-5 ${ProductOne?.isWishlisted ? "fill-red-500" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all ${
                alreadyInCart || isLoading.id === ProductOne._id ? "bg-green-500" : ""
              } ${checkStocks?.status !== "IN_STOCK" ? "bg-gray-500/50 cursor-not-allowed" : ""}`}
              disabled={checkStocks?.status !== "IN_STOCK"}
            >
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
          {/* Stock Status */}
          {checkStocks?.status !== "IN_STOCK" && (
            <div className="absolute top-2 left-2 text-white text-xs bg-red-600 px-3 py-1 rounded-full font-medium shadow-md">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-[8px] w-[100%]">
          <h4 className="text-[15px] font-semibold font-movatif py-[14px] text-[#1c252e] overflow-hidden whitespace-nowrap relative">
            <span className="inline-block">{ProductOne.title}</span>
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-[700] text-[#282c3f]">
              ₹{ProductOne.rows[0].perProductPrice as unknown as number}
            </span>
            {ProductOne.rows[0].mrp > ProductOne.rows[0].perProductPrice && (
              <>
                <span className="text-[12px] font-[400] text-[#817a78] line-through">
                  ₹{ProductOne.rows[0].mrp as unknown as number}
                </span>
                <span className="text-[12px] font-[400] text-[#ff905a]">
                  ({getDiscountPercentage(ProductOne.rows[0].perProductPrice, ProductOne.rows[0].mrp)}% OFF)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        {ProductOne?.variants ? (
          <QuickViewModal
            isOpen={isQuickViewOpen}
            onOpenChange={() => setQuickViewOpen(false)}
            params={{ slug: ProductOne.seoSlug }}
            searchParams={{ color: "", size: "" }}
            productOne={ProductOne}
            productPath={productPath}
          />
        ) : (
          color &&
          size && (
            <QuickViewModal
              isOpen={isQuickViewOpen}
              onOpenChange={() => setQuickViewOpen(false)}
              params={{ slug: ProductOne.seoSlug }}
              searchParams={{ color, size }}
              productOne={ProductOne}
              productPath={productPath}
            />
          )
        )}
      </div>
    </Link>
  );
}