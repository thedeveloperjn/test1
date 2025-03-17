import { axiosInstance } from "@/lib/axios"
import { useAuthSlice } from "@/store/main-store"
import { PRODUCT_API } from "@/utils/constants/apiEndpoints"

export const getAllProductByCategories = async (collection: string, type: string, paramUrl: string, page: number, limit: number,) => {
    const authToken = useAuthSlice.getState().authToken
    const response = await axiosInstance.get(PRODUCT_API.PRODUCT_BY_COLLECTION_N_TYPE.URL(collection, type, paramUrl, page, limit), { headers: { Authorization: `Bearer ${authToken}` } })
    if (response)
        return response.data
    else {
        throw Error("Try Again Later")
    }
}