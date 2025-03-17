import { AuthProps } from "@/interfaces/auth/auth";
import { useAuthSlice } from "../slice/auth";

// Selector for Cart Items
const selectAuthState = (state: AuthProps) => state.isAuthenticate;
export const useGetAuthStatus = () => {
    return { isAuthenticated: useAuthSlice(selectAuthState) };
}

// Selector for Cart Loading State
const selectAuthMobile = (state: AuthProps) => state.mobileNumber;
export const useGetAuthMobile = () => {
    return useAuthSlice(selectAuthMobile);
}

// Selector for Cart Loading State
const selectAuthSignupToken = (state: AuthProps) => state.signUpToken;
export const useGetAuthSignUpToken = () => {
    return useAuthSlice(selectAuthSignupToken);
}

// Selector for Cart Loading State
const selectAuthToken = (state: AuthProps) => state.authToken;
export const useGetAuthToken = () => {
    return useAuthSlice(selectAuthToken);
}