import { CustomerOrderResponse } from "../../interfaces/order/order"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { ORDER_API } from "../../utils/constants/apiEndpoints"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetAllOrders = () => {
    const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""

    const {
        data,
        isLoading,
        isError,
        error
    }: UseQueryResult<CustomerOrderResponse, AxiosError> = useQuery({
        queryKey: [ORDER_API.ORDER_DETAIL.ID],
        queryFn: () =>
            axiosInstance.get<CustomerOrderResponse>(ORDER_API.ORDER_DETAIL.URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
    })

    return {
        orderData: data?.data?.data ?? null,
        isOrderLoading: isLoading,
        isOrderError: isError,
        error: isError ? error : null
    }
}
