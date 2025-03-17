"use client";

import { Breadcrumb } from "../components/breadcrumb";
import MobileNumberInputCheckoutPage from "../components/forms/MobileNumberInputCheckoutPage";
import OTPInputCheckoutPage from "../components/forms/OTPInputCheckoutPage";
import { CouponCodeForm } from "../components/forms/coupon-code-form";
import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import { OrderPayload } from "../interfaces/order/create-order";
import { IOrder } from "../interfaces/payment/razorPayOrderRespponse";
import { axiosInstance } from "../lib/axios";
import { useGetOnlineDiscount } from "../services/discount/online-discount";
import { useCreateOrder } from "../services/order/create-order";
import { useGetOrder } from "../services/razorpay/razorpay";
import { useGetUpdateUser } from "../services/user/update-user";
import { clearCart, updateCartSummary } from "../store/action/cart";
import { changeUserData } from "../store/action/user";
import { useAuthSlice, useCartSlice } from "../store/main-store";
import { useLoginModalSlice } from "../store/slice/login-popup";
import { useUserSlice } from "../store/slice/user";
import { formSchema } from "../utils/config/order-formscheme";
import { DISCOUNT_API } from "../utils/constants/apiEndpoints";
import { LOGIN_MODAL_TYPE } from "../utils/constants/login-popup";
import { formatOrderDetails } from "../utils/functions/formatOrderDetails";
import getDiscountedItems from "../utils/functions/offerDiscount";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";
import { z } from "zod";
import { DeliveryDetails } from "./components/delivery-details";
import { PaymentMethod } from "./components/payment-method";
import { PriceBreakdown } from "./components/price-breakdown";
import { useGetPincodeDetails } from "../services/pincode/pincode";
import { SuccessOrder } from "./components/success-order";
import { useGetCouponCode } from "../services/discount/coupon-code";
import { CouponCodeData, CouponCodePayload } from "../interfaces/discount/coupon-code";
import useCouponCodeSlice from "../store/slice/couponCode";
import ProductBox from "../components/Productbox";

// Updated CartProductList with filtering
const CartProductList = ({ cart, ...cartDetails }) => {
  if (!cart || cart.length === 0) {
    return <p className="text-center text-gray-500">No items in cart</p>;
  }

  // Log cart for debugging
  console.log("CartProductList cart:", cart);

  const validCartItems = cart.filter(
    (item) => item?.productDetail && item.productDetail.seoSlug
  );

  if (validCartItems.length === 0) {
    return <p className="text-center text-red-500">No valid products in cart</p>;
  }

  return (
    <div className="space-y-4">
      {validCartItems.map((item, index) => (
        <ProductBox key={index} product={item.productDetail} />
      ))}
    </div>
  );
};

