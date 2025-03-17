import { FilterProps } from "../../interfaces/filter/filter";
import { useFilterSlice } from "../slice/filter";

// Local Cart Functionality (for logged-out users)
export const changeFilter = async (filter: FilterProps) => {
    useFilterSlice.setState((state) => {
        // Check if the filter with the given type already exists
        const filterIndex = state.filters.findIndex((f) => f.type === filter.type);

        if (filterIndex !== -1) {
            // Filter exists, replace its value with newValues
            const updatedFilters = [...state.filters];
            updatedFilters[filterIndex] = {
                ...updatedFilters[filterIndex],
                value: filter.value,
            };
            return { filters: updatedFilters };
        } else {
            // Filter does not exist, add a new filter
            return {
                filters: [
                    ...state.filters,
                    {
                        type: filter.type,
                        value: filter.value,
                    },
                ],
            };
        }
    });
}

export const changeSortBy = async (sortBy: string) => {
    useFilterSlice.setState(() => { return { sortBy: sortBy } })
}
// Clear Filters
export const clearFilter = async () => {
    useFilterSlice.setState((state) => {
        // Filter does not exist, add a new filter
        return {
            filters: [

            ],

        }
    });
}


// Change Complet Filter
export const changeAllFilter = async (filter: FilterProps[]) => {
    useFilterSlice.setState(() => {

        return {
            filters: filter,

        }
    });
}


