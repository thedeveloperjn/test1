
import { getPincodeResponse } from '../../interfaces/pincode/pincode'
import { axiosInstance } from '../../lib/axios'
import { PINCODE_API } from '../../utils/constants/apiEndpoints'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'



export const useGetPincodeDetails = (pincode: string) => {
    const {
        data,
        isLoading,
        isError,
        error,
        refetch
    }: UseQueryResult<getPincodeResponse, AxiosError> = useQuery({
        queryKey: [PINCODE_API.ID, pincode],
        queryFn: () =>
            fetch(PINCODE_API.GET_PINCODE_DETAILS_API(pincode)),
        enabled: false
    })

    return {
        pincodeData: data ?? null,
        isPincodeLoading: isLoading,
        isPincodeError: isError,
        error: isError ? error : null,
        pincodeRefetch: refetch
    }
}
