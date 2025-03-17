"use client";

import { Button } from "../Button";
import { Input } from "../Input";
import { useGetSendOtp } from "../../services/auth/sendOTP";
import { changeAuthMobileNumber } from "../../store/action/auth";
import { changeLoginModalType } from "../../store/action/login-modal";
import { useAuthSlice } from "../../store/main-store";
import { useUserSlice } from "../../store/slice/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const formSchema = z.object({
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
});

export default function MobileNumberInputCheckoutPage() {
  const { OtpMutation, isOtpoading } = useGetSendOtp();
  const authToken = useAuthSlice((state) => state.authToken);
  const mobileNumber = useUserSlice((state) => state.mobileNumber);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: mobileNumber || "",
    },
  });

  useEffect(() => {
    if (form.getValues("mobileNumber") !== mobileNumber) {
      form.reset({
        mobileNumber: mobileNumber || "",
      });
    }
  }, [mobileNumber, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    OtpMutation(
      { mobileNumber: values.mobileNumber },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          changeLoginModalType("LOGIN_OTP_INPUT_CHECKOUT");
          changeAuthMobileNumber(values.mobileNumber);
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-start mb-4">
          <h2 className="text-lg px-2 font-federo text-black">Verification</h2>
          {authToken && (
            <span className="flex items-center gap-1 text-sm px-2 font-public-sans text-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.52727 16L4.14545 13.5619L1.52727 12.9524L1.78182 10.1333L0 8L1.78182 5.86667L1.52727 3.04762L4.14545 2.4381L5.52727 0L8 1.10476L10.4727 0L11.8545 2.4381L14.4727 3.04762L14.2182 5.86667L16 8L14.2182 10.1333L14.4727 12.9524L11.8545 13.5619L10.4727 16L8 14.8952L5.52727 16ZM7.23636 10.7048L11.3455 6.4L10.3273 5.29524L7.23636 8.53333L5.67273 6.93333L4.65455 8L7.23636 10.7048Z"
                  fill="#4ECB71"
                />
              </svg>
              <span className="text-[#4ECB71]">Verified</span>
            </span>
          )}
        </div>
        <div className="flex sm:flex-row flex-col w-full sm:space-x-2 sm:gap-0 gap-4 ">
          <div className="sm:w-3/4 w-full">
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="mobileNumber" hidden>
                    Mobile Number
                  </FormLabel>
                  <div className="flex gap-1">
                    <FormControl>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        placeholder="Enter mobile number"
                        {...field}
                        disabled={!!authToken}
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white"
                      />
                    </FormControl>
                  </div>
                  {form.formState.errors.mobileNumber?.message && (
                    <div className="text-destructive text-xs">
                      {form.formState.errors.mobileNumber.message}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isOtpoading || !!authToken}
            type="submit"
            className="shadow-none rounded-full bg-[#AF7346] border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95 h-14 sm:h-14 sm:w-1/4 w-full font-normal text-base sm:text-lg text-white font-federo"
          >
            {authToken ? "Verified" : isOtpoading ? "Verifying" : "Verify Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
