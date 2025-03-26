import { CategoryResponse } from "../../interfaces/categories/caegory";
import { getAllColorFamilyResponse } from "../../interfaces/color/color-family";
import { getAllOcassionResponse } from "../../interfaces/occassion/occassion";
import { axiosInstance } from "../../lib/axios";
import { COLOR_FAMILY_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Dextop Banner
export const getAllColorFamily = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<getAllColorFamilyResponse, Error>({
        queryKey: [COLOR_FAMILY_API.ID, "productList"],
        queryFn: async () => {
            const response = await axiosInstance.get(COLOR_FAMILY_API.URL)
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
        refetchAllColorFamily: refetch,
        allColorFamilyData: data?.data,
        isAllColorFamilyPending: isLoading || isRefetching,
        isAllColorFamilyError: isError,
        allColorFamilyErrorDetail: error,
    };
};
