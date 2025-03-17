"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCouponCode } from "@/services/discount/coupon-code";
import {
  CouponCodeData,
  CouponCodeErrorResponse,
  CouponCodePayload,
} from "@/interfaces/discount/coupon-code";
import { CartDetails } from "@/interfaces/cart/cart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  updateCartSummary,
  updateCartSummaryByCode,
} from "@/store/action/cart";
import useCouponCodeSlice from "@/store/slice/couponCode";
interface CouponCompProps {
  cartDetails: CartDetails;
  couponData: {
    data: {
      onlinePaymentDiscount: boolean;
      discount: number;
    };
  } | null;
  paymentModePage: "online-payment" | "cod";
}

const formSchema = z.object({
  couponCode: z
    .string()
    .min(4, { message: "Coupon code must be at least 5 characters long" }),
});

export function CouponCodeForm(props: CouponCompProps) {
  const {
    cartDetails,

    couponData: couponOnlinePayDiscount,
    paymentModePage,
  } = props;

  const [discountDetails, setDiscountDetails] = useState<CouponCodeData>();
  const [couponCodeAmount, setCouponCodeAmount] = useState<number>(0);
  const couponCode = useCouponCodeSlice((state) => state.code);
  const isCouponApplied = useCouponCodeSlice((state) => state.isApplied);
  const paymentMode = useCouponCodeSlice((state) => state.paymentMode);
  const applyCoupon = useCouponCodeSlice((state) => state.applyCoupon);

  const setPaymentMode = useCouponCodeSlice((state) => state.setPaymentMode);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      couponCode: "",
    },
  });

  // Define the form values type based on the Zod schema
  type CouponCodeFormValues = z.infer<typeof formSchema>;

  const {
    data: couponData,
    ApplyCCodeMutation,
    error: CCodeError,
  } = useGetCouponCode();
  // useEffect(() => {
  //   removeCoupon();
  // }, []);
  const onApplyCoupon: SubmitHandler<CouponCodeFormValues> = (data) => {
    const cCodePayload: CouponCodePayload = {
      code: data?.couponCode,
      amount: cartDetails.summary.grandTotal,
      quantity: 3,
    };
    if (isCouponApplied === true) {
      toast.success("Coupon Already Applied");
    } else
      ApplyCCodeMutation(cCodePayload, {
        onSuccess: (response) => {
          const { amount, type, status }: CouponCodeData = response;

          let discount, discountedAmount;
          discount =
            type?.toLowerCase() !== "flat" &&
            status?.toLowerCase() === "active" &&
            amount
              ? paymentModePage === "online-payment"
                ? amount + (couponOnlinePayDiscount?.data?.discount || 0)
                : amount
              : cartDetails.summary.grandTotal * ((amount || 0) / 100);

          applyCoupon(data.couponCode, discount || 0);
          setPaymentMode(paymentModePage);
          updateCartSummary({
            percentage: discount || 0,
            paymentMode,
          });
          discountedAmount = discount
            ? cartDetails.summary.grandTotal - discount
            : cartDetails.summary.grandTotal;
          discount && setCouponCodeAmount(discount);
          // setGrandTotal(discountedAmount);
          setDiscountDetails(response);
          // refetchCart();
          // updateCartSummaryByCode({
          //   disountPercentage: couponOnlinePayDiscount?.data?.discount,
          //   discountedGrandTotal: discountedAmount,
          //   discountAmount: discount,
          // });
          toast.success("Coupon Code Applied");
        },
        onError: (
          error: Error,
          variables: CouponCodePayload,
          context: unknown
        ) => {
          const err = error as AxiosError; // Type assertion to AxiosError
          const errData = err?.response?.data as CouponCodeErrorResponse;
          toast?.error(errData?.message);
          // refetchCart();
        },
      });

    // Handle coupon code submission logic here
  };

  return (
    <div className="w-full mx-auto">
      <h2 className="text-lg mb-4 px-2 font-federo text-black">Coupons</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onApplyCoupon)}
          className="flex gap-4 items-start"
        >
          <FormField
            control={form.control}
            name="couponCode"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormControl>
                  <Input
                    disabled={isCouponApplied}
                    placeholder="Enter Coupon Code"
                    {...field}
                    className="px-6 shadow-none border-[#E4E4E4] text-[#969696] placeholder:text-[#969696] placeholder:capitalize sm:h-12 h-12 rounded-full bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isCouponApplied}
            type="submit"
            className="w-1/4 shadow-none rounded-full bg-[#D1AB66]  border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95  h-12 sm:h-12 font-normal text-xs sm:text-sm text-white uppercase font-federo"
          >
            {isCouponApplied ? "Applied" : "Apply Now"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
