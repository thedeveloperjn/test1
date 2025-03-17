import { SendOtpApiResponse, SendOtpPayload, VerifyOtpApiResponse, VerifyOtpPayload } from "@/interfaces/auth/auth"
import { axiosInstance } from "../../lib/axios"
import { API_URL, AUTH_API } from "../../utils/constants/apiEndpoints"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetSendOtp = () => {
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: [AUTH_API.SEND_OTP.ID],
        mutationFn: async (payload: SendOtpPayload) => {
            const res = await axiosInstance.post<SendOtpApiResponse>(
                AUTH_API.SEND_OTP.URL,
                payload
            )
            return res.data
        }
    })

    return {
        OtpMutation: mutate,
        isOtpoading: isPending,
        isOtpError: isError,
        errorData: isError ? error : null
    }
}

interface ErrorData {
    message: string;
    // Define other properties if your error response includes them
}
export const useGetVerifyOtp = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isError, error } = useMutation<VerifyOtpApiResponse, AxiosError<ErrorData>, VerifyOtpPayload>({
        mutationKey: [AUTH_API.VERIFY_OTP.ID],
        mutationFn: async (payload: VerifyOtpPayload) => {
            const res = await axiosInstance.post<VerifyOtpApiResponse>(
                AUTH_API.VERIFY_OTP.URL,
                payload
            )
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['_getAllWishlist'] })
        },
        onError: (e) => { return e.response?.data }
    })

    return {
        OtpVerifyMutation: mutate,
        isOtpVerifyoading: isPending,
        isOtpVerifyError: isError,
        errorVerify: isError ? error : null
    }
}