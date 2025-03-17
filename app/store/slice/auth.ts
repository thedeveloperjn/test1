import { AuthProps } from "../../interfaces/auth/auth"
import { AUTH_INITIAL_STATE } from "../../utils/constants/auth"
import { create, StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

// Create the slice
const createAuthSlice: StateCreator<
    AuthProps
> = () => ({
    ...AUTH_INITIAL_STATE,
})

// Apply middlewares
export const useAuthSlice = create(persist(
    devtools(createAuthSlice),
    { name: 'auth-data' }
))