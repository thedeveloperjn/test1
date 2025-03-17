import { Product } from "../../interfaces/product/product"
import { AddToWishlistApiResponseProps } from "../../interfaces/wishlist/wishlist"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { useUserSlice } from "../../store/slice/user"
import { PRODUCT_API, WISHLIST_API } from "../../utils/constants/apiEndpoints"
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import { AxiosError } from "axios"

interface wishlistResponseInterface {
    data: {
        data: { _id: string, image: string, product: Product }[]
        "status": string,
        "code": number,
        "currentPage": number,
        "totalPages": number,
        "totalItems": number,
    }
}

export const useGetAllWishlist = () => {
    const authToken = useAuthSlice.getState().authToken
    const userId = useUserSlice.getState()._id
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    }: UseQueryResult<wishlistResponseInterface, AxiosError> = useQuery({
        queryKey: ['_getAllWishlist'],
        queryFn: () =>
            axiosInstance.get<wishlistResponseInterface>(
                '/wishlist/list',
                authToken && userId
                    ? {
                        headers: { Authorization: `Barear ${authToken}` }
                    }
                    : {}
            )
    })

    return {
        wishlistData: data?.data?.data ?? null,
        isWishlistLoading: isLoading,
        isWishlistError: isError,
        error: isError ? error : null,
        refetchWishlist: refetch
    }
}


export const useAddToWishlist = () => {
    const queryClient = useQueryClient();
    const authToken = useAuthSlice.getState().authToken
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: ['_addWishlist'],
        mutationFn: async (id: string) => {
            const res = await axiosInstance.post<AddToWishlistApiResponseProps, AxiosError>(
                `/wishlist/add-remove/${id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            )
            return res.message
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['_getAllWishlist'] })
            queryClient.invalidateQueries({ queryKey: [PRODUCT_API.PRODUCT_ONE_BY_SLUG.ID] })
            queryClient.invalidateQueries({ queryKey: [PRODUCT_API.PRODUCT_BY_TYPE.ID] })

        }
    })

    return {
        WishListAddMutation: mutate,
        isWishIstLoading: isPending,
        isWishlistError: isError,
        error: isError ? error : null
    }
}

export const useRemoveFromWishlist = () => {
    const queryClient = useQueryClient();
    const authToken = useAuthSlice.getState().authToken
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: [WISHLIST_API.REMOVE_WISHLIST_PRODUCT.ID],
        mutationFn: async (id: string) => {
            const res = await axiosInstance.post<AddToWishlistApiResponseProps, AxiosError>(
                `/wishlist/add-remove/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            )
            return res.message
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['_getAllWishlist'] })
            queryClient.invalidateQueries({ queryKey: [PRODUCT_API.PRODUCT_ONE_BY_SLUG.ID] })
            queryClient.invalidateQueries({ queryKey: [PRODUCT_API.PRODUCT_BY_TYPE.ID] })

        }
    })

    return {
        WishListRemoveMutation: mutate,
        isWishIstLoading: isPending,
        isWishlistError: isError,
        error: isError ? error : null
    }
}
