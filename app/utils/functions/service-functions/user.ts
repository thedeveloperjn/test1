import { UserData, userDetailAPIResponse } from "@/interfaces/auth/auth"
import { axiosInstance } from "@/lib/axios"
import { USER_API } from "@/utils/constants/apiEndpoints"

export const getallUserDetail = async (_id: string) => {
    const response = await axiosInstance.get<userDetailAPIResponse>(USER_API.URL(_id))
    if (response)
        return response.data.data as UserData
    else {
        throw Error("Try Again Later")
    }
}