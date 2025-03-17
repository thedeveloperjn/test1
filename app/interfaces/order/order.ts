import { CouponCodeData } from "../discount/coupon-code"
export interface OrderProduct {
    _id: string,
    productId: string
    hsnCode: string
    sku: number
    productName: string
    productQuantity: number
    mrp: number | string
    sellingPrice: number
    basePrice: string
    gst: number
    sgst: number
    cgst: number
    discount: number
    images: string
    variant: {
        title: string
        option: string
    }[]
}
export interface OrderDetails {
    orderStatus: string
    orderDate: string
    orderedProducts: OrderProduct[]
    orderMode: string | 'COD' | 'ONLINE'
    orderSubTotal: number
    orderCouponDiscountAmount: number
    orderDiscountAmount: number
    orderTotal: number
    orderShippingCost: number
    inputFields: {
        inputTextFields: { title: string }[];
        inputImageFields: { title: string }[];
      };
}
interface CustomerDetails {
    customerId: string
    customerName: string
    customerEmail: string
    customerNumber: string
    customerAddress: {
        addressId: string | null
        address: string
        addressType: string
        pincode: string
        landMark: string
        city: string | null
        state: string
        country: string
    }
}

interface PaymentDetails {
    paymentId: string
    paymentDate: string
    paymentStatus: string
    paymentAmount: number
    paymentMethod: string
    orderId: string
    customerId: string
}

interface DiscountDetails {
    // discountCode: string;
    // discountAmount: number;
    // discountType: string;
}

interface MediaDetails {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    campaign_id: string;
    ad_id: string;
}

interface ExchangeDetails {
    viewStatus: boolean
    isInitiated: boolean
    remarks: string
    exchangeProducts: any[] // Change this type according to your needs
}

interface ReturnDetail {
    viewStatus: boolean
    isInitiated: boolean
    returnProducts: any[] // Change this type according to your needs
}

interface CancellationDetails {
    cancelledBy: string | null
    cancelledAt: string | null
}
interface RefundDetails {
    upiDetails: {
        upiId: string | null
        upiName: string | null
    }
    bankDetails: {
        accountNumber: string | null
        accountHolderName: string | null
        bankName: string | null
        branch: string | null
        ifscCode: string | null
    }
    refundAmount: number
    refundMethod: string | null
    refundStatus: string | null
    refundDate: string | null
}


interface OrderStatusTimeline {
    updateBy: string | null
    _id: string
    status: string
    timestamp: string
}



export interface OrderData {
    orderDetails: OrderDetails
    customerDetails: CustomerDetails
    exchangeDetails: ExchangeDetails,
    returnDetails: ReturnDetail,
    paymentDetails: PaymentDetails
    discountDetails: DiscountDetails
    cancellationDetails: CancellationDetails,
    refundDetails: RefundDetails,
    mediaDetails: MediaDetails
    shiprocketOrderId: string
    shiprocketExchangeOrderId: string
    shiprocketReturnOrderId: string
    viewStatus: boolean
    _id: string
    orderId: string
    orderInvoiceNumber: string
    orderStatusTimeline: OrderStatusTimeline[]
    createdAt: string
    updatedAt: string
    __v: number
}



export interface OrderDetailsForPayload {
    productId: string;
    hsnCode: string;
    sku: number;
    productName: string;
    productQuantity: number;
    mrp: number | string;
    sellingPrice: number;
    basePrice: string;
    gst: number;
    sgst: number;
    cgst: number;
    discount: number;
    images: string;
    inputFields: {
        inputTextFields: { title: string }[];
        inputImageFields: { title: string }[];
      };
    variant: {
        title: string;
        option: string;
    }[];
}
export interface OrderPayload {
    orderDetails: OrderDetailsForPayload
    customerDetails: CustomerDetails
    paymentDetails: PaymentDetails | {}
    discountDetails: CouponCodeData | undefined
    mediaDetails: MediaDetails
}





export interface CreateOrderResponse {
    status: boolean
    code: number
    message: string
    data: OrderData
}



//=======================//
// GET ORDER DETAIL PROPS //
//=======================//


export interface CustomerOrderResponse {
    status: boolean,
    code: number,
    message: string,
    data: { data: OrderData[] }
}