import { CollectionsResponse, SubcategoryResponse } from "@/interfaces/categories/sub-category";
import { axiosInstance } from "@/lib/axios";
import { CATEGORY_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const getAllCollections = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<CollectionsResponse, AxiosError<{ message: string }>>({
        queryKey: [CATEGORY_API.COLLECTIONS.ID],
        queryFn: async () => {
            const response = await axiosInstance.get(CATEGORY_API.COLLECTIONS.URL)
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
        refetchAllCollections: refetch,
        allCollectionsData: data?.data,
        isAllCollectionsPending: isLoading || isRefetching,
        isAllCollectionsError: isError,
        allCollectionsErrorDetail: error,
    };
};