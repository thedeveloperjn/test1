import { CouponCodePayload, CouponCodeResponse } from "../../interfaces/discount/coupon-code"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { DISCOUNT_API } from "../../utils/constants/apiEndpoints"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetCouponCode = () => {
    const accessToken = useAuthSlice((state) => state.authToken)
    const { mutate, isPending, isError, error, data } = useMutation({
        mutationKey: [DISCOUNT_API.COUPON_CODE.ID],
        mutationFn: async (cCodePayload: CouponCodePayload) => {
            const res = await axiosInstance.post<CouponCodeResponse>(
                DISCOUNT_API.COUPON_CODE.URL,
                cCodePayload,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            return res.data.data
        }
    })

    return {
        data,
        ApplyCCodeMutation: mutate,
        isApplyCCodeLoading: isPending,
        isApplyCCodeError: isError,
        error: isError ? (error as AxiosError) : null
    }
}
