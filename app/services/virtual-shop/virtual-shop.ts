import { VirtualShopPayload } from "@/interfaces/virtual-form/virtual-form"
import { axiosInstance } from "@/lib/axios"
import { useAuthSlice } from "@/store/main-store"
import { VIRTUAL_SHOP_FORM_API } from "@/utils/constants/apiEndpoints"
import { useMutation } from "@tanstack/react-query"

interface responseForVirtualShop {

    "status": boolean,
    "code": number,
    "message": string

}

export const useGetVirtualShop = () => {
    const accessToken = useAuthSlice.getState().authToken ? useAuthSlice.getState().authToken : ""
    const { mutate, isPending, isError, error } = useMutation({
        mutationKey: [VIRTUAL_SHOP_FORM_API.ID],
        mutationFn: async ({
            categories,
            name,
            contactNo,
            emailId,
            city,
            priceRange,
            remarks,
            preferedDate, // ISO date string
            timeSlot, // ISO date string
        }: VirtualShopPayload) => {
            const res = await axiosInstance.post<responseForVirtualShop>(
                VIRTUAL_SHOP_FORM_API.URL,
                {
                    categories,
                    name,
                    contactNo,
                    emailId,
                    city,
                    priceRange,
                    remarks,
                    preferedDate, // ISO date string
                    timeSlot,
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )

            return res
        }
    })

    return {
        virtualShopMutation: mutate,
        isVirtualShopPending: isPending,
        isVirtualShopError: isError,
        errorVirtualShopError: isError ? error : null
    }
}