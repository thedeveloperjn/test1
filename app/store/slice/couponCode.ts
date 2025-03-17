import { create } from "zustand";

interface CouponState {
    code: string;
    amount: number;
    quantity: number;
    isApplied: boolean;
    paymentMode: "online-payment" | "cod";
    applyCoupon: (code: string, amount: number) => void;
    removeCoupon: () => void;
    setPaymentMode: (mode: "online-payment" | "cod") => void;
}

const useCouponCodeSlice = create<CouponState>((set) => ({
    code: "coupon-code",
    amount: 0,
    quantity: 1,
    isApplied: false,
    paymentMode: "online-payment",

    applyCoupon: (code, amount) =>
        set({ code, amount, isApplied: true }),

    removeCoupon: () =>
        set({ code: "", amount: 0, isApplied: false }),

    setPaymentMode: (mode) => set({ paymentMode: mode }),
}));

export default useCouponCodeSlice;
