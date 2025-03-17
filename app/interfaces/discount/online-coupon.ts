export interface OnlineCouponResponse {
    status: boolean
    code: number
    count: number
    message: string
    data: {
        onlinePaymentDiscount: boolean
        discount: number
        data: {
            onlinePaymentDiscount: boolean
            discount: number
        }

    }
}
