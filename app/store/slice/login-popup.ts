import { loginModalProps } from "../../interfaces/auth/login-popup"
import { LOGIN_MODAL_INITIAL_STATE } from "../../utils/constants/login-popup"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

// Create the slice
const createLoginModalSlice: StateCreator<
    loginModalProps
> = () => ({
    ...LOGIN_MODAL_INITIAL_STATE,
})

// Apply middlewares
export const useLoginModalSlice = create(
    devtools(createLoginModalSlice))



