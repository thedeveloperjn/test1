import { ProductsByTypeApiResponse } from "@/interfaces/product/product";
import { axiosInstance } from "@/lib/axios";
import { useAuthSlice } from "@/store/main-store";
import { PRODUCT_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Product By Type And Category
export const getAllProductsByTypeCategory = (type: string, page: number, limit: number, category: string) => {
    const authToken = useAuthSlice.getState().authToken
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<ProductsByTypeApiResponse, Error>({
        queryKey: [PRODUCT_API.PRODUCT_BY_TYPE_N_CATEGORY.ID, type],
        queryFn: async () => {
            const response = await axiosInstance.get(PRODUCT_API.PRODUCT_BY_TYPE_N_CATEGORY.URL(type, page, limit, category), { headers: { Authorization: `Bearer ${authToken}` } })
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllProductsByTypeCategory: refetch,
        allProductsByTypeCategoryData: data?.data,
        isAllProductsByTypeCategoryPending: isLoading || isRefetching,
        isAllProductsByTypeCategoryError: isError,
        allProductsByTypeCategoryErrorDetail: error,
    };
};
