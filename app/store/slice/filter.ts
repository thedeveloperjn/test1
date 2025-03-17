import { FilterSliceProps } from '../../interfaces/filter/filter'
import { FILTER_INITIAL_STATE } from '../../utils/constants/filter'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'





// Create the slice
const createFilterSlice: StateCreator<
    FilterSliceProps
> = () => ({
    ...FILTER_INITIAL_STATE,
})

// Apply middlewares
export const useFilterSlice = create(persist(
    devtools(createFilterSlice),
    { name: 'fs' }
))