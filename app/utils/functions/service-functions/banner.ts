import { Banner, BannerResponse } from "@/interfaces/banners/dextop-banner"
import { axiosInstance } from "@/lib/axios"
import { BANNERS_API } from "@/utils/constants/apiEndpoints"

export const getAllDextopBanner = async () => {
    const response = await axiosInstance.get<BannerResponse>(BANNERS_API.DEXTOP.HOME_BANNER.URL)
    if (response)
        return response.data.banners as Banner[]
    else {
        throw Error("Try Again Later")
    }
}