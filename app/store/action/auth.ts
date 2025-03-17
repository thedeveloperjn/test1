import { removeSession } from '../../lib/session';
import Cookies from 'js-cookie';
import { useAuthSlice } from "../slice/auth";
import { useUserSlice } from "../slice/user";
import { changeLoginModalType } from './login-modal';
import { toast } from 'react-toastify';
export const changeAuthMobileNumber = (state: string | null) => useAuthSlice.setState({ mobileNumber: state })
export const changeAuthStatus = (state: boolean) => useAuthSlice.setState({ isAuthenticate: state })
export const changeSignupToken = (token: string | null) => useAuthSlice.setState({ signUpToken: token })
export const changeAuthToken = (token: string | null) => useAuthSlice.setState({ authToken: token })

export const checkInitials = () => {
    const isInitial = useAuthSlice.getState().isInitial
    const sessionToken = Cookies.get('session');
    if (!sessionToken) {
        useAuthSlice.setState({ authToken: null, isAuthenticate: false })
        useUserSlice.setState({
            _id: null,
            name: null,
            mobileNumber: null,
            emailId: null,
            status: null,
            address: null,
            city: null,
            pincode: null,
            state: null,
            accessToken: null,
            childName: null,
            date: null,
            year: null,
            month: null,
            childDateOfBirth: null,
        })
        changeLoginModalType("MOBILE_INPUT")
        changeAuthStatus(false);
        changeAuthToken(null);
        removeSession();

        if (isInitial) {
            // toast.warning("Session Time out")
            useAuthSlice.setState({ isInitial: false })
        }
    }


}
