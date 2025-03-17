import { CartItem, CustomerCartItem } from "../../interfaces/cart/cart";
import { Product, VariantData } from "../../interfaces/product/product";
import { arraysMatch } from "./arrMatch";
import { useCartSlice } from "../../store/main-store";
import { compareVariantData } from "../../store/action/cart";

// check product stocks
export function checkProductInCart(product: CartItem) {
    const cartProduct: CustomerCartItem[] = useCartSlice((state) => state.cartDetails.cart)
    const existItem = cartProduct.find((CartProduct) => (CartProduct._id === product.productDetail._id) && compareVariantData(CartProduct.rows, product.productDetail.rows))

    if (existItem)
        return true
    else return false
}