import { LookbookAPIResponse } from "@/interfaces/lookbook/lookbook";
import { axiosInstance } from "@/lib/axios";
import { LOOKBOOK_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";

// All Dextop Banner
export const getAllLookbook = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<LookbookAPIResponse, Error>({
        queryKey: [LOOKBOOK_API.ID, "ee"],
        queryFn: async () => {
            const response = await axiosInstance.get(LOOKBOOK_API.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllLookBook: refetch,
        allLookBookData: data?.data,
        isAllLookBookPending: isLoading || isRefetching,
        isAllLookBookError: isError,
        allLookBookErrorDetail: error,
    };
};