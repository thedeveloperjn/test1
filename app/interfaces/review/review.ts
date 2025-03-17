// File: src/types/productReviewResponseInterface.ts

export interface Customer {
  name: string
  __v?: number
}

export interface Review {
  rating: number
  images: string[]
  message: string
  __v?: number
  customers: Customer[]
  postedBy: string
}

export interface TotalReviewsData {
  averageRating: string
  fiveStar: number
  fourStar: number
  threeStar: number
  twoStar: number
  oneStar: number
}

export interface ReviewsData {
  data: any
  totalReviews: any
  reviews: Review[]
  totalReviewsData: TotalReviewsData
}

export interface ProductReviewResponse {
  status: boolean
  code: number
  message: string
  totalReviews: number
  data: ReviewsData
}

export interface reviewPayloadInterface {
  productId: string
  message: string
  rating: number
  images: FileList
  orderId: string
}
