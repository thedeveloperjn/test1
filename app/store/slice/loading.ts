import { LoadingSliceProps } from "../../interfaces/loading/loading"
import { LOADING_SLICE_INITIAL_STATE } from "../../utils/constants/loading"
import { create, StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

// Create the slice
const createLoadingSlice: StateCreator<
    LoadingSliceProps
> = () => ({
    ...LOADING_SLICE_INITIAL_STATE,
})

// Apply middlewares
export const useLoadingSlice = create(
    devtools(createLoadingSlice))



