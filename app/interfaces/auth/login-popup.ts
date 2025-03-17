export type loginState = "MOBILE_INPUT" | "LOGIN_OTP_INPUT" | "MOBILE_INPUT_CHECKOUT" | "LOGIN_OTP_INPUT_CHECKOUT" | "SIGNUP_OTP_INPUT" | "SIGNUP_MODAL" | null
export interface loginModalProps {
    loginModalState: loginState
}