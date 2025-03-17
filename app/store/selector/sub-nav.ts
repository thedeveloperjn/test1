import { SubNavSlice } from "@/interfaces/navbar/subnav";
import { useSubNavSlice } from "../slice/nav-bar";

// Selector for Cart Items
const selectSubNNavState = (state: SubNavSlice) => state.category;
export const useGetSubNavCategory = () => {
    return { SubNavCategory: useSubNavSlice(selectSubNNavState) };
}