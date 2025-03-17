"use client";
import { Button } from "@/components/ui/button";
import { createSession } from "@/lib/session";
import { useGetSendOtp, useGetVerifyOtp } from "@/services/auth/sendOTP";
import {
  changeAuthMobileNumber,
  changeAuthStatus,
  changeAuthToken,
  changeSignupToken,
} from "@/store/action/auth";
import { syncCart, updateCartSummary } from "@/store/action/cart";
import { changeLoginModalType } from "@/store/action/login-modal";
import { changeUserData } from "@/store/action/user";
import { useGetAuthMobile } from "@/store/selector/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { InputOTP, InputOTPSlot } from "../ui/input-otp";
import { useGetOnlineDiscount } from "@/services/discount/online-discount";
const formSchema = z.object({
  otp: z.string().regex(/^\d{4}$/, "Otp must be exactly 4 digits"),
});
export default function OTPInputCheckoutPage() {
  const mobileNumber = useGetAuthMobile();
  const { OtpMutation, isOtpoading, isOtpError, errorData } = useGetSendOtp();

  const { OtpVerifyMutation, isOtpVerifyoading, errorVerify } =
    useGetVerifyOtp();
  const {
    couponOnlineData,
    iscouponOnlineLoading,
    iscouponOnlineError,
    couponRefetch,
  } = useGetOnlineDiscount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    OtpVerifyMutation(
      {
        mobileNumber: mobileNumber as unknown as number,
        otp: values.otp as unknown as number,
      },
      {
        onSuccess: async (res) => {
          if (res.isRegistered === false) {
            toast.success(res.message);
            changeLoginModalType("SIGNUP_MODAL");
            changeSignupToken(res.signupToken);
          } else {
            createSession(res.data.accessToken || "");
            changeUserData(res.data);
            changeAuthStatus(true);
            changeAuthToken(res.data.accessToken);
            toast.success("Login Successfull");
            changeLoginModalType(null);
            syncCart();
            const discountDetail = await couponRefetch();
            if (discountDetail?.data?.data?.data?.onlinePaymentDiscount) {
              updateCartSummary({
                percentage: discountDetail.data?.data?.data?.discount || 0,
                paymentMode: "online-payment",
              });
            }
          }
        },
        onError: (e) => {
          toast.error(e?.response?.data.message);
        },
      }
    );
  }

  function handleResendOTP() {
    OtpMutation(
      { mobileNumber: mobileNumber as unknown as string },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          changeLoginModalType("LOGIN_OTP_INPUT_CHECKOUT");
          changeAuthMobileNumber(mobileNumber as unknown as string);
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
  }

  const handleEditNumber = () => {
    changeLoginModalType("MOBILE_INPUT_CHECKOUT");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify- gap-4 mb-4">
          <h2 className="text-lg px-2 font-federo text-black">Enter OTP</h2>

          <div
            className="flex items-center justify-start"
            onClick={handleEditNumber}
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm">+91 {mobileNumber}</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between w-full space-x-2 ">
          <div className="md:w-1/2 w-full">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="otp" hidden>
                    otp
                  </FormLabel>
                  <FormControl className="flex flex-col">
                    <div className="flex gap-1 justify-center">
                      <InputOTP
                        maxLength={4}
                        className="w-auto gap-2 border"
                        {...field}
                      >
                        <InputOTPSlot
                          index={0}
                          className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 sm:w-14 h-16 w-16 rounded-full bg-white"
                        />
                        <InputOTPSlot
                          index={1}
                          className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 sm:w-14 h-16 w-16 rounded-full bg-white"
                        />
                        <InputOTPSlot
                          index={2}
                          className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 sm:w-14 h-16 w-16 rounded-full bg-white"
                        />
                        <InputOTPSlot
                          index={3}
                          className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 sm:w-14 h-16 w-16 rounded-full bg-white"
                        />
                      </InputOTP>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />{" "}
            <div className="w-full">
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary p-0 pl-2"
                onClick={handleResendOTP}
              >
                Resend OTP
              </Button>
            </div>
          </div>
          {/* <div className="w-full flex justify-between">
          <Button
            type="button"
            variant="link"
            className="text-sm text-primary p-0"
            onClick={handleResendOTP}
          >
            Resend OTP
          </Button>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-sm text-primary"
            onClick={handleEditNumber}
          >
            <Edit />
            <span className="text-sm">+91 {mobileNumber}</span>
          </Button>
        </div> */}
          <div className="md:w-1/2 w-full text-center">
            <Button
              disabled={isOtpVerifyoading}
              type="submit"
              className="w-full shadow-none rounded-full bg-[#AF7346]  border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95  h-14 sm:h-14 font-normal text-base sm:text-lg text-white font-federo "
            >
              {isOtpVerifyoading ? "Verifying" : "Verify"}
            </Button>
            {form.formState.errors.otp && form.formState.errors.otp.message && (
              // <ErrorTooltip
              //   message={form.formState.errors.otp?.message}
              // />
              <div className="text-destructive text-xs mt-2">
                {form.formState.errors.otp?.message}
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
