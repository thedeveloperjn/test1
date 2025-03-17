import { UserData } from "../../interfaces/auth/auth"
import { USERDATA_INITIAL_STATE } from "../../utils/constants/user"
import { create, StateCreator } from "zustand"
import { devtools, persist } from "zustand/middleware"

// Create the slice
const createUserSlice: StateCreator<
    UserData
> = () => ({
    ...USERDATA_INITIAL_STATE,
})

// Apply middlewares
export const useUserSlice = create(persist(
    devtools(createUserSlice),
    { name: 'user-data' }
))