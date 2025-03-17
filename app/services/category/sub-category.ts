import { SubcategoryResponse } from "../../interfaces/categories/sub-category";
import { axiosInstance } from "../../lib/axios";
import { CATEGORY_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Dextop Banner
export const getAllSubCategoryBySlug = (slug: string) => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<SubcategoryResponse, Error>({
        queryKey: [CATEGORY_API.SUB_CATEGORY.ID, slug],
        queryFn: async () => {
            const response = await axiosInstance.get(CATEGORY_API.SUB_CATEGORY.URL(slug))
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
        refetchAllSubCategoryBySlug: refetch,
        allSubCategoryBySlugData: data?.subcategory,
        isAllSubCategoryBySlugPending: isLoading || isRefetching,
        isAllSubCategoryBySlugError: isError,
        allSubCategoryBySlugErrorDetail: error,
    };
};
