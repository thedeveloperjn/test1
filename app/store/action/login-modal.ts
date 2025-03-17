
// setIsLoading: (isLoading) => set({ isLoading }),

import { loginState } from "@/interfaces/auth/login-popup"
import { useLoginModalSlice } from "../slice/login-popup"



export const changeLoginModalType = (state: loginState) => useLoginModalSlice.setState({ loginModalState: state })


