"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CartDetails, CustomerCartItem } from "../../interfaces/cart/cart";
import { CartOfferCard } from "../../components/cards/products/offer-card";
import { BadgePercent, BadgePercentIcon } from "lucide-react";

// Dynamically import the CartProductOne component
const CartProductOne = dynamic(
  () => import("../../cart/page").then((mod) => mod.CartProductOne),
  {
    ssr: false,
  }
);
export function CartProductList(cartDetails: CartDetails) {
  return (
    <div className="">
      {/* <div className="hidden sm:flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold font-federo">Cart Items</h2>
        <h3 className="text-lg font-semibold font-federo">
          Total {cartDetails.cart?.length || 0} Items
        </h3>
      </div> */}
      <div className="sm:h-[calc(100vh-272px)] sm:p-0 overflow-y-scroll sm:pr-4 pr-0">
        <div className="space-y-4">
          <Suspense fallback={<div>Loading cart items...</div>}>
            {cartDetails?.cart?.map((cartItem, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4  last:border-b-none border-b last:border-b-0 border-dashed border-b-[#D1AB66]"
              >
                {cartItem?.discountDetails && cartItem.isPair !== "PAIRED" && (
                  <CartOfferCard
                    offerStatus={cartItem?.offerStatus}
                    applicableOffers={cartItem?.discountDetails}
                  />
                )}

                {cartItem?.discountDetails && cartItem.isPair === "PAIRED" && (
                  <div className="flex items-center gap-2 py-1">
                    <BadgePercent className="h-4 w-4 text-black" />
                    <div className="flex items-center gap-2">
                      <span className="font-normal text-sm text-black capitalize">
                        {cartItem?.discountTitle?.toLowerCase()}
                      </span>
                      <span className="text-rose-400 font-light text-sm italic">
                        OFFER APPLIED
                      </span>
                    </div>
                  </div>
                )}

                <CartProductOne key={idx} product={cartItem} />
              </div>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
