import { CartSliceProps } from "@/interfaces/cart/cart";

export const CART_INITIAL_STATE: CartSliceProps = {
    cartDetails: {
        cart: [],
        summary: {
            subTotal: 0,
            totalQuantity: 0,
            totalDiscount: 0,
            offerDiscount: 0,
            shipping: "",
            grandTotal: 0
        },
        inputFields: {
            inputTextFields: [],
            inputImageFields: []
        }
    },
    products: [],
    isLoading: {
        id: "",
        state: false
    },
    error: null,
}