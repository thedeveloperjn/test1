import { CategoryResponse } from "../../interfaces/categories/caegory";
import { axiosInstance } from "../../lib/axios";
import { CATEGORY_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Dextop Banner
export const getAllCategories = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<CategoryResponse, Error>({
        queryKey: [CATEGORY_API.ID, "productList"],
        queryFn: async () => {
            const response = await axiosInstance.get(CATEGORY_API.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },
        enabled: true,
        retry: false
    });

    return {
        refetchAllCategories: refetch,
        allCategoriesData: data?.categorys,
        isAllCategoriesPending: isLoading || isRefetching,
        isAllCategoriesError: isError,
        allCategoriesErrorDetail: error,
    };
};
