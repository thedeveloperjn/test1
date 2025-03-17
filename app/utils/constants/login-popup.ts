import { loginModalProps, loginState } from "@/interfaces/auth/login-popup"

export const LOGIN_MODAL_TYPE = {
    MOBILE_INPUT: "MOBILE_INPUT",
    LOGIN_OTP_INPUT: "LOGIN_OTP_INPUT",
    SIGNUP_OTP_INPUT: "SIGNUP_OTP_INPUT",
    SIGNUP_MODAL: "SIGNUP_MODAL",
    MOBILE_INPUT_CHECKOUT: "MOBILE_INPUT",
    LOGIN_OTP_INPUT_CHECKOUT: "LOGIN_OTP_INPUT_CHECKOUT",

}
export const LOGIN_MODAL_INITIAL_STATE: loginModalProps = {
    loginModalState: null
}