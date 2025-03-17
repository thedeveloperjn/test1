import { CreateOrderResponse, OrderPayload } from "../../interfaces/order/create-order"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { ORDER_API } from "../../utils/constants/apiEndpoints"
import { useMutation } from "@tanstack/react-query"

export const useCreateOrder = () => {
    const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""

    const { data, mutate, isPending, isError, error } = useMutation({
        mutationKey: [ORDER_API.CREATE_ORDER.ID],
        mutationFn: async (orderPayload: OrderPayload) => {
            const res = await axiosInstance.post<CreateOrderResponse>(
                ORDER_API.CREATE_ORDER.URL,
                orderPayload,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            )
            return res.data.data
            console.log("Response data of create order : ", res)
        }
    })

    return {
        orderData: data,
        OrderMutation: mutate,
        isOrderLoading: isPending,
        isOrderError: isError,
        error: isError ? error : null
    }
}