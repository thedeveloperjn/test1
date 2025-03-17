import { CartDetails } from "../../interfaces/cart/cart";
import { formatCurrency } from "../../utils/functions/productPriceUtil";

export function PriceBreakdown(cartDetails: CartDetails) {
  return (
    <div className="px-3">
      <div className="space-y-5">
        <div className="flex justify-between">
          <span className="font-public-sans text-[#969696] text-base font-normal">
            Total MRP (Incl. of taxes)
          </span>
          <span className="text-base text-black">
            ₹{formatCurrency(cartDetails.summary?.subTotal)}
          </span>
        </div>
        {cartDetails.summary?.totalDiscount > 0 && (
          <div className="flex justify-between">
            <span className="font-public-sans text-[#969696] text-base font-normal">
              Discount On MRP
            </span>
            <span className="text-base text-black">
              ₹{formatCurrency(cartDetails.summary?.totalDiscount)}
            </span>
          </div>
        )}
        {/* <div className="flex justify-between">
          <span className="text-base text-black">OnformatCurrency() line Payment Discount (5%) :</span>
          <span className="text-base text-black">₹{formatCurrency() cartDetails?.summary?.offerDiscount}</span>
        </div> */}
        {cartDetails?.summary?.offerDiscount > 0 && (
          <div className="flex justify-between">
            <span className="font-public-sans text-[#969696] text-base font-normal">
              Offer Discount
            </span>
            <span className="text-base text-black">
              ₹{formatCurrency(cartDetails?.summary?.offerDiscount)}
            </span>
          </div>
        )}
        {(cartDetails?.summary?.shipping !== null ||
          cartDetails?.summary?.shipping !== "") && (
          <div className="flex justify-between">
            <span className="font-public-sans text-[#969696] text-base font-normal">
              Shipping
            </span>
            <span className="text-base text-black">
              {cartDetails?.summary?.shipping}
            </span>
          </div>
        )}
        <div className="border-t border-[#F4F4F4] pt-5">
          <div className="flex justify-between">
            <span className="font-federo text-black text-xl">Grand Total</span>
            <span className="font-federo text-base text-black">
              ₹{formatCurrency(cartDetails.summary?.grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