export default function CheckoutPage() {
  const authtoken = useAuthSlice((state) => state.authToken);
  const isLoggedIn = useAuthSlice((state) => state.isAuthenticate);
  const cartDetails = useCartSlice((state) => state.cartDetails);
  const setIsCouponApplied = useCouponCodeSlice((state) => state.isApplied);
  const user = useUserSlice((state) => state);
  const router = useRouter();
  const [confirmOrder, setOrderConfirmed] = useState(false);
  const { orderMutation, isOrderLoading: isGetOrderLoading } = useGetOrder();
  const { Razorpay } = useRazorpay();
  const [couponCodeAmount, setCouponCodeAmount] = useState<number>(0);
  const couponCode = useCouponCodeSlice((state) => state.code);
  const isCouponApplied = useCouponCodeSlice((state) => state.isApplied);
  const removeCoupon = useCouponCodeSlice((state) => state.removeCoupon);
  const setPaymentMode = useCouponCodeSlice((state) => state.setPaymentMode);
  const {
    OrderMutation: OrderCreateMutation,
    isOrderLoading,
    isOrderError,
    orderData,
  } = useCreateOrder();
  const {
    data: couponData,
    ApplyCCodeMutation,
    error: CCodeError,
  } = useGetCouponCode();
  const { updateUserMutation, isUserUpdating, isUserUpdateError } =
    useGetUpdateUser(user._id || "");
  const loginType = useLoginModalSlice((state) => state.loginModalState);

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
  const paymentMode = form.watch("paymentMode");
  const checkPincode = form.watch("zipCode");
  const { pincodeData, isPincodeLoading, isPincodeError, pincodeRefetch } =
    useGetPincodeDetails(checkPincode);
  const {
    couponOnlineData,
    iscouponOnlineLoading,
    iscouponOnlineError,
    couponRefetch,
  } = useGetOnlineDiscount();

  useEffect(() => {
    removeCoupon();
  }, []);

  useEffect(() => {
    fetchDiscountDetail();
    setPaymentMode(paymentMode);
  }, [paymentMode, couponOnlineData]);

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
    fetchDiscountDetail();
  }, [user, form]);

  const fetchDiscountDetail = async () => {
    const discountDetail = await couponRefetch();
    if (discountDetail?.data?.data?.data?.onlinePaymentDiscount) {
      let discount;
      if (isCouponApplied) {
        const cCodePayload: CouponCodePayload = {
          code: couponCode,
          amount: cartDetails.summary.grandTotal,
          quantity: 1,
        };
        ApplyCCodeMutation(cCodePayload, {
          onSuccess: (response) => {
            const { amount, type, status }: CouponCodeData = response;
            discount =
              type?.toLowerCase() !== "flat" &&
              status?.toLowerCase() === "active" &&
              amount
                ? paymentMode === "online-payment"
                  ? amount + discountDetail.data?.data?.data?.discount
                  : amount
                : cartDetails.summary.grandTotal * ((amount || 0) / 100);

            updateCartSummary({
              percentage: discount || 0,
              paymentMode,
            });
          },
        });
      } else {
        discount =
          paymentMode === "online-payment"
            ? discountDetail.data?.data?.data?.discount
            : 0;
        await updateCartSummary({
          percentage: discount || 0,
          paymentMode,
        });
      }
    }
  };

  useEffect(() => {
    const fetchOfferDiscount = async () => {
      let responseOffer;
      if (authtoken) {
        responseOffer = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL, {
          headers: { Authorization: `Bearer ${authtoken}` },
        });
      } else {
        responseOffer = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL);
      }
      console.log("RESPONSE : ", responseOffer.data);
      const response = await getDiscountedItems(responseOffer?.data, cartDetails?.cart);
    };
    fetchOfferDiscount();
  }, [cartDetails]);

  const onOnlinePayment = useCallback(
    (OrderPayload: OrderPayload) => {
      orderMutation(Math.round(OrderPayload?.orderDetails?.orderTotal) * 100, {
        onSuccess: (order: IOrder) => {
          const options: RazorpayOrderOptions = {
            key: process.env.RAZORPAY_KEY_ID || "rzp_live_0Gcfu2r8Cx5MXe",
            amount: order?.amount,
            currency: "INR",
            name: "Gifting Saga",
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
                  setOrderConfirmed(true);
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
            theme: { color: "#3399cc" },
          };

          const rzpay = new Razorpay(options);
          rzpay.open();
          rzpay.on(
            "payment.failed",
            function (response: {
              error: { code: any; description: any; source: any; step: any; reason: any; metadata: { order_id: any; payment_id: any } };
            }) {
              toast.error(response.error.description);
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
          if (cartDetails?.cart != null && cartDetails?.summary != null && res?.data != null) {
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
                },
                customerDetails: {
                  customerId: user?._id || "",
                  customerName: user?.name || "",
                  customerEmail: user?.emailId || "",
                  customerNumber: user?.mobileNumber || "",
                  customerAddress: {
                    addressId: null,
                    address: user?.address || "bilaspur",
                    addressType: "",
                    country: "India",
                    state: user?.state || "cg",
                    city: user?.city || "bilaspur",
                    pincode: user?.pincode || "222222",
                    landMark: "test",
                  },
                },
                paymentDetails: {},
                discountDetails: {},
                mediaDetails: {},
              };
              OrderCreateMutation(orderPayload, {
                onSuccess: (res) => {
                  clearCart();
                  setOrderConfirmed(true);
                },
                onError: (err) => {
                  console.log("🚀 ~ onSubmitDelivery ~ err:", JSON.stringify(err));
                  if (err.message === "Request failed with status code 500") {
                    toast.error("Something Went Wrong! Please Try Again Later");
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
                    address: user?.address || "bilaspur",
                    addressType: "",
                    country: "India",
                    state: user?.state || "cg",
                    city: user?.city || "bilaspur",
                    pincode: user?.pincode || "222222",
                    landMark: "test",
                  },
                },
                paymentDetails: {},
                discountDetails: {
                  discountOnlinePayment: couponOnlineData?.data?.discount,
                },
                mediaDetails: {},
              };
              onOnlinePayment(orderPayload);
            }
          }
        },
        onError: (e) => {
          toast.error(e.message);
        },
      }
    );
  };

  // Log cartDetails for debugging
  useEffect(() => {
    console.log("CheckoutPage cartDetails.cart:", cartDetails.cart);
  }, [cartDetails]);

  if (confirmOrder && orderData?.orderId) {
    return <SuccessOrder orderId={orderData?.orderId} />;
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFF0E3] to-white to-60% sm:py-8 animate-in duration-300">
        <div className="container mx-auto pt-3">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Checkout", href: "" },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-8 sm:mt-10 mt-2">
            {authtoken && isLoggedIn ? (
              <div className="sm:space-y-8 order-2 sm:order-1 p-8 sm:border-2 sm:border-white rounded-3xl">
                <MobileNumberInputCheckoutPage />
                {cartDetails?.cart?.length >= 1 ? (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onOrder)}
                      className="space-y-8"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    >
                      <DeliveryDetails form={form} />
                      <PaymentMethod form={form} discountDetails={couponOnlineData} />
                      <Button
                        disabled={isOrderLoading || isUserUpdating || isGetOrderLoading}
                        className="shadow-none rounded-full bg-[#AF7346] border-2 border-[#D1AB66] hover:bg-[#D1AB66] hover:bg-opacity-95 h-14 sm:h-14 w-full font-normal text-base sm:text-lg text-white uppercase mt-4"
                      >
                        {isOrderLoading || isUserUpdating || isGetOrderLoading
                          ? "Proceeding"
                          : "Proceed to Payment"}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div
                    onClick={() => router.push("/all/new-arrivals/all")}
                    className="hover:cursor-pointer text-center text-primary border border-[#AF7346] hover:bg-[#96663D] hover:text-white px-8 py-3 text-lg rounded-full w-full mt-10"
                  >
                    EXPLORE SHOP
                  </div>
                )}
              </div>
            ) : (
              <div className="sm:space-y-8 order-2 sm:order-1 p-8 sm:border-2 sm:border-white rounded-3xl sm:mt-0 mt-10">
                {loginType === LOGIN_MODAL_TYPE.LOGIN_OTP_INPUT_CHECKOUT ? (
                  <OTPInputCheckoutPage />
                ) : (
                  <MobileNumberInputCheckoutPage />
                )}
                {cartDetails?.cart?.length >= 1 ? null : (
                  <div
                    onClick={() => router.push("/all/new-arrivals/all")}
                    className="hover:cursor-pointer text-center text-primary border border-[#AF7346] hover:bg-[#96663D] hover:text-white px-8 py-3 text-lg rounded-full w-full mt-10"
                  >
                    EXPLORE SHOP
                  </div>
                )}
              </div>
            )}
            {cartDetails.cart.length > 0 ? (
              <div className="order-1 sm:order-2 p-8 sm:border-2 sm:border-white rounded-3xl space-y-8">
                <CartProductList {...cartDetails} />
                {authtoken && (
                  <CouponCodeForm
                    cartDetails={cartDetails}
                    couponData={couponOnlineData}
                    paymentModePage={paymentMode}
                  />
                )}
                <PriceBreakdown {...cartDetails} />
              </div>
            ) : (
              <h2 className="order-1 sm:order-2 section-title-size capitalize text-gray-700 text-center font-federo">
                Your Cart is <span className="text-[#F3238A]">Empty</span>
              </h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}