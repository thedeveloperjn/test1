import { CartSliceProps } from "@/interfaces/cart/cart";
import { useCartSlice } from "../slice/cart";

// Selector for Cart Items
const selectCartItems = (state: CartSliceProps) => state.products;
export const useGetCartItems = () => {
    return useCartSlice(selectCartItems);
}

// Selector for Cart Loading State
const selectCartLoadingState = (state: CartSliceProps) => state.isLoading;
export const useGetLoadingState = () => {
    return useCartSlice(selectCartLoadingState);
}
