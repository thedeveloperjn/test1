import { CategoryResponse } from "../../interfaces/categories/caegory";
import { getAllOcassionResponse } from "../../interfaces/occassion/occassion";
import { axiosInstance } from "../../lib/axios";
import { OCCASSION_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Dextop Banner
export const getAllOccassions = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<getAllOcassionResponse, Error>({
        queryKey: [OCCASSION_API.ID, "productList"],
        queryFn: async () => {
            const response = await axiosInstance.get(OCCASSION_API.URL)
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
        refetchAllOccassions: refetch,
        allOccassionsData: data?.data,
        isAllOccassionsPending: isLoading || isRefetching,
        isAllOccassionsError: isError,
        allOccassionsErrorDetail: error,
    };
};
