"use client";

import * as React from "react";

import { Button } from "../../components/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { PriceBreakdown } from "./price-breakdown";

import { useCartSlice } from "../../store/main-store";
import { Form } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../utils/config/order-formscheme";
import { DeliveryDetails } from "./delivery-details";
import { PaymentMethod } from "./payment-method";
import { z } from "zod";
import { useUserSlice } from "../../store/slice/user";
import { useGetOrder } from "../../services/razorpay/razorpay";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { useCreateOrder } from "../../services/order/create-order";
import { useGetUpdateUser } from "../../services/user/update-user";
import { useGetOnlineDiscount } from "../../services/discount/online-discount";
import { OrderPayload } from "../../interfaces/order/create-order";
import { IOrder } from "../../interfaces/payment/razorPayOrderRespponse";
import { clearCart } from "../../store/action/cart";
import { toast } from "react-toastify";
import { changeUserData } from "../../store/action/user";
import { formatOrderDetails } from "../../utils/functions/formatOrderDetails";

export function MobileCheckout() {
  const cartDetails = useCartSlice((state) => state.cartDetails);
  const user = useUserSlice((state) => state);
  const { orderMutation } = useGetOrder();
  const { Razorpay } = useRazorpay();
  const {
    OrderMutation: OrderCreateMutation,
    isOrderLoading,
    isOrderError,
  } = useCreateOrder();
  const { updateUserMutation, isUserUpdating, isUserUpdateError } =
    useGetUpdateUser(user._id || "");

  const {
    couponOnlineData,
    iscouponOnlineLoading,
    iscouponOnlineError,
    couponRefetch,
  } = useGetOnlineDiscount();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",

      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMode: "online-payment",
    },
  });

  const onOnlinePayment = React.useCallback(
    (OrderPayload: OrderPayload) => {
      orderMutation(Math.round(OrderPayload?.orderDetails?.orderTotal) * 100, {
        onSuccess: (order: IOrder) => {
          const options: RazorpayOrderOptions = {
            key: process.env.RAZORPAY_KEY_ID || "rzp_live_0Gcfu2r8Cx5MXe",
            amount: order?.amount,
            currency: "INR",
            name: "WigglyPop",
            description: "Test Transaction",
            image:
              "https://doubletick-s3.s3.ap-south-1.amazonaws.com/giftingsaga-s3-bucket/giftingsaga-logo.png",
            order_id: order.id,
            handler: async (res) => {
              let tempOrderPayload = OrderPayload;
              tempOrderPayload.paymentDetails = {
                paymentId: res.razorpay_payment_id,
                paymentDate: "2024-02-22T20:58:42.678+00:00",
                paymentAmount: cartDetails.summary.grandTotal,
                paymentStatus: "SUCCESS",
                paymentMethod: "RazorPay",
                orderId: res.razorpay_order_id,
                customerId: user != null ? user?._id : "",
              };

              OrderCreateMutation(OrderPayload, {
                onSuccess: (res) => {
                  clearCart();
                  // removeCart();
                  // refetchCart();
                  // setPayMode("online-payment");
                  // customEventTrack(
                  //   TRACKING_ACTIONS.ORDER_PLACED,
                  //   EVENT_METHODS.CLICK,
                  //   {
                  //     id: user != null ? user?._id : null,
                  //     name: "ONLINE_PAYMENT",
                  //     path: pathname,
                  //     other: OrderPayload,
                  //   }
                  // );
                  toast.success(
                    <div className="order-success-toast">
                      <div className="icon-container">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="message-container">
                        <p className="message">Order Placed successfully</p>
                        <p className="order-id">Order ID: {res?.orderId}</p>
                      </div>
                    </div>,
                    { autoClose: false }
                  );
                  // router.push("/order-success");
                },
                onError: () => {
                  toast.error("ERROR ORDER CREATED");
                },
              });
            },
            prefill: {
              name: user?._id || "",
              email: user?.emailId || "",
              contact: user?.mobileNumber || "",
            },
            notes: user?.address || "",
            theme: {
              color: "#3399cc",
            },
          };

          const rzpay = new Razorpay(options);
          rzpay.open();
          rzpay.on(
            "payment.failed",
            function (response: {
              error: {
                code: any;
                description: any;
                source: any;
                step: any;
                reason: any;
                metadata: { order_id: any; payment_id: any };
              };
            }) {
              toast.error(response.error.description);
              // alert(response.error.code)
              // alert(response.error.description)
              // alert(response.error.source)
              // alert(response.error.step)
              // alert(response.error.reason)
              // alert(response.error.metadata.order_id)
              // alert(response.error.metadata.payment_id)
            }
          );
        },
      });
    },
    [Razorpay]
  );

  const onOrder = (data: z.infer<typeof formSchema>) => {
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
          await changeUserData(res.data.data);
          if (
            cartDetails?.cart != null &&
            cartDetails?.summary != null &&
            res?.data != null
          ) {
            if (cartDetails?.cart != null && cartDetails?.summary != null) {
              if (data.paymentMode === "cod") {
                let orderPayload = {
                  orderDetails: {
                    orderedProducts: formatOrderDetails(cartDetails?.cart),
                    orderSubTotal: cartDetails?.summary?.subTotal,
                    orderCouponDiscountAmount: 0,
                    orderMode: "COD",
                    orderTotal: cartDetails?.summary.grandTotal,
                    orderShippingCost: 0,
                    orderDiscountAmount: cartDetails?.summary.totalDiscount,
                    inputFields: {},
                  },
                  customerDetails: {
                    customerId: user?._id || "",
                    customerName: user?.name || "",
                    customerEmail: user?.emailId || "",
                    customerNumber: user?.mobileNumber || "",
                    customerAddress: {
                      addressId: null,
                      address: user?.address || "",
                      addressType: "",
                      country: "India",
                      state: user?.state || "",
                      city: user?.city || "",
                      pincode: user?.pincode || "",
                      landMark: "",
                    },
                  },
                  paymentDetails: {
                    // paymentId: 'pay_NdyUyHoRddBsJe',
                    // paymentDate: '2024-02-22T20:58:42.678+00:00',
                    // paymentAmount: 1079,
                    // paymentStatus: 'SUCCESS',
                    // paymentMethod: 'RazorPay',
                    // orderId: 'order_Manual',
                    // customerId: '65d766156ec3eb2a125e23a1'
                  },
                  discountDetails: {},
                  mediaDetails: {},
                };

                OrderCreateMutation(orderPayload, {
                  onSuccess: (res) => {
                    // removeCart();
                    // setPayMode("online-payment");
                    clearCart();
                    toast.success(
                      <div className="order-success-toast">
                        <div className="icon-container">
                          <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="message-container">
                          <p className="message">Order Placed successfully</p>
                          <p className="order-id">Order ID: {res?.orderId}</p>
                        </div>
                      </div>,
                      { autoClose: false }
                    );
                    // customEventTrack(
                    //   TRACKING_ACTIONS.ORDER_PLACED,
                    //   EVENT_METHODS.CLICK,
                    //   {
                    //     id: user != null ? user?._id : null,
                    //     name: "CASH_ON_DELIVERY",
                    //     path: pathname,
                    //     other: orderPayload,
                    //   }
                    // );
                    // router.push("/order-success");
                  },
                  onError: (err) => {
                    console.log(
                      "🚀 ~ onSubmitDelivery ~ err:",
                      JSON.stringify(err)
                    );
                    if (err.message === "Request failed with status code 500") {
                      toast.error(
                        "Something Went Wrong! Please Try Again Later"
                      );
                    } else {
                      toast.error(err?.message);
                    }
                  },
                });
              } else {
                let orderPayload = {
                  orderDetails: {
                    orderedProducts: formatOrderDetails(cartDetails?.cart),
                    orderSubTotal: cartDetails?.summary?.subTotal,
                    orderCouponDiscountAmount: 0,
                    orderMode: "ONLINE",
                    orderTotal: cartDetails?.summary.grandTotal,
                    orderShippingCost: 0,
                    orderDiscountAmount: cartDetails?.summary.totalDiscount,
                  },
                  customerDetails: {
                    customerId: user?._id || "",
                    customerName: user?.name || "",
                    customerEmail: user?.emailId || "",
                    customerNumber: user?.mobileNumber || "",
                    customerAddress: {
                      addressId: null,
                      address: user?.address || "",
                      addressType: "",
                      country: "India",
                      state: user?.state || "",
                      city: user?.city || "",
                      pincode: user?.pincode || "",
                      landMark: "",
                    },
                  },
                  paymentDetails: {
                    // paymentId: 'pay_NdyUyHoRddBsJe',
                    // paymentDate: '2024-02-22T20:58:42.678+00:00',
                    // paymentAmount: 1079,
                    // paymentStatus: 'SUCCESS',
                    // paymentMethod: 'RazorPay',
                    // orderId: 'order_Manual',
                    // customerId: '65d766156ec3eb2a125e23a1'
                  },
                  discountDetails: {
                    discountOnlinePayment: couponOnlineData?.data.discount,
                  },
                  mediaDetails: {},
                };
                onOnlinePayment(orderPayload);
              }
            }
          }
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full text-lg text-white uppercase font-light bg-primary shadow-none rounded-none border-none sm:h-12">
          Proceed To Checkout
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90%] rounded-none">
        <div className="hidden">
          <DrawerTitle>Checkout</DrawerTitle>
        </div>
        <div className="mx-auto w-full max-w-sm h-full flex flex-col">
          <div className="flex-grow overflow-y-auto space-y-8 p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onOrder)} className="space-y-8">
                <PriceBreakdown {...cartDetails} />
                <DeliveryDetails form={form} />
                <PaymentMethod form={form} discountDetails={couponOnlineData} />
              </form>
            </Form>
          </div>
          <DrawerFooter>
            <Button>Place Order</Button>
            {/* <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
