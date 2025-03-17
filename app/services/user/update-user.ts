import { CreateUserPayload, VerifyOtpApiResponse } from "../../interfaces/auth/auth"
import { axiosInstance } from "../../lib/axios"
import { useAuthSlice } from "../../store/main-store"
import { AUTH_API } from "../../utils/constants/apiEndpoints"
import { useMutation } from "@tanstack/react-query"

export const useGetUpdateUser = (userID: string) => {
    const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: [AUTH_API.UPDATE_USER.ID],
        mutationFn: async ({
            email,
            name,
            address,
            pincode,
            state,
            city,
            mobileNumber,
            date,
            month,
            year,
            childName
        }: CreateUserPayload) => {
            const res = await axiosInstance.put<VerifyOtpApiResponse>(
                AUTH_API.UPDATE_USER.URL(userID),
                {
                    emailId: email,
                    name,
                    address,
                    pincode,
                    state,
                    city,
                    mobileNumber,
                    date,
                    month,
                    year,
                    childName
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )

            return res
        }
    })

    return {
        updateUserMutation: mutate,
        isUserUpdating: isPending,
        isUserUpdateError: isError,
        errorUserUpdating: isError ? error : null
    }
}