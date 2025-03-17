import { ProductReviewResponse, reviewPayloadInterface } from "@/interfaces/review/review"
import { GetReviewResponseInterface } from "@/interfaces/review/reviewInterface"
import { axiosInstance } from "@/lib/axios"
import { useAuthSlice } from "@/store/main-store"
import { REVIEW_API } from "@/utils/constants/apiEndpoints"
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface query {
  productId: string
  page: number
  limit: number
}
export const useGetReviewById = ({ productId, page, limit }: query) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch
  }: UseQueryResult<ProductReviewResponse, AxiosError> = useQuery({
    queryKey: ['_getReviewById', productId],
    queryFn: () =>
      axiosInstance.get<ProductReviewResponse>(
        REVIEW_API.REVIEW_BY_ID(productId, page, limit)
      ),
    enabled: false
  })

  return {
    reviewData: data ?? null,
    isProductLoading: isLoading,
    isProductError: isError,
    error: isError ? error : null,
    refetchReview: refetch
  }
}

export const useAddProductReview = () => {

  const accessToken = useAuthSlice((state) => state.authToken)
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['_reviewProduct'],
    mutationFn: async (formData: reviewPayloadInterface) => {
      const form = new FormData()
      form.append('orderId', formData?.orderId)
      form.append('productId', formData?.productId)
      form.append('message', formData?.message)
      const ratingBlob = new Blob([formData?.rating.toString()], {
        type: 'text/plain'
      })
      form.append('rating', ratingBlob)
      if (formData?.images) {
        for (let i = 0; i < formData?.images.length; i++) {
          form.append('images', formData?.images[i])
        }
      }
      const response = await axiosInstance.post<GetReviewResponseInterface>(
        REVIEW_API.ADD_REVIEW.URL,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      return response.data
    }
  })

  return {
    reviewProductMutate: mutate,
    reviewSubmitting: isPending,
    isReviewProductError: isError,
    error: isError ? error : null
  }
}

export const useUpdateProductReview = () => {

  const accessToken = useAuthSlice((state) => state.authToken)
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['_reviewProduct'],
    mutationFn: async (formData: reviewPayloadInterface) => {
      const form = new FormData()
      form.append('orderId', formData?.orderId)
      form.append('productId', formData?.productId)
      form.append('message', formData?.message)
      const ratingBlob = new Blob([formData?.rating.toString()], {
        type: 'text/plain'
      })
      form.append('rating', ratingBlob)
      if (formData?.images) {
        for (let i = 0; i < formData?.images.length; i++) {
          form.append('images', formData?.images[i])
        }
      }
      const response = await axiosInstance.put<GetReviewResponseInterface>(
        REVIEW_API.UPDATE_REVIEW.URL(formData?.productId),
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      return response.data
    }
  })

  return {
    updateRreviewProductMutate: mutate,
    updateReviewSubmitting: isPending,
    isUpdateReviewProductError: isError,
    error: isError ? error : null
  }
}
