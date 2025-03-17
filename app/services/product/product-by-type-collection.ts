import { ProductsByTypeApiResponse } from "@/interfaces/product/product";
import { axiosInstance } from "@/lib/axios";
import { useAuthSlice } from "@/store/main-store";
import { PRODUCT_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Product By Type And Category
export const getAllProductsByTypeCollection = (collection: string, type: string, paramUrl: string, page: number, limit: number,) => {
    const authToken = useAuthSlice.getState().authToken
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<ProductsByTypeApiResponse, Error>({
        queryKey: [PRODUCT_API.PRODUCT_BY_COLLECTION_N_TYPE.ID, type],
        queryFn: async () => {
            const response = await axiosInstance.get(PRODUCT_API.PRODUCT_BY_COLLECTION_N_TYPE.URL(collection, type, paramUrl, page, limit), { headers: { Authorization: `Bearer ${authToken}` } })
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false,

    });

    return {
        ProductStatus: data,
        refetchAllProductsByTypeCollection: refetch,
        allProductsByTypeCollectionData: data?.data,
        isAllProductsByTypeCollectionPending: isLoading || isRefetching,
        isAllProductsByTypeCollectionError: isError,
        allProductsByTypeCollectionErrorDetail: error,
    };
};
