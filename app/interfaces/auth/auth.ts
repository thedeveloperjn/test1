export interface AuthProps {
    isInitial: boolean
    isAuthenticate: boolean,
    loginOTP: number | null,
    mobileNumber: string | null,
    authToken: string | null,
    isRegistered: boolean
    signUpToken: string | null

}

export interface SendOtpPayload {
    mobileNumber: string
}
export interface SendOtpApiResponse {
    status: boolean,
    code: number,
    message: string
}

export interface VerifyOtpPayload { mobileNumber: number; otp: number }
export interface VerifyOtpApiResponse {
    status: boolean,
    code: number,
    message: string,
    isRegistered: boolean,
    signupToken: string
    data: UserData

}


export interface CreateUserPayload {
    name: string
    email: string
    pincode: string
    city: string
    state: string
    address: string
    mobileNumber: string
    date: number | string
    month: number | string
    year: number | string
    childName: string
    childDateOfBirth?: string
}

export interface UserData {
    _id: string | null;
    name: string | null;
    mobileNumber: string | null;
    emailId: string | null;
    status: string | null;
    address: string | null;
    city: string | null;
    pincode: string | null;
    state: string | null;
    accessToken: string | null;
    childName: string | null;
    date: string | null;
    year: string | null;
    month: string | null;
    childDateOfBirth: string | null;
}



export interface SignupAPIResponse {
    status: boolean;
    message: string;
    isRegistered: boolean;
    data: UserData;
}

export interface userDetailAPIResponse {
    status: boolean;
    code: number;
    data: UserData;
}
