
import { useMutation } from '@tanstack/react-query'
import { IOrder } from '../../interfaces/payment/razorPayOrderRespponse'
import { axiosInstance } from '../../lib/axios'
import { useAuthSlice } from '../../store/main-store'

export const useGetOrder = () => {
  const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['_addWishlist'],
    mutationFn: async (amount: number) => {
      const res = await axiosInstance.post<IOrder>(
        `/razorpay/pay`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      return res.data
    }
  })

  return {
    orderMutation: mutate,
    isOrderLoading: isPending,
    isOrderIdError: isError,
    error: isError ? error : null
  }
}
