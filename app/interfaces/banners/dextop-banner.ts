

export interface Banner {
    bannerVideo: string;
    fileType: "ATTACH_VIDEO" | "ATTACH_IMAGE";
    status: string;
    _id: string;
    bannerImage: string;
    bannerTitle: string;
    bannerSubtitle: string;
    link: string;
    bannerType: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface BannerResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    banners: Banner[];
}

//     const { data, mutate, isPending, isError } = useMutation<
//         CheckemailmobileApiResponse,
//         Error,
//         CheckemailmobileApiPayload
//     >({
//         mutationKey: [API_CONFIG.AUTH.CHECK_MOBILE.ID],
//         mutationFn: async (
//             payload: CheckemailmobileApiPayload
//         ): Promise<CheckemailmobileApiResponse> => {
//             const response = await axiosInstance.post(
//                 API_CONFIG.AUTH.CHECK_MOBILE.URL,
//                 payload
//             );
//             return response.data;
//         },
//     });

//     return {
//         emailMobileData: data,
//         checkEmailMobileMutation: mutate,
//         isEmailMobileLoading: isPending,
//         isEmailMobileError: isError,
//     };
// };