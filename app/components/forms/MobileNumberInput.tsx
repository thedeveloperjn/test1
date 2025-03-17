"use client";
import { Button } from "../Button";
import { Input } from "../Input";
import { useGetSendOtp } from "../../services/auth/sendOTP";
import { changeAuthMobileNumber } from "../../store/action/auth";
import { changeLoginModalType } from "../../store/action/login-modal";
import { useGetAuthMobile } from "../../store/selector/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

const formSchema = z.object({
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
});

export default function MobileNumberInput() {
  const { OtpMutation, isOtpoading } = useGetSendOtp();
  const mobileNumber = useGetAuthMobile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobileNumber: mobileNumber ? mobileNumber : "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    OtpMutation(
      { mobileNumber: values.mobileNumber },
      {
        onSuccess: (res) => {
          toast.success(res.message);
          changeLoginModalType("LOGIN_OTP_INPUT");
          changeAuthMobileNumber(values.mobileNumber);
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
    // if (reqId) {
    //   const payload: CheckemailmobileApiPayload = {
    //     emailId: values.mobileNumber,
    //     requestToken: reqId,
    //   };

    //   checkEmailMobileMutation(payload, {
    //     onSuccess: (res) => {
    //       if (res.isOTPSent == true) {
    //         setMobileNumber(values.mobileNumber as string);
    //         setOtpStatus(true);
    //         setMsgId(res.msgId);
    //         setEmailId(res?.emailId);
    //         toast.success(res.message, {
    //           position: "bottom-right",
    //         });
    //       } else {
    //         throw new Error(res.message);
    //       }
    //     },
    //     onError: (error) => {
    //       setMobileNumber(null);
    //       setOtpStatus(false);
    //       setMsgId(null);
    //       toast.error(
    //         error?.message || "An error occurred. Please try again.",
    //         {
    //           position: "bottom-right",
    //         }
    //       );
    //       // router.replace("/auth/signup");
    //       loginPopToggle("register");
    //     },
    //   });
    // } else {
    //   toast.error("Message ID not found. Please try again.", {
    //     position: "bottom-right",
    //   });
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full "
      >
        <div className="flex justify-center items-center">
          <span className="text-2xl font-federo text-black">Login/Signup</span>
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="mobileNumber" hidden>
                  Mobile Number
                </FormLabel>
                <div className="relative flex items-center gap-1">
                  <div className="absolute left-5 text-sm text-black">+91</div>
                  {/* </div> */}
                  <FormControl>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      placeholder="Enter mobile number"
                      {...field}
                      className="flex-1 px-6 pl-14 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 h-14 rounded-full bg-white w-full"
                    />
                  </FormControl>
                </div>
                {form.formState.errors.mobileNumber &&
                  form.formState.errors.mobileNumber.message && (
                    // <ErrorTooltip
                    //   message={form.formState.errors.mobileNumber?.message}
                    // />
                    <div className="text-destructive text-xs">
                      {form.formState.errors.mobileNumber?.message}
                    </div>
                  )}
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isOtpoading}
          type="submit"
          className="w-full shadow-none rounded-full bg-[#AF7346]  border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95  h-14 sm:h-14 font-normal text-base sm:text-lg text-white font-federo "
        >
          {isOtpoading ? "Sending OTP.." : "Continue to Proceed"}
        </Button>
      </form>
    </Form>
  );
}
