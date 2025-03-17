import { SubNavSlice } from '@/interfaces/navbar/subnav'
import { SUBNAV_INITIAL } from '@/utils/constants/navbar'
import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


// Create the slice
const createSubNavSlice: StateCreator<
    SubNavSlice
> = () => ({
    ...SUBNAV_INITIAL,
})

// Apply middlewares
export const useSubNavSlice = create(
    persist(
        devtools(createSubNavSlice),
        { name: 'subNav-storage' }
    ))