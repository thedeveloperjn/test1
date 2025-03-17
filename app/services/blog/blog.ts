
import { BlogResponse } from "@/interfaces/blog/blog";
import { axiosInstance } from "@/lib/axios";
import { BLOG_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Product By Type
export const getAllBlog = (page: number, limit: number) => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BlogResponse, Error>({
        queryKey: [BLOG_API.ID],
        queryFn: async () => {
            const response = await axiosInstance.get(BLOG_API.URL(page, limit))
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllBlog: refetch,
        allBlogData: data?.data,
        isAllBlogPending: isLoading || isRefetching,
        isAllBlogError: isError,
        allBlogErrorDetail: error,
    };
};

export const getBlogOne = (slug: string) => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BlogResponse, Error>({
        queryKey: [BLOG_API.BLOG_ONE.ID],
        queryFn: async () => {
            const response = await axiosInstance.get(BLOG_API.BLOG_ONE.URL(slug))
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchBlogOne: refetch,
        oneBlogData: data?.data,
        isBlogOnePending: isLoading || isRefetching,
        isBlogOneError: isError,
        allBlogErrorDetail: error,
    };
};