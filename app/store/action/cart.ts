
// setIsLoading: (isLoading) => set({ isLoading }),

import { AddToCartAPIResponse, AddToCartPayload, CartDetails, CartDetailsApiResponse, CartItem, CartItemOnline, CartSummary, CustomerCartItem, RemoveCartItemPayload, UpdateCartItemQtyPayload } from "@/interfaces/cart/cart"
// import useCartSlice from "../main-store"
import { axiosInstance } from "../../lib/axios"
import { CART_API, DISCOUNT_API } from "../../utils/constants/apiEndpoints"
import { createImageUrl } from "../../utils/functions/createImageUrl"
import { toast } from "react-toastify"
import { useAuthSlice } from "../main-store"
import { useCartSlice } from "../slice/cart"
import getDiscountedItems from "../../utils/functions/offerDiscount"
import { OnlineCouponResponse } from "../../interfaces/discount/online-coupon"
import useCouponCodeSlice from "../slice/couponCode"
import { CouponCodeData, CouponCodePayload, CouponCodeResponse } from "../../interfaces/discount/coupon-code"


export function mapProductsToCartPayload(products: CartItem[]) {
    return {
        cart: products.map((productOne: CartItem) => ({
            productId: productOne.productDetail._id,
            variant: productOne.productDetail.rows.variantData,
            quantity: 1,
            categoryId: productOne.productDetail?.categoryIds
                .map((category) => category._id)
                .join(","),
                inputFields: productOne.inputFields
        }))


    }
}

export function localProductsToCartPayload(products: CartItemOnline[]) {
    return {
        cart: products.map((productOne: CartItemOnline) => ({
            productId: productOne.productId,
            variant: productOne.variant,
            quantity: productOne.quantity,
            categoryId: productOne.categoryId,
            inputFields: productOne.inputFields
        }))


    }
}

export const setCartLoading = (isLoading: { state: boolean, id: string }) => useCartSlice.setState({ isLoading: { state: isLoading.state, id: isLoading.id } })

export const setCartError = (error: { isError: boolean, message: string }) => useCartSlice.setState({ error })

export const removeFromLocalCart = (id: string) => useCartSlice.setState((state) => ({
    products: state.products.filter((item) => item.productDetail._id !== id),
}))



const calculateSummary = (products: CustomerCartItem[]) => {
    const newSummary = products.reduce(
        (acc, product) => {
            const { rows, } = product
            const quantity = product.quantity
            acc.subTotal += (rows?.mrp) * quantity
            acc.totalQuantity += quantity
            acc.totalDiscount +=
                ((rows?.mrp) - rows?.perProductPrice) * quantity
            acc.offerDiscount += rows?.discount * quantity
            return acc
        },
        {
            subTotal: 0,
            totalQuantity: 0,
            totalDiscount: 0,
            offerDiscount: 0,
            shipping: 'Free',
            grandTotal: 0
        }
    )

    newSummary.grandTotal = newSummary.subTotal - newSummary.totalDiscount
    return newSummary
}

export const isEqual = (obj1: any, obj2: any): boolean => {
    // Check if both values are objects
    if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
        // Get keys of both objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        // Check if both objects have the same number of keys
        if (keys1.length !== keys2.length) {
            return false;
        }

        // Compare each key and value in both objects
        for (let key of keys1) {
            if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    } else {
        // If not objects, use strict equality
        return obj1 === obj2;
    }
};

// Function to compare the variantData elements of two Rows objects
export const compareVariantData = (row1: any, row2: any): boolean => {
    if (!row1 || !row2) return false;
    if (!row1.variantData || !row2.variantData) return row1.id === row2.id;
    return isEqual(row1.variantData, row2.variantData);
};

