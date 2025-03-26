"use client";

import ColorSelectionRadio from "../../../components/cards/products/choose-color-radio";
import SizeSelectionRadio from "../../../components/cards/products/choose-size-radio";
import { Button } from "../../../components/Button";
import { Separator } from "../../../components/ui/separator";
import { CartItem } from "../../../interfaces/cart/cart";
import { Product } from "../../../interfaces/product/product";
import { cn } from "../../../lib/utils";
import { useAddToWishlist, useRemoveFromWishlist } from "../../../services/wishlist/wishlist";
import { addToCart } from "../../../store/action/cart";
import { changeLoginModalType } from "../../../store/action/login-modal";
import { useAuthSlice, useCartSlice } from "../../../store/main-store";
import useFunctionExecutor from "../../../store/slice/execute-fn-slice";
import { checkProductInCart } from "../../../utils/functions/checkProductInCart";
import { checkProductStock } from "../../../utils/functions/checkStocks";
import { getColorFamilyIndex } from "../../../utils/functions/getVariantIndex";
import { formatCurrency, getDiscountPercentage } from "../../../utils/functions/productPriceUtil";
import { Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductDetails } from "./product-details";
export function ProductInfo({
  product,
  otherVarients,
  searchParams,
}: {
  product: Product;
  otherVarients: string;
  searchParams: { [key: string]: string };
}) {
  const router = useRouter();
  const [selectedVariantOptions, setSelectedVariantOptions] = useState<{ [key: string]: string }>({});
  const [selectedColor, setSelectedColor] = useState(otherVarients);
  const [selectedSize, setSelectedSize] = useState<string>(searchParams.size);
  const [inputValues, setInputValues] = useState<{ [key: string]: string | number }>({});
  const [filePreviews, setFilePreviews] = useState<{ [key: string]: string[] }>({});

  const isLoading = useCartSlice((state) => state.isLoading.state);
  const { WishListAddMutation } = useAddToWishlist();
  const { WishListRemoveMutation } = useRemoveFromWishlist();
  const pathname = usePathname();
  const authToken = useAuthSlice((state) => state.authToken);
  const storeFunction = useFunctionExecutor((state) => state.storeFunction);
  const checkStocks = checkProductStock(product, product?.rows[0]?.variantData, 1);

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const params = new URLSearchParams(queryString);
      const options: { [key: string]: string } = {};
      params.forEach((value, key) => (options[key] = value));
      setSelectedVariantOptions(options);
    }
  }, []);

  const matchedIndex = getColorFamilyIndex([product.rows[0]], product.variants);
  const colorName = product.variants.find((v) => v.title.toLowerCase() === "color")?.colorFamilies[matchedIndex]?.title;
  const colorWith = product.variants.find((v) => v.title.toLowerCase() === "color")?.colorWith;
  const image = product.variants.find((v) => v.title.toLowerCase() === "color")?.colorFamilies[matchedIndex]?.colorImages;

  const sample: CartItem = {
    productDetail: {
      ...product,
      rows: product.rows.map((row) => ({
        ...row,
        discount: row?.discount || row?.mrp - row?.perProductPrice,
        variantData: row?.variantData
          ? row?.variantData.map((variant) =>
              variant.title === "color"
                ? { ...variant, colorName, colorWith, image }
                : variant
            )
          : [],
      }))[0],
    },
    quantity: 1,
    inputFields: { inputTextFields: [], inputImageFields: [] },
  };
  const alreadyInCart = checkProductInCart(sample);

  const updateURL = (updatedVariants: Record<string, string>) => {
    const queryParams = Object.entries(updatedVariants)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
    const newURL = `/merchandise/${product.seoSlug}${queryParams ? `?${queryParams}` : ""}`;
    router.replace(newURL);
  };

  const handleVariantChange = (title: string, option: string) => {
    const variantKey = title.toLowerCase();
    const updatedVariants = { ...selectedVariantOptions, [variantKey]: option };
    setSelectedVariantOptions(updatedVariants);
    setTimeout(() => updateURL(updatedVariants), 0);
  };

  const handleColorChange = (value: string) => {
    const updatedVariants = { ...selectedVariantOptions, color: value };
    setSelectedColor(value);
    setSelectedVariantOptions(updatedVariants);
    setTimeout(() => updateURL(updatedVariants), 0);
  };

  const handleSizeChange = (value: string) => {
    const updatedVariants = { ...selectedVariantOptions, size: value };
    setSelectedSize(value);
    setSelectedVariantOptions(updatedVariants);
    setTimeout(() => updateURL(updatedVariants), 0);
  };

  const handleAddToCart = async (e: any) => {
    e.stopPropagation();
    const inputFieldsData = {
      inputTextFields: Object.entries(inputValues)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => ({ title: key, value: String(value) })),
      inputImageFields: Object.entries(filePreviews)
        .filter(([_, value]) => typeof value === "string")
        .map(([key, value]) => ({ title: key, value: String(value) })),
    };

    const cartItem: CartItem = {
      productDetail: {
        ...product,
        rows: product.rows.map((row) => ({
          ...row,
          discount: row?.discount || row?.mrp - row?.perProductPrice,
          variantData: row?.variantData
            ? row?.variantData.map((variant) => ({
                ...variant,
                value: selectedVariantOptions[variant.title.toLowerCase()] || "",
              }))
            : [],
        }))[0],
      },
      quantity: 1,
      inputFields: inputFieldsData,
    };

    try {
      if (inputFieldsData.inputTextFields.length && inputFieldsData.inputImageFields.length) {
        await addToCart(cartItem);
      } else {
        toast.warning("Text and Image required");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToWishlistFn = () => {
    if (product.isWishlisted) {
      WishListRemoveMutation(product?._id, {
        onSuccess: () => toast.success("Removed From Wishlist"),
        onError: (e) => toast.error(e.message),
      });
    } else {
      WishListAddMutation(product?._id, {
        onSuccess: () => toast.success("Successfully Added to Wishlist"),
      });
    }
  };

  const handleWishlist = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (authToken) addToWishlistFn();
    else {
      storeFunction(addToWishlistFn);
      changeLoginModalType("MOBILE_INPUT");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl md:text-3xl font-bold text-gray-900 -tracking-[0.02rem] font-movatif pb-2">
        {product.title}
      </h3>
      <p className="text-sm md:text-[16px] font-normal text-gray-600 pb-7 leading-relaxed">
        {product.subtitle}
      </p>
      <div className="border-b border-gray-300"></div>

      <div className="pt-6">
        <span className="lg:text-2xl font-bold text-gray-900">
          INR {formatCurrency(product?.rows[0]?.perProductPrice)}
        </span>
        {product?.rows[0]?.mrp > product?.rows[0]?.perProductPrice && (
          <>
            <span className="lg:text-lg text-sm font-normal ml-2 text-gray-500 line-through">
              INR {formatCurrency(product.rows[0]?.mrp)}
            </span>
            <span className="text-sm lg:text-lg font-normal text-orange-500 ml-2">
              ({getDiscountPercentage(product?.rows[0]?.perProductPrice, product.rows[0]?.mrp)}% OFF)
            </span>
          </>
        )}
        <p className="text-green-600 font-semibold pb-5 pt-1">Inclusive of all taxes</p>

        {/* Variant Selection */}
        {product?.variants.map((variant) => (
          <div key={variant.title} className="my-3">
            <h3 className="font-medium mb-3 text-black text-lg capitalize">Choose {variant.title}</h3>
            {variant.title.toLowerCase() === "color" ? (
              <ColorSelectionRadio
                productDetail={product}
                options={variant.optionsImageColorSlug}
                images={variant.images || []}
                selectedOption={selectedVariantOptions["color"]}
                onChange={handleColorChange}
              />
            ) : variant.title.toLowerCase() === "size" ? (
              <SizeSelectionRadio
                className="my-4"
                options={variant.options}
                selectedOption={selectedVariantOptions["size"]}
                onChange={handleSizeChange}
              />
            ) : (
              <div className="flex gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 border rounded transition-all duration-200 ${
                      selectedVariantOptions[variant.title.toLowerCase()] === option
                        ? "border-black bg-black text-white"
                        : "border-black bg-white hover:bg-black hover:text-white"
                    }`}
                    onClick={() => handleVariantChange(variant.title, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Buttons */}
        <div className="pt-6 flex gap-2">
          <button
            disabled={alreadyInCart}
            onClick={handleAddToCart}
            className="w-[50%] md:w-[53%] bg-black py-2 md:py-4 text-white font-semibold rounded-md disabled:bg-gray-500"
          >
            {alreadyInCart ? "Already In Cart" : isLoading ? "Adding To Cart" : "Add to Cart"}
          </button>
          <button
            onClick={handleWishlist}
            className="w-[45%] py-2 md:py-4 text-[#282c3f] border border-gray-400 font-semibold rounded-md hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <Heart
              strokeWidth={1.5}
              className={cn("w-5 h-5 text-[#F3238A]", {
                "fill-red-600 text-red-600 stroke-red-600": product?.isWishlisted,
              })}
            />
            Wishlist
          </button>
        </div>

        <div className="border-b border-gray-300 pt-4 pb-5"></div>
        <ProductDetails product = {product } inputValues={inputValues} setInputValues={setInputValues} filePreviews={filePreviews} setFilePreviews={setFilePreviews}/>
      </div>
    </div>
  );
}