import { BannerResponse } from "../../interfaces/banners/dextop-banner";
import { axiosInstance } from "../../lib/axios";
import { BANNERS_API } from "../../utils/constants/apiEndpoints";
import { useQuery } from "@tanstack/react-query";

// All Dextop Banner
export const getAllMobileBanner = () => {


    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BannerResponse, Error>({
        queryKey: [BANNERS_API.MOBILE.HOME_BANNER.ID, "ww"],
        queryFn: async () => {
            const response = await axiosInstance.get(BANNERS_API.MOBILE.HOME_BANNER.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllMobileBanner: refetch,
        allMobileBannerData: data?.banners,
        isAllMobileBannerPending: isLoading || isRefetching,
        isAllMobileBannerError: isError,
        allMobileBannerErrorDetail: error,
    };
};


// All Dextop Banner
export const getAllMobilePromoBanner = () => {


    const { isError, error, data, isLoading, refetch, isRefetching } = useQuery<BannerResponse, Error>({
        queryKey: [BANNERS_API.MOBILE.PROMO_BANNER.ID, "promo"],
        queryFn: async () => {
            const response = await axiosInstance.get(BANNERS_API.MOBILE.PROMO_BANNER.URL)
            if (response)
                return response.data
            else {
                throw Error("Try Again Later")
            }
        },

        retry: false
    });

    return {
        refetchAllMobilePromoBanner: refetch,
        allMobilePromoBannerData: data?.banners,
        isAllMobilePromoBannerPending: isLoading || isRefetching,
        isAllMobilePromoBannerError: isError,
        allMobilePromoBannerErrorDetail: error,
    };
};