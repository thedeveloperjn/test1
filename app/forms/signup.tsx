"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSession } from "@/lib/session";
import { createUserService } from "@/services/auth/create-user";
import {
  changeAuthStatus,
  changeAuthToken,
  changeSignupToken,
} from "@/store/action/auth";
import { syncCart, updateCartSummary } from "@/store/action/cart";
import { changeLoginModalType } from "@/store/action/login-modal";
import { changeUserData } from "@/store/action/user";
import { useGetAuthMobile, useGetAuthSignUpToken } from "@/store/selector/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useGetOnlineDiscount } from "@/services/discount/online-discount";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  address: z.string().min(1, "Address is required"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  date: z.union([z.string(), z.number()]),
  month: z.union([z.string(), z.number()]),
  year: z.union([z.string(), z.number()]),
  childName: z.string().min(1, "Child name is required"),
  childDateOfBirth: z.string().optional(),
});

export default function SignupForm() {
  const router = useRouter();
  const { CreateUserMutation, isUserCreating } = createUserService();
  const mobileNumber = useGetAuthMobile();
  const signupToken = useGetAuthSignUpToken();
  const {
    couponOnlineData,
    iscouponOnlineLoading,
    iscouponOnlineError,
    couponRefetch,
  } = useGetOnlineDiscount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      pincode: "",
      city: "",
      state: "",
      address: "",
      mobileNumber: mobileNumber || "",
      date: "",
      month: "",
      year: "",
      childName: " ",
      childDateOfBirth: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (signupToken && mobileNumber) {
      CreateUserMutation(
        {
          userDetail: { ...values, mobileNumber: mobileNumber },
          signupToken: signupToken,
        },
        {
          onSuccess: async (res) => {
            createSession(res.data.accessToken || "");
            changeUserData(res.data);
            changeSignupToken(null);
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
            router.refresh();
          },
          onError: (e) => {
            toast.error(e.response?.data.message);
          },
        }
      );
    } else {
      toast.error(JSON.stringify(values, null, 2));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-federo text-black">Signup</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      {...field}
                      className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                    />
                  </FormControl>
                  {form.formState.errors.name && (
                    <div className="text-destructive text-xs">
                      {form.formState.errors.name?.message}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                  />
                </FormControl>
                {form.formState.errors.email && (
                  <div className="text-destructive text-xs">
                    {form.formState.errors.email?.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="pincode">Pincode</FormLabel>
                <FormControl>
                  <Input
                    id="pincode"
                    placeholder="Enter your pincode"
                    {...field}
                    className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                  />
                </FormControl>
                {form.formState.errors.pincode && (
                  <div className="text-destructive text-xs">
                    {form.formState.errors.pincode?.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="city">City</FormLabel>
                <FormControl>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    {...field}
                    className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                  />
                </FormControl>
                {form.formState.errors.city && (
                  <div className="text-destructive text-xs">
                    {form.formState.errors.city?.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="state">State</FormLabel>
                <FormControl>
                  <Input
                    id="state"
                    placeholder="Enter your state"
                    {...field}
                    className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                  />
                </FormControl>
                {form.formState.errors.state && (
                  <div className="text-destructive text-xs">
                    {form.formState.errors.state?.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address">Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      placeholder="Enter your address"
                      {...field}
                      className="flex-1 rounded-none focus:outline-none focus:ring-0 focus:ring-offset-0 shadow-none border-black/30 sm:h-12"
                    />
                  </FormControl>
                  {form.formState.errors.address && (
                    <div className="text-destructive text-xs">
                      {form.formState.errors.address?.message}
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          disabled={isUserCreating}
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-primary/50 to-primary/60 hover:from-primary/60 hover:to-primary/90 text-white py-6 text-lg font-federo"
        >
          {isUserCreating ? "Submiting" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
