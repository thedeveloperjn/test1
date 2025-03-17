interface ReviewData {
  rating: number
  status: string
  deleteStatus: boolean
  images: string[]
  isBulkUpload: boolean
  _id: string
  customerId: string
  productId: string
  message: string
  orderId: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface GetReviewResponseInterface {
  status: boolean
  code: number
  message: string
  data: ReviewData
}
