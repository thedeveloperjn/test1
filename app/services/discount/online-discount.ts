import { OnlineCouponResponse } from "../../interfaces/discount/online-coupon"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { DISCOUNT_API } from "../../utils/constants/apiEndpoints"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetOnlineDiscount = () => {
    const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""


    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    }: UseQueryResult<OnlineCouponResponse, AxiosError> = useQuery({
        queryKey: [DISCOUNT_API.ONLINE_DISCOUNT.ID],
        queryFn: () =>
            accessToken
                ? axiosInstance.get<OnlineCouponResponse>(
                    DISCOUNT_API.ONLINE_DISCOUNT.URL,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                )
                : null
    })

    return {
        couponOnlineData: data?.data ?? null,
        iscouponOnlineLoading: isLoading,
        iscouponOnlineError: isError,
        error: isError ? error : null,
        couponRefetch: refetch
    }
}