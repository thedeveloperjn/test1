import { EnquiryAPIResponse, EnquiryProps } from "@/interfaces/enquiry/enquiry"
import { axiosInstance } from "@/lib/axios"
import { ENQUIRY_API } from "@/utils/constants/apiEndpoints"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const getEnquiryService = () => {

    const { mutate, isPending, isError, error } = useMutation<EnquiryAPIResponse, AxiosError<{ message: string }>, EnquiryProps>({
        mutationKey: [ENQUIRY_API.ID],
        mutationFn: async (EnquiryDetails: EnquiryProps) => {
            const response = await axiosInstance.post<EnquiryAPIResponse>(
                ENQUIRY_API.URL,
                {
                    ...EnquiryDetails
                },
            )
            return response?.data
        },
    })

    return {
        enquiryMutation: mutate,
        isEnquiring: isPending,
        isEnquiryError: isError,
        errorEnquiring: isError ? error : null
    }
}