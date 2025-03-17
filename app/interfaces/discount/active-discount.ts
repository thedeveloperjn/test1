import { Category } from "../categories/caegory"

export interface ActiveDiscountInterface {
    _id: string
    minimumBuyQuantity: number
    minimumBuyPurchaseAmt: number
    selectedBuyProducts: any[]
    selectedBuyCategories: any[]
    getQuantity: number
    selectedGetProducts: any[]
    selectedGetCategories: any[]
    atDiscountAmount: number
    atDiscountAmountPercent: number
    discountValuePercent: number
    discountValueAmount: number
    selectedAppliesProducts: any[]
    selectedAppliesCategories: Category[]
    minimumPurchaseAmount: number
    minimumPurchaseQuantity: number
    deletedStatus: boolean
    status: string
    discountType: string
    discountMethod: string
    discountCode: string
    discountTitle: string
    discountMainTitle: string
    discountCategory: string
    customerBuy: string
    buyItem: string
    getItem: string
    atDiscountedValue: string
    appliesItem: string
    discountValueType: string
    minimumPurchaseRequirement: string
    maximumDiscountUses: string
    startDate: string
    startTime: string
    endDate: string
    endTime: string
    createdAt: string
    updatedAt: string
    __v: number
    startDateFormatted: string
    endDateFormatted: string
    startTimeFormatted: string
    endTimeFormatted: string
    finalDiscountAmount: number
}