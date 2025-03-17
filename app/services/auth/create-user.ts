
import { CreateUserPayload, SignupAPIResponse } from '../../interfaces/auth/auth'
import { axiosInstance } from '../../lib/axios'
import { AUTH_API } from '../../utils/constants/apiEndpoints'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
export const createUserService = () => {
    const queryClient = useQueryClient()
    const { mutate, isPending, isError, error } = useMutation<SignupAPIResponse, AxiosError<{ message: string }>, { userDetail: CreateUserPayload, signupToken: string }>({
        mutationKey: [AUTH_API.SIGNUP.ID],
        mutationFn: async ({
            userDetail,
            signupToken
        }: { userDetail: CreateUserPayload, signupToken: string }) => {
            const response = await axiosInstance.post<SignupAPIResponse>(
                AUTH_API.SIGNUP.URL,
                {
                    ...userDetail
                },
                {
                    headers: { Authorization: `Bearer ${signupToken}` }
                }
            )
            return response?.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['_getAllWishlist'] })
        },
    })

    return {
        CreateUserMutation: mutate,
        isUserCreating: isPending,
        isUserCreateError: isError,
        errorUserCreating: isError ? error : null
    }
}
// export const useGetUpdateUser = () => {
//     const { updateUser } = useAuthStore()
//     const { mutate, isPending, isError, error } = useMutation({
//         mutationKey: ['_GettUpdateUser'],
//         mutationFn: async ({
//             email,
//             name,
//             address,
//             pincode,
//             state,
//             city,
//             mobile,
//             date,
//             month,
//             year,
//             childName
//         }: DeliveryFormData) => {
//             const res = await updateUser({
//                 email,
//                 name,
//                 address,
//                 pincode,
//                 state,
//                 city,
//                 mobile,
//                 date,
//                 month,
//                 year,
//                 childName
//             })

//             return res
//         }
//     })

//     return {
//         updateUserMutation: mutate,
//         isUserUpdating: isPending,
//         isUserUpdateError: isError,
//         errorUserUpdating: isError ? error : null
//     }
// }
