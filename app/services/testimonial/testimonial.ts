import { TestimonialResponse } from "@/interfaces/testimonial/testimonial";
import { axiosInstance } from "@/lib/axios";
import { TESTIMONIAL_API } from "@/utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Product By Type
export const getAllTestimonial = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<TestimonialResponse, Error>({
        queryKey: [TESTIMONIAL_API.ID],
        queryFn: async () => {
            const response = await axiosInstance.get(TESTIMONIAL_API.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllTestimonial: refetch,
        allTestimonialData: data?.testimonials,
        isAllTestimonialPending: isLoading || isRefetching,
        isAllTestimonialError: isError,
        allTestimonialErrorDetail: error,
    };
};
