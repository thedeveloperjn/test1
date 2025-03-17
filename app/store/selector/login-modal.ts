
import { loginModalProps } from "@/interfaces/auth/login-popup";
import { useLoginModalSlice } from "../slice/login-popup";

// Selector for Cart Items
const selectLoginModalState = (state: loginModalProps) => state.loginModalState;
export const useGetLoginModalState = () => {
    return useLoginModalSlice(selectLoginModalState);
}

