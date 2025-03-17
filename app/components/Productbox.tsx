"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SwiperBanner from "./swiper";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import { useCartSlice } from "../store/slice/cart";
import { addToCart } from "../store/action/cart";
import { changeLoginModalType } from "../store/action/login-modal";
import { useAuthSlice } from "../store/main-store";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../services/wishlist/wishlist";
import useFunctionExecutor from "../store/slice/execute-fn-slice";
import { checkProductInCart } from "../utils/functions/checkProductInCart";
import { checkProductStock } from "../utils/functions/checkStocks";
import { getDiscountPercentage } from "../utils/functions/productPriceUtil";

type Product = {
  _id: string;
  seoSlug: string;
  title?: string;
  subtitle?: string;
  images?: { values: { url: string }[] }[];
  rows?: { perProductPrice?: number; mrp?: number; variantData?: any[] }[];
  thumbnail?: string;
  variants?: { title: string; options: string[]; colorFamilies?: any[] }[];
  isWishlisted?: boolean;
};

type ProductBoxProps = {
  product: Product;
};

const ProductBox: React.FC<ProductBoxProps> = ({ product }) => {
  const [cachedProduct, setCachedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isLoading, cartDetails } = useCartSlice();
  const authToken = useAuthSlice((state) => state.authToken);
  const { WishListAddMutation } = useAddToWishlist();
  const { WishListRemoveMutation } = useRemoveFromWishlist();
  const storeFunction = useFunctionExecutor((state) => state.storeFunction);

  // Cache product data
  useEffect(() => {
    const cachedData = sessionStorage.getItem(`product_${product.seoSlug}`);
    if (cachedData) {
      setCachedProduct(JSON.parse(cachedData));
    } else {
      sessionStorage.setItem(`product_${product.seoSlug}`, JSON.stringify(product));
      setCachedProduct(product);
    }
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [product]);

  const images = cachedProduct?.images?.flatMap((img) => img.values.map((v) => v.url)) || [];

  // Simplified variant handling (assuming first row for now)
  const checkStocks = checkProductStock(cachedProduct, cachedProduct?.rows?.[0]?.variantData, 1);
  const sampleCartItem = {
    productDetail: {
      ...cachedProduct,
      rows: cachedProduct?.rows?.map((row) => ({
        ...row,
        discount: row?.mrp && row?.perProductPrice ? row.mrp - row.perProductPrice : 0,
        variantData: row?.variantData || [],
      })) || [],
    },
    quantity: 1,
    inputFields: { inputTextFields: [], inputImageFields: [] },
  };
  const alreadyInCart = checkProductInCart(sampleCartItem);

  const addToWishlistFn = () => {
    if (cachedProduct?.isWishlisted) {
      WishListRemoveMutation(cachedProduct._id, {
        onSuccess: () => toast.success("Removed From Wishlist"),
        onError: (e) => toast.error(e.message),
      });
    } else {
      WishListAddMutation(cachedProduct?._id, {
        onSuccess: () => toast.success("Successfully Added to Wishlist"),
        onError: (e) => toast.error(e.message),
      });
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (authToken) {
      addToWishlistFn();
    } else {
      storeFunction(addToWishlistFn);
      changeLoginModalType("MOBILE_INPUT");
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!alreadyInCart) {
      if (checkStocks?.status === "IN_STOCK") {
        addToCart(sampleCartItem);
        toast.success("Added to Cart");
      } else {
        toast.error(checkStocks?.status.split("_").join(" "));
      }
    }
  };

  return (
    <Link href={`/merchandise/${product.seoSlug}`} className="w-[100%] md:w-[25%]">
      <div className="group md:w-[270px] rounded-[16px] relative h-[376px] shadow-[0px_0px_3px_rgb(0,0,0,0.2)] md:m-4 p-2">
        {/* Swiper Banner */}
        <div className="relative">
          <SwiperBanner
            imgClassName="h-[254px] w-[254px] object-cover"
            className="rounded-[12px] overflow-hidden"
            images={images}
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
                cachedProduct?.isWishlisted ? "bg-red-500" : ""
              }`}
            >
              <Heart className={`h-5 w-5 ${cachedProduct?.isWishlisted ? "fill-red-500" : ""}`} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-all ${
                alreadyInCart || isLoading.id === cachedProduct?._id ? "bg-green-500" : ""
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
            <span className="inline-block">{cachedProduct?.title ?? "No Title"}</span>
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-[700] text-[#282c3f]">
              ₹{cachedProduct?.rows?.[0]?.perProductPrice ?? ""}
            </span>
            {cachedProduct?.rows?.[0]?.mrp && cachedProduct?.rows?.[0]?.mrp > cachedProduct?.rows?.[0]?.perProductPrice && (
              <>
                <span className="text-[12px] font-[400] text-[#817a78] line-through">
                  ₹{cachedProduct?.rows?.[0]?.mrp ?? ""}
                </span>
                <span className="text-[12px] font-[400] text-[#ff905a]">
                  ({getDiscountPercentage(cachedProduct?.rows?.[0]?.perProductPrice, cachedProduct?.rows?.[0]?.mrp)}% OFF)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Quick View Modal (Placeholder) */}
        {isQuickViewOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-lg w-full">
              <h2>{cachedProduct?.title}</h2>
              <p>Quick view placeholder - implement your modal here</p>
              <button
                onClick={() => setQuickViewOpen(false)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

// Animation Container (simplified for now)
const AnimationContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="transition-all duration-300 ease-in-out">{children}</div>
  );
};

export default ProductBox;