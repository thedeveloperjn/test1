import { useAuthSlice } from "../slice/auth"

export const useGetAuthStatus = () => {
    const isAuthenticated = useAuthSlice((state) => state.isAuthenticate)
    const user = useAuthSlice((state) => state.authToken)

    return { isAuthenticated, user }
}
