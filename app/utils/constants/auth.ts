import { AuthProps } from "../../interfaces/auth/auth";

export const AUTH_INITIAL_STATE: AuthProps = {
    isInitial: true,
    authToken: null,
    isAuthenticate: false,
    loginOTP: null,
    mobileNumber: null,
    isRegistered: false,
    signUpToken: null
}