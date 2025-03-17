"use client";

import { Product } from "@/interfaces/product/product";
import { cn } from "@/lib/utils";
import { addToCart } from "@/store/action/cart";

import AnimationContainer from "@/components/containers/animationContainer/AnimationContainer";
import { QuickViewModal } from "@/components/quickview/quick-view-modal";
import { CartItem } from "@/interfaces/cart/cart";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "@/services/wishlist/wishlist";
import { changeLoginModalType } from "@/store/action/login-modal";
import { useAuthSlice } from "@/store/main-store";
import { useCartSlice } from "@/store/slice/cart";
import useFunctionExecutor from "@/store/slice/execute-fn-slice";
import { checkProductInCart } from "@/utils/functions/checkProductInCart";
import { checkProductStock } from "@/utils/functions/checkStocks";
import { createImageUrl } from "@/utils/functions/createImageUrl";
import { getColorFamilyIndex } from "@/utils/functions/getVariantIndex";
import { getDiscountPercentage } from "@/utils/functions/productPriceUtil";
import { Heart, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
    }, 100); // Delay for smoother animation, adjust as needed
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

// Loop through variants and dynamically extract key-value pairs
ProductOne?.variants?.forEach((variant) => {
  const key = encodeURIComponent(variant.title.toLowerCase());
  const value = encodeURIComponent(variant.options[0]); // Get first option as value

  // Handling color and size separately
  if (key === "color") {
    color = variant.optionsImageColorSlug[0];
  } else if (key === "size") {
    size = variant.options[0];
  }

  // Push key-value pair to array
  queryParamsArray.push(`${key}=${value}`);
});

// Constructing the final query string
const queryString = queryParamsArray.join("&");

// Construct the final product path
const productPath = `/dp${queryParams}?${queryString}`;

console.log(productPath);

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

  return (
    <Link href={productPath} passHref>
      <AnimationContainer>
        <div
          onClick={(e) => {
            e.stopPropagation();

            // router.prefetch(productPath);
          }}
          className={cn(
            "group relative w-full cursor-pointer font-federo group"
          )}
        >
          <div className="relative lg:min-h-48 lg:h-auto sm:min-h-48 md:h-auto h-auto overflow-hidden">
            {/* Default Image */}
            {/* <Image
          src={createImageUrl(ProductOne.thumbnail)}
          alt={ProductOne.title}
          fill
          className={cn("object-contain transition-opacity duration-300")}
        /> */}
            {/* <ImageContainer
              src={createImageUrl(ProductOne.thumbnail)}
              alt="Description of the image"
              className="group-hover:scale-110 transition-all duration-300 "
            /> */}
            <div className="relative aspect-[1/1]">
              <Image
                placeholder="blur"
                blurDataURL="/images/logo.svg"
                src={createImageUrl(ProductOne.thumbnail)}
                alt="Description of the image"
                fill
                // Setting height to 0 so it adjusts according to the image aspect ratio
                className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-300 "
              />
            </div>
            {/* Action Buttons */}

            <div
              className={cn(
                "absolute bottom-6 left-1/2 -translate-x-1/2 items-center gap-4 transition-all duration-300 ease-in sm:flex hidden"
              )}
            >
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewOpen(true);
                }}
                className="group/card flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:w-[140px] overflow-hidden"
              >
                <Search className="h-5 w-5 flex-shrink-0" />
                <span className="ml-0 w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover/card:w-[80px] group-hover/card:ml-2 group-hover/card:opacity-100">
                  Quick View
                </span>
              </div>

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

              <div
                onClick={handleWishlist}
                className={cn(
                  "group/card flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:w-[110px] overflow-hidden",
                  { "hover:w-[140px] bg-primary": ProductOne.isWishlisted }
                )}
              >
                <Heart
                  className={cn("h-5 w-5 flex-shrink-0", {
                    "fill-primary": ProductOne?.isWishlisted,
                  })}
                />
                <span
                  className={cn(
                    "ml-0 w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover/card:w-[50px] group-hover/card:ml-2 group-hover/card:opacity-100",
                    { " group-hover/card:w-[80px]": ProductOne?.isWishlisted }
                  )}
                >
                  {ProductOne?.isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
              </div>

              <div
                onClick={async (e: any) => {
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
                }}
                className={cn(
                  "group/card flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:w-[140px] overflow-hidden",
                  {
                    "bg-primary ":
                      isLoading.id == ProductOne._id || alreadyInCart,
                  },
                  {
                    "bg-primary/20": checkStocks?.status != "IN_STOCK",
                  }
                )}
              >
                <ShoppingBag className={cn("h-5 w-5 flex-shrink-0")} />
                <span
                  className={cn(
                    "ml-0 w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover/card:w-[80px] group-hover/card:ml-2 group-hover/card:opacity-100",
                    { "text-xs ": alreadyInCart }
                  )}
                >
                  {alreadyInCart
                    ? "Already In Cart"
                    : isLoading.id == ProductOne._id
                    ? "Adding To Cart"
                    : "  Add to Cart"}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="sm:mt-6 mt-3 pl-1 text-center text-black">
            <div>
              <h3 className="sm:text-base text-sm sm:text-center text-start ">
                {ProductOne.title}
              </h3>
              <div className="mt-2 flex sm:flex-row flex-col sm:justify-center justify-start sm:items-center items-start gap-2 font-federo">
                <p className=" sm:text-base text-sm sm:text-center text-start ">
                  INR {ProductOne.rows[0].perProductPrice as unknown as number}
                </p>
              {ProductOne.rows[0].mrp > ProductOne.rows[0].perProductPrice && 

                (<>
                <p className=" sm:text-sm text-xs sm:text-center text-start  text-gray-300 line-through">
                  INR {ProductOne.rows[0].mrp as unknown as number}
                </p>
                <p className=" sm:text-sm text-xs sm:text-center text-start  text-[#F3238A]">
                  {getDiscountPercentage(
                    ProductOne?.rows[0]?.perProductPrice,
                    ProductOne.rows[0]?.mrp
                  ) &&
                    `( ${getDiscountPercentage(
                      ProductOne?.rows[0]?.perProductPrice,
                      ProductOne.rows[0]?.mrp
                    )} )`}
                </p></>)} 
              </div>
            </div>
          </div>
          {checkStocks?.status != "IN_STOCK" && (
            <div className="absolute top-2 left-2 text-white text-xs bg-red-600 px-3 py-1 rounded-full font-medium shadow-md">
              Out of Stock
            </div>
          )}
        </div>
      </AnimationContainer>
    </Link>
  );
}
