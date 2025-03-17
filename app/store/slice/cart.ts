import { CartSliceProps } from '../../interfaces/cart/cart'
import { CART_INITIAL_STATE } from '../../utils/constants/cart'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'





// Create the slice
const createCartSlice: StateCreator<
    CartSliceProps
> = () => ({
    ...CART_INITIAL_STATE,
})

// Apply middlewares
export const useCartSlice = create(persist(
    devtools(createCartSlice),
    { name: 'cart-storage' }
))