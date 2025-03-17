export interface CouponCodePayload {
  code: string
  amount: number
  quantity: number
}
export interface CouponCodeData {
  discountOnlinePayment?: number
  name?: string
  code?: string
  type?: string
  usingTime?: string
  amount?: number
  startDate?: string
  endDate?: string
  status?: string
}

export interface CouponCodeResponse {
  status: boolean
  code: number
  data: CouponCodeData
}

export interface CouponCodeErrorResponse {
  status: boolean
  code: number
  message: string
}
