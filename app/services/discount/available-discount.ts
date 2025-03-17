import { axiosInstance } from "../../lib/axios"
import { useAuthSlice, useCartSlice } from "../../store/main-store"
import { DISCOUNT_API } from "../../utils/constants/apiEndpoints"
import localStorageAvailable from "/utils/functions/localStorageAvailable"
import { useQuery } from "@tanstack/react-query"

export const useGetAllActiveDiscount = () => {
    const authtoken = useAuthSlice((state) => state.authToken)
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [DISCOUNT_API.ACTIVE_DISCOUNT.ID],
        queryFn: async () => {
            let response
            if (authtoken) {
                response = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL, {
                    headers: {
                        Authorization: `Bearer ${authtoken}`
                    }
                })
            }
            else {
                response = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
            }
            console.log("RESPONSE : ", response.data)
            return response


        },
        enabled: true
    })

    return {
        activeDiscountsData: data?.data,
        isActiveDiscountsLoading: isLoading,
        isActiveDiscountsError: isError,
        error: isError ? error : null,
        couponRefetch: refetch
    }
}