import { ProductsByTypeApiResponse } from "../../interfaces/product/product";
import { axiosInstance } from "../../lib/axios";
import { useAuthSlice } from "../../store/main-store";
import { PRODUCT_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Product By Type
export const getAllProductsByType = (type: string, page: number, limit: number) => {
    const authToken = useAuthSlice.getState().authToken
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<ProductsByTypeApiResponse, Error>({
        queryKey: [PRODUCT_API.PRODUCT_BY_TYPE.ID, type],
        queryFn: async () => {
            const response = await axiosInstance.get(PRODUCT_API.PRODUCT_BY_TYPE.URL(type, page, limit), { headers: { Authorization: `Bearer ${authToken}` } })
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllProductsByType: refetch,
        allProductsByTypeData: data?.data,
        isAllProductsByTypePending: isLoading || isRefetching,
        isAllProductsByTypeError: isError,
        allProductsByTypeErrorDetail: error,
    };
};
