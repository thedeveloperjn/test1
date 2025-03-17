"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserSlice } from "@/store/slice/user";
import { formSchema } from "@/utils/config/order-formscheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useGetUpdateUser } from "@/services/user/update-user";
import { toast } from "react-toastify";
import { changeUserData } from "@/store/action/user";

export function ProfileUpdateForm() {
  const user = useUserSlice((state) => state);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: `${user?.name || "" + user?.city}` || "",
      email: user?.emailId || "",
      phone: user?.mobileNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.pincode || "",
      paymentMode: "online-payment",
    },
  });
  const { updateUserMutation, isUserUpdating, isUserUpdateError } =
    useGetUpdateUser(user._id || "");
  useEffect(() => {
    form.reset({
      firstName: user?.name || "" + user?.city || "",
      email: user?.emailId || "",
      phone: user?.mobileNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.pincode || "",
      paymentMode: "online-payment",
    });
  }, [user, form]);

  const onUpdateProfile = (data: z.infer<typeof formSchema>) => {
    updateUserMutation(
      {
        email: data.email,
        name: data.firstName,
        address: data.address,
        pincode: data.zipCode,
        state: data.state,
        city: data.city,
        mobileNumber: data.phone as string,
        date: "",
        month: "",
        year: "",
        childName: "",
      },
      {
        onSuccess: async (res) => {
          changeUserData(res.data.data);
          toast.success(res.data.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col justify-center items-center bg-transparent w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onUpdateProfile)}
          className="space-y-2  max-w-xl "
        >
          <h2 className="text-lg mb-2 px-2 font-federo text-black">
            Contact Details
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-0">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="firstName">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="firstName"
                        placeholder="Your Complete Name"
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="phone">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Mobile No."
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email Id"
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="text-lg mb-2 px-2 font-federo text-black">
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="zipCode">
                      ZIP Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="zipCode"
                        placeholder="Pincode"
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only" htmlFor="city">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="city"
                        placeholder="City"
                        className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="state">
                    State
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="state"
                      placeholder="State"
                      className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="address">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="address"
                      placeholder="Address"
                      className="px-6 shadow-none border-[#D1AB66] text-black placeholder:text-black placeholder:capitalize sm:h-14 rounded-full bg-white pt-4"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            // disabled={isOrderLoading || isUserUpdating || isGetOrderLoading}
            className="shadow-none rounded-full bg-[#AF7346]  border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95  h-14 sm:h-14 w-full font-normal text-base sm:text-lg text-white uppercase mt-4 "
          >
            {/* {isOrderLoading || isUserUpdating || isGetOrderLoading
              ? "Proceeding"
              : " Proceed to Payment"} */}
            UPDATE NOW
          </Button>
        </form>
      </Form>
    </div>
  );
}
