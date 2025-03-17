import { BannerResponse } from "../../interfaces/banners/dextop-banner";
import { axiosInstance } from "../../lib/axios";
import { BANNERS_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";
// All Dextop Banner
export const getAllDextopBanner = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BannerResponse, Error>({
        queryKey: [BANNERS_API.DEXTOP.HOME_BANNER.ID, "ee"],
        queryFn: async () => {
            const response = await axiosInstance.get(BANNERS_API.DEXTOP.HOME_BANNER.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllDextopBanner: refetch,
        allDextopBannerData: data?.banners,
        isAllDextopBannerPending: isLoading || isRefetching,
        isAllDextopBannerError: isError,
        allDextopBannerErrorDetail: error,
    };
};


// All Dextop Banner
export const getAllDextopPromoBanner = () => {
    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BannerResponse, Error>({
        queryKey: [BANNERS_API.DEXTOP.PROMO_BANNER.ID, "promo"],
        queryFn: async () => {
            const response = await axiosInstance.get(BANNERS_API.DEXTOP.PROMO_BANNER.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllDextopPromoBanner: refetch,
        allDextopPromoBannerData: data?.banners,
        isAllDextopPromoBannerPending: isLoading || isRefetching,
        isAllDextopPromoBannerError: isError,
        allDextopPromoBannerErrorDetail: error,
    };
};