// Local Cart Functionality (for logged-out users)
export const addToCart = async (item: CartItem) => {
    console.log("item data",item);
    useCartSlice.setState({ isLoading: { state: true, id: item.productDetail._id }, error: null });
    const localCartItems = useCartSlice.getState().cartDetails;
    try {

        const authToken = useAuthSlice.getState().authToken
        const AddToCartProductPayload =
            mapProductsToCartPayload([item]);
        let cartDetails: CartDetails

console.log("addto cart payload",AddToCartProductPayload)
        // Add To cart When Authorized
        if (authToken) {
            const addToCartRes = await axiosInstance.post<AddToCartAPIResponse>(CART_API.ADD_TO_CART.URL, AddToCartProductPayload, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
console.log("addto cart response data",addToCartRes)

            if (addToCartRes.data.status) {
                const response = await axiosInstance.get<CartDetailsApiResponse>(
                    CART_API.GET_CART_PRODUCT.URL,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    }
                );
                if (response.data.status) {
                    cartDetails = response.data.data


                    useCartSlice.setState((state) => ({
                        ...state,
                        cartDetails: cartDetails
                    }));
                }
            }

        } else {
            const existingItem = localCartItems.cart.find((CartProduct) => (CartProduct._id === item.productDetail._id) && compareVariantData(CartProduct.rows, item.productDetail.rows));
            // const existingItem = checkProductInCart(localCartItems.cart, item.productDetail.rows.variantData, item.productDetail._id)
            if (existingItem) {


                // // item exists, increase the quantity by 1
                // useCartSlice.setState((state) => {
                //     const updatedCart = state.cartDetails.cart.map((product) => ((product._id === item.productDetail._id) && compareVariantData(product.rows, item.productDetail.rows) ? { ...product, quantity: product.quantity + 1 } : product)// Increase quantity

                //     );


                //     const summary = calculateSummary([
                //         ...localCartItems.cart
                //     ])


                //     return {
                //         cartDetails: {
                //             cart: updatedCart, // Updated cart

                //             summary: summary
                //         }
                //     };
                // });
                const updatedCart = useCartSlice.getState().cartDetails.cart.map((product) => ((product._id === item.productDetail._id) && compareVariantData(product.rows, item.productDetail.rows) ? { ...product, quantity: product.quantity + 1 } : product))
                const activeDiscountsData = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
                const response = await getDiscountedItems(
                    activeDiscountsData?.data.data,
                    updatedCart
                )
                let cartItems: CustomerCartItem[] = response.cart
                let cartSummary: CartSummary = response.summary
                // item exists, increase the quantity by 1
                useCartSlice.setState((state) => {
                    return {
                        cartDetails: {
                            cart: cartItems, // Updated cart
                            summary: cartSummary,
                            inputFields: state.cartDetails.inputFields // Include inputFields
                        }
                    };
                });
                toast.dismiss();
                toast.success("Item Aleady Exist");
            } else {
                // If the item doesn't exist, add the new product to the cart
                const saleprice =
                    parseFloat(item.productDetail?.rows?.perProductPrice.toString()) *
                    parseFloat((100).toString())
                const gstprice =
                    parseFloat((100).toString()) +
                    parseFloat(item.productDetail?.gsts[0]?.totalGst.toString())

                const singleUnitPrice =
                    parseFloat(saleprice.toString()) / parseFloat(gstprice.toString())

                const basePrice = singleUnitPrice?.toFixed(2)
                const newProduct: CustomerCartItem = {
                    inputFields: item.inputFields,
                    title: item.productDetail.title,
                    image: item.productDetail.images[0].values[0].url,
                  
                    rows: item.productDetail.rows,
                    isOnlineStock: item.productDetail.isOnlineStock,
                    _id: item.productDetail._id,
                    productId: item.productDetail._id,
                    hsnCode: item.productDetail.hsnCode,
                    quantity: item.quantity,
                    categoryIds: item.productDetail?.categoryIds
                        .map((category) => category._id)
                        .join(","),
                    sku: item.productDetail.rows.sku,
                    productName: item.productDetail.title,
                    productQuantity: item.quantity,
                    mrp: item.productDetail.rows.mrp,
                    sellingPrice: item.productDetail.rows.mrp - item.productDetail.rows.perProductPrice,
                    basePrice: basePrice,
                    gst: item.productDetail.rows.gst,
                    sgst: item.productDetail.rows.sgst,
                    cgst: item.productDetail.rows.cgst,
                    discount: item.productDetail.rows.discount,
                    variant: item.productDetail.variants,
                    // discount
                    discountId: item.productDetail.discountType,
                    discountTitle: '',
                    discountApplicable: false,
                    discountDetails: {
                        _id: "",
                        minimumBuyQuantity: 0,
                        minimumBuyPurchaseAmt: 0,
                        selectedBuyProducts: [],
                        selectedBuyCategories: [],
                        getQuantity: 0,
                        selectedGetProducts: [],
                        selectedGetCategories: [],
                        atDiscountAmount: 0,
                        atDiscountAmountPercent: 0,
                        discountValuePercent: 0,
                        discountValueAmount: 0,
                        selectedAppliesProducts: [],
                        selectedAppliesCategories: [],
                        minimumPurchaseAmount: 0,
                        minimumPurchaseQuantity: 0,
                        deletedStatus: false,
                        status: "",
                        discountType: "",
                        discountMethod: "",
                        discountCode: "",
                        discountTitle: "",
                        discountMainTitle: "",
                        discountCategory: "",
                        customerBuy: "",
                        buyItem: "",
                        getItem: "",
                        atDiscountedValue: "",
                        appliesItem: "",
                        discountValueType: "",
                        minimumPurchaseRequirement: "",
                        maximumDiscountUses: "",
                        startDate: "",
                        startTime: "",
                        endDate: "",
                        endTime: "",
                        createdAt: "",
                        updatedAt: "",
                        __v: 0,
                        startDateFormatted: "",
                        endDateFormatted: "",
                        startTimeFormatted: "",
                        endTimeFormatted: "",
                        finalDiscountAmount: 0
                    },
                    applicableDiscounts: [],
                    offerStatus: '',
                    isPair: "NOT_PAIRED"

                };

                const summary = calculateSummary([
                    ...localCartItems.cart,
                    {
                        ...newProduct
                    }
                ])

                // useCartSlice.setState((state) => {
                //     const updatedCart = [...state.cartDetails.cart, newProduct];
                //     return {
                //         cartDetails: {
                //             cart: updatedCart, // Updated cart with new product
                //             summary: summary
                //         }
                //     };
                // });

                const activeDiscountsData = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
                const response = await getDiscountedItems(
                    activeDiscountsData?.data.data,
                    [...localCartItems.cart, newProduct]
                )
                let cartItems: CustomerCartItem[] = response.cart
                let cartSummary: CartSummary = response.summary

                useCartSlice.setState((state) => {
                    return {
                        cartDetails: {
                            cart: cartItems, // Updated cart with new product
                            summary: cartSummary,
                            inputFields: state.cartDetails.inputFields // Include inputFields
                        }
                    };
                });
                toast.dismiss();
                toast.success("Item Added Successfully");
            }

        }

    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
};

// Local Cart Functionality (for logged-out users)
export const syncCart = async () => {
    useCartSlice.setState({ isLoading: { state: true, id: "cart-sync" }, error: null });
    const localCartItems = useCartSlice.getState().cartDetails;
    const formatedItems: CartItemOnline[] = localCartItems.cart.map((productOne) => ({
        productId: productOne.productId,
        variant: productOne.rows.variantData,
        quantity: productOne.quantity,
        categoryId: productOne.categoryIds,
        inputFields: productOne.inputFields
    }))
    try {

        const authToken = useAuthSlice.getState().authToken
        const AddToCartProductPayload: AddToCartPayload =
            localProductsToCartPayload(formatedItems);

        let cartDetails: CartDetails

        // Add To cart When Authorized
        if (authToken) {
            const addToCartRes = await axiosInstance.post<AddToCartAPIResponse>(CART_API.ADD_TO_CART.URL, AddToCartProductPayload, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (addToCartRes.data.status) {
                const response = await axiosInstance.get<CartDetailsApiResponse>(
                    CART_API.GET_CART_PRODUCT.URL,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    }
                );
                if (response.data.status) {
                    cartDetails = response.data.data


                    useCartSlice.setState((state) => ({
                        ...state,
                        cartDetails: cartDetails
                    }));
                }
            }

        } else {

            const activeDiscountsData = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
            const response = await getDiscountedItems(
                activeDiscountsData?.data.data,
                localCartItems
            )

            let cartItems: CustomerCartItem[] = response.cart
            let cartSummary: CartSummary = response.summary

            useCartSlice.setState((state) => {

                return {
                    cartDetails: {
                        cart: cartItems, // Updated cart with new product
                        summary: cartSummary,
                        inputFields: state.cartDetails.inputFields 
                    }
                };
            });
        }
        // else {
        //     const existingItem = localCartItems.cart.find((CartProduct) => CartProduct.productId === item.productDetail._id);

        //     if (existingItem) {
        //         // If the item exists, increase the quantity by 1
        //         useCartSlice.setState((state) => {
        //             const updatedCart = state.cartDetails.cart.map((product) =>
        //                 product._id === item.productDetail._id
        //                     ? { ...product, quantity: product.quantity + 1 } // Increase quantity
        //                     : product
        //             );

        //             // Recalculate the summary
        //             const totalQuantity = updatedCart.reduce((acc, product) => acc + product.quantity, 0);
        //             const subTotal = updatedCart.reduce((acc, product) => acc + product.quantity * product.rows.costPrice, 0); // Assuming `price` exists
        //             const totalDiscount = 0; // Adjust based on your discount logic
        //             const offerDiscount = 0; // Adjust based on your offer logic
        //             const grandTotal = subTotal - totalDiscount - offerDiscount; // Final grand total after discounts

        //             return {
        //                 cartDetails: {
        //                     cart: updatedCart, // Updated cart
        //                     summary: {
        //                         subTotal,
        //                         totalQuantity,
        //                         totalDiscount,
        //                         offerDiscount,
        //                         shipping: "Free", // Assuming shipping is free
        //                         grandTotal
        //                     }
        //                 }
        //             };
        //         });
        //     } else {
        //         // If the item doesn't exist, add the new product to the cart
        //         const newProduct: CustomerCartItem = {
        //             title: item.productDetail.title,
        //             image: item.productDetail.thumbnail,
        //             rows: item.productDetail.rows,
        //             isOnlineStock: item.productDetail.isOnlineStock,
        //             _id: item.productDetail._id,
        //             productId: item.productDetail._id,
        //             hsnCode: item.productDetail.hsnCode,
        //             quantity: 1,
        //             categoryIds: item.productDetail?.categoryIds
        //                 .map((category) => category._id)
        //                 .join(","),
        //             // Assuming price is available
        //         };

        //         useCartSlice.setState((state) => {
        //             const updatedCart = [...state.cartDetails.cart, newProduct];

        //             // Recalculate the summary
        //             const totalQuantity = updatedCart.reduce((acc, product) => acc + product.quantity, 0);
        //             const subTotal = updatedCart.reduce((acc, product) => acc + product.quantity * product.rows.costPrice, 0); // Assuming `price` exists
        //             const totalDiscount = 0; // Adjust based on your discount logic
        //             const offerDiscount = 0; // Adjust based on your offer logic
        //             const grandTotal = subTotal - totalDiscount - offerDiscount; // Final grand total after discounts

        //             return {
        //                 cartDetails: {
        //                     cart: updatedCart, // Updated cart with new product
        //                     summary: {
        //                         subTotal,
        //                         totalQuantity,
        //                         totalDiscount,
        //                         offerDiscount,
        //                         shipping: "Free", // Assuming shipping is free
        //                         grandTotal
        //                     }
        //                 }
        //             };
        //         });
        //     }
        // }

    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
};


// Local Cart Functionality (for logged-out users)
export const removeCartItem = async (product: RemoveCartItemPayload) => {
    useCartSlice.setState({ isLoading: { state: true, id: product.productId }, error: null });
    const localCartItems = useCartSlice.getState().cartDetails;
    try {

        const authToken = useAuthSlice.getState().authToken


        let cartDetails: CartDetails

        // Add To cart When Authorized
        if (authToken) {
            // Remove from API cart if logged in
            const removeCartRes = await axiosInstance.delete(CART_API.REMOVE_CART_PRODUCT.URL, {
                headers: { Authorization: `Bearer ${authToken}` },
                data: product
            });

            if (removeCartRes.data.status) {
                const response = await axiosInstance.get<CartDetailsApiResponse>(
                    CART_API.GET_CART_PRODUCT.URL,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    }
                );
                if (response.data.status) {
                    cartDetails = response.data.data


                    useCartSlice.setState((state) => ({
                        ...state,
                        cartDetails: cartDetails
                    }));

                    const couponCode = useCouponCodeSlice.getState().code;
                    const isCouponApplied = useCouponCodeSlice.getState().isApplied;
                    const paymentMode = useCouponCodeSlice.getState().paymentMode;

                    const getNewCartDetails = useCartSlice.getState().cartDetails

                    if (getNewCartDetails.cart.length > 0) {
                        const discountDetail = await axiosInstance.get<OnlineCouponResponse>(
                            DISCOUNT_API.ONLINE_DISCOUNT.URL,
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            }
                        )
                        console.log("discountDetail:::::", discountDetail.data?.data?.discount)
                        let discount;
                        if (isCouponApplied) {
                            const cCodePayload: CouponCodePayload = {
                                code: couponCode,
                                amount: getNewCartDetails.summary.grandTotal,
                                quantity: 1,
                            };

                            const ApplyCCodeMutation = await axiosInstance.post<CouponCodeResponse>(
                                DISCOUNT_API.COUPON_CODE.URL,
                                cCodePayload,
                                {
                                    headers: {
                                        Authorization: `Bearer ${authToken}`
                                    }
                                }
                            )

                            if (ApplyCCodeMutation.data.status) {
                                const { amount, type, status }: CouponCodeData = ApplyCCodeMutation.data.data;

                                // discount =
                                //   (amount || 0) + discountDetail.data?.data?.data?.discount;
                                discount =
                                    type?.toLowerCase() !== "flat" &&
                                        status?.toLowerCase() === "active" &&
                                        amount
                                        ? paymentMode === "online-payment"
                                            ? amount + discountDetail.data?.data?.discount
                                            : amount
                                        : getNewCartDetails.summary.grandTotal * ((amount || 0) / 100);

                                updateCartSummary({
                                    percentage: discount || 0,
                                    paymentMode,
                                });
                                // discountAmount =
                                //   (discountDetail.data?.data?.data?.discount / 100) *
                                //     cartDetails.summary.grandTotal +
                                //   ((discount || 0) / 100) * cartDetails.summary.grandTotal;
                                // discountedAmount =
                                //   cartDetails.summary.grandTotal - discountAmount;
                            }

                        } else {
                            // discountAmount =
                            //   (discountDetail.data?.data?.data?.discount / 100) *
                            //   cartDetails.summary.grandTotal;
                            discount =
                                paymentMode === "online-payment"
                                    ? discountDetail.data?.data?.discount
                                    : 0;

                            await updateCartSummary({
                                percentage: discount || 0,
                                paymentMode,
                            });
                        }
                        toast.dismiss();
                        toast.success("Item Removed From Cart");
                    } else {
                        useCouponCodeSlice.setState({ code: "", amount: 0, isApplied: false, paymentMode: "online-payment" });
                        toast.dismiss();
                        toast.success("Item Removed From Cart");
                    }
                }
                // toast.dismiss();
                // toast.success("Item Removed From Cart Online");
            }

        } else {
            // const existingItem = localCartItems.cart.filter((CartProduct) => !(CartProduct._id === product.productId && isEqual(CartProduct.rows.variantData, product.variant)));


            // const summary = calculateSummary([
            //     ...existingItem
            // ])
            // // If the item exists, increase the quantity by 1
            // useCartSlice.setState(() => {
            //     const updatedCart = existingItem
            //     return {
            //         cartDetails: {
            //             cart: updatedCart, // Updated cart
            //             summary: summary
            //         }
            //     };
            // });


            const updatedCart = localCartItems.cart.filter((CartProduct) => !(CartProduct._id === product.productId && isEqual(CartProduct.rows.variantData, product.variant)))
            const activeDiscountsData = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
            const response = await getDiscountedItems(
                activeDiscountsData?.data.data,
                updatedCart
            )
            let cartItems: CustomerCartItem[] = response.cart
            let cartSummary: CartSummary = response.summary
            // item exists, increase the quantity by 1
            useCartSlice.setState((state) => {
                return {
                    cartDetails: {
                        cart: cartItems, // Updated cart
                        summary: cartSummary,
                        inputFields: state.cartDetails.inputFields // Include inputFields
                    }
                };
            });
            // const couponCode = useCouponCodeSlice.getState().code;
            // const isCouponApplied = useCouponCodeSlice.getState().isApplied;
            // const paymentMode = useCouponCodeSlice.getState().paymentMode;

            // const getNewCartDetails = useCartSlice.getState().cartDetails

            // if (getNewCartDetails.cart.length > 0) {
            //     const discountDetail = await axiosInstance.get<OnlineCouponResponse>(
            //         DISCOUNT_API.ONLINE_DISCOUNT.URL,
            //         {
            //             headers: {
            //                 Authorization: `Bearer ${authToken}`
            //             }
            //         }
            //     )
            //     console.log("discountDetail:::::", discountDetail.data?.data?.discount)
            //     let discount;
            //     if (isCouponApplied) {
            //         const cCodePayload: CouponCodePayload = {
            //             code: couponCode,
            //             amount: getNewCartDetails.summary.grandTotal,
            //             quantity: 1,
            //         };

            //         const ApplyCCodeMutation = await axiosInstance.post<CouponCodeResponse>(
            //             DISCOUNT_API.COUPON_CODE.URL,
            //             cCodePayload,
            //             {
            //                 headers: {
            //                     Authorization: `Bearer ${authToken}`
            //                 }
            //             }
            //         )

            //         if (ApplyCCodeMutation.data.status) {
            //             const { amount, type, status }: CouponCodeData = ApplyCCodeMutation.data.data;

            //             // discount =
            //             //   (amount || 0) + discountDetail.data?.data?.data?.discount;
            //             discount =
            //                 type?.toLowerCase() !== "flat" &&
            //                     status?.toLowerCase() === "active" &&
            //                     amount
            //                     ? paymentMode === "online-payment"
            //                         ? amount + discountDetail.data?.data?.discount
            //                         : amount
            //                     : getNewCartDetails.summary.grandTotal * ((amount || 0) / 100);

            //             updateCartSummary({
            //                 percentage: discount || 0,
            //                 paymentMode,
            //             });
            //             // discountAmount =
            //             //   (discountDetail.data?.data?.data?.discount / 100) *
            //             //     cartDetails.summary.grandTotal +
            //             //   ((discount || 0) / 100) * cartDetails.summary.grandTotal;
            //             // discountedAmount =
            //             //   cartDetails.summary.grandTotal - discountAmount;
            //         }

            //     } else {
            //         // discountAmount =
            //         //   (discountDetail.data?.data?.data?.discount / 100) *
            //         //   cartDetails.summary.grandTotal;
            //         discount =
            //             paymentMode === "online-payment"
            //                 ? discountDetail.data?.data?.discount
            //                 : 0;

            //         await updateCartSummary({
            //             percentage: discount || 0,
            //             paymentMode,
            //         });
            //     }
            //     toast.dismiss();
            //     toast.success("Item Removed From Cart");
            // } else {
            //     useCouponCodeSlice.setState({ code: "", amount: 0, isApplied: false, paymentMode: "online-payment" });
            //     toast.dismiss();
            //     toast.success("Item Removed From Cart");
            // }

        }
        toast.dismiss();
        toast.success("Item Removed From Cart");
    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
};

// Local Cart Functionality (for logged-out users)
export const updateCartItemQty = async (product: UpdateCartItemQtyPayload) => {
    useCartSlice.setState({ isLoading: { state: true, id: product.productId }, error: null });

    const localCartItems = useCartSlice.getState().cartDetails;
    let cartDetails: CartDetails

    try {

        const authToken = useAuthSlice.getState().authToken



        // Add To cart When Authorized
        if (authToken) {
            // Update quantity in API cart if logged in
            const updateCartQtyRes = await axiosInstance.put(CART_API.UPDATE_CART_PRODUCT_QTY.URL, product, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (updateCartQtyRes.data.status) {
                const response = await axiosInstance.get<CartDetailsApiResponse>(
                    CART_API.GET_CART_PRODUCT.URL,
                    {
                        headers: { Authorization: `Bearer ${authToken}` },
                    }
                );
                if (response.data.status) {
                    cartDetails = response.data.data
                    const couponCode = useCouponCodeSlice.getState().code;
                    const isCouponApplied = useCouponCodeSlice.getState().isApplied;
                    const paymentMode = useCouponCodeSlice.getState().paymentMode;

                    useCartSlice.setState((state) => ({
                        ...state,
                        cartDetails: cartDetails
                    }));
                    // Update Cart Quantity

                    const getNewCartDetails = useCartSlice.getState().cartDetails
                    const discountDetail = await axiosInstance.get<OnlineCouponResponse>(
                        DISCOUNT_API.ONLINE_DISCOUNT.URL,
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`
                            }
                        }
                    )

                    let discount;
                    if (isCouponApplied) {
                        const cCodePayload: CouponCodePayload = {
                            code: couponCode,
                            amount: getNewCartDetails.summary.grandTotal,
                            quantity: 1,
                        };

                        const ApplyCCodeMutation = await axiosInstance.post<CouponCodeResponse>(
                            DISCOUNT_API.COUPON_CODE.URL,
                            cCodePayload,
                            {
                                headers: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            }
                        )

                        if (ApplyCCodeMutation.data.status) {
                            const { amount, type, status }: CouponCodeData = ApplyCCodeMutation.data.data;

                            // discount =
                            //   (amount || 0) + discountDetail.data?.data?.data?.discount;
                            discount =
                                type?.toLowerCase() !== "flat" &&
                                    status?.toLowerCase() === "active" &&
                                    amount
                                    ? paymentMode === "online-payment"
                                        ? amount + discountDetail.data?.data?.discount
                                        : amount
                                    : getNewCartDetails.summary.grandTotal * ((amount || 0) / 100);

                            updateCartSummary({
                                percentage: discount || 0,
                                paymentMode,
                            });
                            // discountAmount =
                            //   (discountDetail.data?.data?.data?.discount / 100) *
                            //     cartDetails.summary.grandTotal +
                            //   ((discount || 0) / 100) * cartDetails.summary.grandTotal;
                            // discountedAmount =
                            //   cartDetails.summary.grandTotal - discountAmount;
                        }

                    } else {
                        // discountAmount =
                        //   (discountDetail.data?.data?.data?.discount / 100) *
                        //   cartDetails.summary.grandTotal;
                        discount =
                            paymentMode === "online-payment"
                                ? discountDetail.data?.data?.discount
                                : 0;

                        await updateCartSummary({
                            percentage: discount || 0,
                            paymentMode,
                        });
                    }


                }







                toast.success("Item Updated Successfully");
            }

        } else {
            const existingItem = localCartItems.cart.find((CartProduct) => (CartProduct._id === product.productId) && isEqual(CartProduct.rows.variantData, product.variant));
            const summary = calculateSummary([
                ...localCartItems.cart.map((cartProduct) => ({ ...cartProduct, quantity: product.quantity }))
            ])
            if (existingItem) {
                // useCartSlice.setState((state) => {
                //     // Update the matched product's quantity to the product's quantity (not adding)
                //     const updatedCart = state.cartDetails.cart.map((cartProduct) => ((cartProduct._id === product.productId) && isEqual(cartProduct.rows.variantData, product.variant) ? { ...cartProduct, quantity: product.quantity } : cartProduct) // Set quantity to the product's quantity

                //     );


                //     return {
                //         cartDetails: {
                //             cart: updatedCart, // Updated cart
                //             summary: summary
                //         }
                //     };
                // });


                const updatedCart = localCartItems.cart.map((cartProduct) => ((cartProduct._id === product.productId) && isEqual(cartProduct.rows.variantData, product.variant) ? { ...cartProduct, quantity: product.quantity } : cartProduct))
                const activeDiscountsData = await axiosInstance.get(DISCOUNT_API.ACTIVE_DISCOUNT.URL)
                const response = await getDiscountedItems(
                    activeDiscountsData?.data.data,
                    updatedCart
                )
                let cartItems: CustomerCartItem[] = response.cart
                let cartSummary: CartSummary = response.summary
                // item exists, increase the quantity by 1
                useCartSlice.setState((state) => {
                    return {
                        cartDetails: {
                            cart: cartItems, // Updated cart
                            summary: cartSummary,
                            inputFields: state.cartDetails.inputFields // Include inputFields
                        }
                    };
                });

                toast.dismiss();
                toast.success("Item quantity updated successfully");
            } else {
                // Handle case if item doesn't exist (you can add logic to add the product if needed)
                toast.dismiss();
                toast.error("Item not found in cart");
            }
        }


    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
};


export const clearCart = async () => {
    try {

        let cart, summary: CartSummary
        const accessToken = useAuthSlice.getState().authToken
        // Send a request to the server to add the item to the cart

        if (accessToken) {
            const CartResponse = await axiosInstance.delete(
                CART_API.CLEAR_CART.URL,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )

            // eck if the response status code is 202 (Accepted)
            if (CartResponse.data?.status) {
                cart = [],
                    summary = {
                        subTotal: 0,
                        totalQuantity: 0,
                        totalDiscount: 0,
                        offerDiscount: 0,
                        shipping: "Free",
                        grandTotal: 0
                    }
                // // If status code is 202, update the local cart with the response from the server
            }
        } else {
            cart = [],
                summary = {
                    subTotal: 0,
                    totalQuantity: 0,
                    totalDiscount: 0,
                    offerDiscount: 0,
                    shipping: "Free",
                    grandTotal: 0
                }
        }
        useCartSlice.setState((state) => {
            return {
                cartDetails: {
                    cart: [], // Updated cart
                    summary: summary,
                    inputFields: state.cartDetails.inputFields // Include inputFields
                }
            };
        });
    } catch {
        throw new Error('Error Occured While Adding To Cart')
    }
}


export const updateCartSummary = async (discountDetails: { percentage: number, amount?: number, paymentMode: "online-payment" | "cod" }) => {
    const authToken = useAuthSlice.getState().authToken
    useCartSlice.setState({ isLoading: { state: true, id: "" }, error: null });
    try {
        const response = await axiosInstance.get<CartDetailsApiResponse>(
            CART_API.GET_CART_PRODUCT.URL,
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );
        if (response.data.status) {
            const cartDetails = response.data.data


            useCartSlice.setState((state: { cartDetails: CartDetails }) => {
                const preCartSummary: CartSummary = cartDetails.summary;
                let cartSummary: CartSummary = {
                    subTotal: preCartSummary.subTotal,
                    totalQuantity: preCartSummary.totalQuantity,
                    totalDiscount: preCartSummary.totalDiscount || 0,
                    offerDiscount: (preCartSummary.grandTotal * discountDetails.percentage / 100),
                    shipping: "",
                    grandTotal: preCartSummary.grandTotal - ((preCartSummary.grandTotal * discountDetails.percentage / 100))
                };
                let cartSummaryCOD: CartSummary = {
                    subTotal: preCartSummary.subTotal,
                    totalQuantity: preCartSummary.totalQuantity,
                    totalDiscount: preCartSummary.totalDiscount || 0,
                    offerDiscount: (preCartSummary.grandTotal * discountDetails.percentage / 100),
                    shipping: "",
                    grandTotal: preCartSummary.grandTotal - ((preCartSummary.grandTotal * discountDetails.percentage / 100))
                };

                return {
                    cartDetails: {
                        cart: cartDetails.cart, // Updated cart
                        summary: discountDetails.paymentMode == "online-payment" ? cartSummary : cartSummaryCOD,
                        inputFields: state.cartDetails.inputFields // Include inputFields
                    }
                };
            });
        }

        // item exists, increase the quantity by 1

    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
}


export const updateCartSummaryByCode = async (discountDetails: { disountPercentage?: number, discountedGrandTotal: number, discountAmount?: number }) => {
    const authToken = useAuthSlice.getState().authToken
    useCartSlice.setState({ isLoading: { state: true, id: "" }, error: null });
    try {
        const response = await axiosInstance.get<CartDetailsApiResponse>(
            CART_API.GET_CART_PRODUCT.URL,
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );
        if (response.data.status) {
            const cartDetails = response.data.data


            useCartSlice.setState((state) => {
                const preCartSummary = cartDetails.summary
                let cartSummary: CartSummary = {
                    subTotal: preCartSummary.subTotal,
                    totalQuantity: preCartSummary.totalQuantity,
                    totalDiscount: preCartSummary.totalDiscount || 0,
                    offerDiscount: (discountDetails.disountPercentage || 0) * preCartSummary.grandTotal / 100 + (discountDetails.discountAmount || 0),
                    shipping: "",
                    grandTotal: preCartSummary.grandTotal - ((discountDetails.disountPercentage || 0) * preCartSummary.grandTotal / 100 + (discountDetails.discountAmount || 0))
                }
                return {
                    cartDetails: {
                        cart: cartDetails.cart, // Updated cart
                        summary: cartSummary,
                        inputFields: state.cartDetails.inputFields // Include inputFields
                    }
                };
            });
        }

        // item exists, increase the quantity by 1

    } catch (error) {
        useCartSlice.setState({ error: { isError: true, message: 'Failed to add item to cart' } });
    } finally {
        useCartSlice.setState({ isLoading: { state: false, id: "" } });
    }
}




