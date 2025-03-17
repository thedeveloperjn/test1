"use client";

import { Button } from "./Button";
import { Separator } from "../components/ui/separator";
import { CartItem } from "../interfaces/cart/cart";
import { Product } from "../interfaces/product/product";
import { cn } from "../lib/utils";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
} from "../services/wishlist/wishlist";
import { addToCart } from "../store/action/cart";
import { changeLoginModalType } from "../store/action/login-modal";
import { useAuthSlice, useCartSlice } from "../store/main-store";
import { checkProductInCart } from "../utils/functions/checkProductInCart";
import { checkProductStock } from "../utils/functions/checkStocks";
import { getColorFamilyIndex } from "../utils/functions/getVariantIndex";
import {
  formatCurrency,
  getDiscountPercentage,
} from "../utils/functions/productPriceUtil";
import { ArrowRight, Heart } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { LinkButton } from "../ui/Link";
import QVColorSelectionRadio from "./qv-choose-color-radio";
import QVSizeSelectionRadio from "./qv-choose-size-radio";

export function ProductInfoQuickView({
  product,
  color,
  searchParams,
  productPath,
}: {
  product: Product;
  color: string;
  productPath: string;
  searchParams: { [key: string]: string };
}) {


  console.log("product quick veiw",product)
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedSize, setSelectedSize] = useState<string>(searchParams.size);
  const [selectedAge, setSelectedAge] = useState<string>(searchParams.age);
  const isLoading = useCartSlice((state) => state.isLoading.state);
  const { WishListAddMutation } = useAddToWishlist();
  const { WishListRemoveMutation } = useRemoveFromWishlist();
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");
  const authToken = useAuthSlice((state) => state.authToken);
  const checkStocks = checkProductStock(
    product,
    product?.rows[0]?.variantData,
    1
  );
  let colorWith, colorName, image;
  const matchedindex = getColorFamilyIndex([product.rows[0]], product.variants);
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
    inputTextFields: [],
    inputImageFields: [],
  },
  };
  const alreadyInCart = checkProductInCart(sample);

  const handleColorChange = (value: string) => {
    if (value) {
      setSelectedColor(value);
      const params = new URLSearchParams(searchParams);
      selectedSize ? params.set("size", selectedSize) : params.delete("size");
      value ? params.set("color", value || "") : params.delete("color");
      selectedAge ? params.set("age", selectedAge) : params.delete("age");
    }
  };
  const handleSizeChange = (value: string) => {
    if (value) {
      setSelectedSize(value);
      const params = new URLSearchParams(searchParams);
      value ? params.set("size", value) : params.delete("size");
      selectedAge ? params.set("age", selectedAge) : params.delete("age");
      selectedColor
        ? params.set("color", selectedColor || "")
        : params.delete("color");
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
        inputTextFields: [],
        inputImageFields: [],
      },
    };
    addToCart(sample);
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
  return (
    <div className="flex flex-col gap-4  p-4">
      <h1 className="text-2xl text-black font-federo">{product.title}</h1>
      <p className="text-base text-[#AF7346]">SKU: {product?.rows[0]?.sku}</p>

      <div className="flex flex-wrap items-baseline gap-2">
        <span className="sm:text-2xl text-sm text-black font-federo">
          INR {formatCurrency(product?.rows[0]?.perProductPrice)}
        </span>
        <span className="sm:text-base text-sm text-gray-500 line-through font-light">
          INR {formatCurrency(product.rows[0]?.mrp)}
        </span>
        <span className="text-base text-[#AF7346] font-federo">
          {getDiscountPercentage(
            product?.rows[0]?.perProductPrice,
            product.rows[0]?.mrp
          ) &&
            `( ${getDiscountPercentage(
              product?.rows[0]?.perProductPrice,
              product.rows[0]?.mrp
            )} )`}
        </span>
        <span className="sm:text-sm text-xs text-[#AF7346] font-federo">
          inclusive of all taxes
        </span>
      </div>

      <div className="flex sm:flex-row flex-col sm:items-center gap-2">
        <Button
          variant="secondary"
          className="bg-secondary text-white hover:bg-secondary/90 rounded-full py-1 h-auto px-6 "
        >
          Ready Stock
        </Button>

        {/* {product.applicableDiscounts &&
          product.applicableDiscounts.map((offer, index) => ( */}
        <Button
          // key={index}
          variant="outline"
          className="bg-transparent text-[#F3238A] hover:bg-secondary/90 rounded-full py-1 h-auto px-6 border-secondary hover:text-white capitalize animate-customPing hover:animate-none"
        >
          {/* {offer?.discountTitle} */}Buy 2 get 20% Free
        </Button>
        {/* ))} */}
      </div>
      <Separator />
      <div hidden>
        {product?.variants.map(
          (e: {
            title: string;
            images?: Array<any>;
            optionsImageColorSlug?: Array<string>;
          }) =>
            e.title.toLowerCase() === "color" ? (
              <div className="my-3" key={e.title}>
                {/* <h3 className="font-medium mb-3 text-black text-lg">
                  Choose Color
                </h3> */}
                <QVColorSelectionRadio
                  productDetail={product}
                  selectedAge={selectedAge}
                  options={e?.optionsImageColorSlug}
                  images={e?.images || []}
                  selectedOption={selectedColor}
                  onChange={handleColorChange}
                />
              </div>
            ) : (
              ""
            )
        )}
        {product?.variants.map(
          (e) =>
            e.title.toLowerCase() === "size" && (
              <div key={e.title}>
                {/* <h3 className="font-medium mb-3 text-black text-lg capitalize">
                  choose size
                </h3> */}
                <div>
                  <QVSizeSelectionRadio
                    className="my-4"
                    options={e.options}
                    selectedOption={selectedSize}
                    onChange={handleSizeChange}
                  />
                </div>
              </div>
            )
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <Heart
          onClick={handleWishlist}
          strokeWidth={1.5}
          className={cn(
            " w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14   border-2 border-[#AF7346] rounded-full  p-1 sm:p-2 md:p-2 lg:p-2 hover:cursor-pointer hover:bg-secondary/10",
            {
              "fill-red-600 text-red-600 stroke-red-600 ":
                product?.isWishlisted,
            }
          )}
        />
        {/* </Button> */}
        <Button
          disabled={alreadyInCart}
          onClick={handleAddTocArt}
          variant={"outline"}
          className="w-full flex-1 bg-white hover:bg-secondary/10 rounded-full border-[#AF7346] border-2  h-10  sm:h-12  md:h-14 lg:h-14 uppercase text-base text-[#AF7346]"
        >
          {alreadyInCart
            ? "Already In Cart"
            : isLoading
            ? "Adding To Cart"
            : "  Add to Cart"}
        </Button>
      </div>
      {/* <Button
        onClick={async (e) => {
          await handleAddTocArt(e);
          router.push("/checkout");
        }}
        variant="secondary"
        className="flex-1 bg-[#AF7346] hover:bg-secondary text-white rounded-full border-[#AF7346]  h-10  sm:h-12  md:h-14 lg:h-14 uppercase text-base"
      >
        BUY NOW
      </Button> */}
      <LinkButton
        href={productPath}
        className="w-full flex-1 bg-white hover:bg-secondary/10 rounded-full border-[#AF7346] border  h-10  sm:h-12  md:h-14 lg:h-14 uppercase text-base text-[#AF7346] font-normal"
      >
        More Info{" "}
        <ArrowRight className="w-5 h-5 animate-bounce-r" strokeWidth={1.5} />
      </LinkButton>
    </div>
  );
}
