import { Marquee } from "../../../components/ui/marquee";
import { ActiveDiscountInterface } from "../../../interfaces/discount/active-discount";
import { DiscountDetailsInterface } from "../../../interfaces/discount/discountInterface";
import { cn } from "../../../lib/utils";
import Link from "next/link";

export const CartOfferCard = ({
  className,
  applicableOffers,
  offerStatus,
}: {
  className?: string;
  offerStatus?: string;
  applicableOffers: DiscountDetailsInterface;
}) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between  text-black bg-white py-2 px-6 border rounded-full ",
        className
      )}
    >
      <div className="w-[80%]">
        {/* <Marquee className="[--duration:6s] "> */}
        {/* {applicableOffers.map((offer, index) => ( */}
        <h5 className="sm:text-lg text-sm font-federo">
          {applicableOffers?.discountMainTitle} Offer Applicable
        </h5>
        {/* ))} */}
        {/* </Marquee> */}

        <p className="sm:text-xs font-light text-[14px]">{offerStatus}</p>
      </div>
      <Link
        href={"/products?category=all&sort=NEW_ARRIVALS&collection=all"}
        className="text-[#F3238A] sm:text-sm text-xs font-semibold text-center px-3 whitespace-nowrap "
      >
        ADD ITEM
      </Link>
    </div>
  );
};
