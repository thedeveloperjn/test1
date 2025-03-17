import { CouponCodeData } from "../discount/coupon-code"

interface OrderDetails {
    orderedProducts: {
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
        inputFields: {
            inputTextFields: { title: string }[];
            inputImageFields: { title: string }[];
          };
        variant: {
            title: string
            option: string
        }[]
    }[]
    orderMode: string | 'COD' | 'ONLINE'
    orderSubTotal: number
    orderCouponDiscountAmount: number
    orderDiscountAmount: number
    orderTotal: number
    orderShippingCost: number
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
    // utm_source: string;
    // utm_medium: string;
    // utm_campaign: string;
    // utm_content: string;
    // campaign_id: string;
    // ad_id: string;
}
export interface OrderPayload {
    orderDetails: OrderDetails
    customerDetails: CustomerDetails
    paymentDetails: PaymentDetails | {}
    discountDetails: CouponCodeData | undefined
    mediaDetails: MediaDetails
}


export interface CreateOrderResponse {
    status: boolean
    code: number
    message: string
    data: {
        orderDetails: {
            orderDiscountAmount: number
            orderCouponDiscountAmount: number
            orderShippingCost: number
            orderShippingMethod: string
            orderDate: string
            orderedProducts: {
                basePrice: number
                gst: number
                sgst: number
                cgst: number
                discount: number
                images: string[]
                inputFields: {
                    inputTextFields: { title: string }[];
                    inputImageFields: { title: string }[];
                  };
                variant: {
                    title: string
                    option: string
                }[]
                _id: string
                productId: string
                hsnCode: string
                sku: string
                productQuantity: number
                mrp: number | string
                sellingPrice: number
                productName: string
            }[]
            orderTotalQuantity: number
            orderSubTotal: number
            orderTotal: number
            orderMode: string
            orderStatus: string
            
        }
        customerDetails: {
            customerAddress: {
                country: string
                addressId: string | null
                address: string
                addressType: string
                pincode: string
                landMark: string
                city: string
                state: string
            }
            customerId: string
            customerName: string
            customerEmail: string
            customerNumber: string
        }
        exchangeDetails: {
            viewStatus: boolean
            isInitiated: boolean
            remarks: string
            exchangeProducts: any[] // Change this type according to your needs
        }
        returnDetails: {
            viewStatus: boolean
            isInitiated: boolean
            returnProducts: any[] // Change this type according to your needs
        }
        paymentDetails: {
            paymentId: string
            paymentDate: string
            paymentStatus: string
            paymentAmount: number
            paymentMethod: string
            orderId: string
            customerId: string
        }
        discountDetails: {
            customerId: string | null
            discountCodeId: string | null
            discountOnlinePayment: number
        }
        cancellationDetails: {
            cancelledBy: string | null
            cancelledAt: string | null
        }
        refundDetails: {
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
        mediaDetails: {
            utm_source: string
            utm_medium: string
            utm_campaign: string
            utm_content: string
            campaign_id: string
            ad_id: string
        }
        shiprocketOrderId: string
        shiprocketExchangeOrderId: string
        shiprocketReturnOrderId: string
        viewStatus: boolean
        _id: string
        orderId: string
        orderInvoiceNumber: string
        orderStatusTimeline: {
            updateBy: string | null
            _id: string
            status: string
            timestamp: string
        }[]
        createdAt: string
        updatedAt: string
        __v: number
    }
}