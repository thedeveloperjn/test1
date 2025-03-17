export const API_URL = "https://api.giftingsaga.com/api/v1";
export const BASE_URL = "https://api.giftingsaga.com/api/v1";
export const SITE_NAME = "GiftingSaga";
export const BANNERS_API = {
  DEXTOP: {
    ID: `_dextopBanner`,
    HOME_BANNER: {
      ID: `_dextopBannerHome`,
      URL: `/banner/allDeskTopBanner`,
    },
    PROMO_BANNER: {
      ID: `_dextopBannerPromo`,
      URL: `/banner/allPromoWebBanner`,
    },
  },
  MOBILE: {
    ID: `_mobileBanner`,
    HOME_BANNER: {
      ID: `_mobileBannerHome`,
      URL: `/banner/allMobileBanner`,
    },
    PROMO_BANNER: {
      ID: `_mobileBannerPromo`,
      URL: `/banner/allPromoMobileBanner`,
    },
  },
};

export const LOOKBOOK_API = {
  ID: `_getLookBook`,
  URL: `/lookbook/all`,
}
export const CATEGORY_API = {
  ID: `_allCategory`,
  URL: `/category/all`,
  SUB_CATEGORY: {
    ID: `_allSubCategory`,
    URL: (slug: string) => `/subcategory/allByCategorySlug/${slug}`,
  },
  COLLECTIONS: {
    ID: `_getAllCollections`,
    URL: `/subcategory/all`,
  },
};

export const PRODUCT_API = {
  ID: ``,
  URL: ``,
  PRODUCT_BY_TYPE: {
    ID: `_productByType`,
    URL: (type: string, page: number, limit: number) =>
      `/product/productType/${type}?page=${page}&limit=${limit}`,
  },
  PRODUCT_BY_TYPE_N_CATEGORY: {
    ID: `_productByTypeAndCategory`,
    URL: (type: string, page: number, limit: number, category: string) =>
      `/product/byAnyCategoryAndType/${type}?category=${category}&page=${page}&limit=${limit}`,
  },
  PRODUCT_ONE_BY_SLUG: {
    ID: `_productBySlug`,
    URL: (slug: string, otherVarients:string | null) => {
      let queryParams = `/${slug}`;
      const params = [];
  
      if (otherVarients) {
        params.push(otherVarients);
      }
      
  
      if (params.length > 0) {
        queryParams += `?${params.join("&")}`;
      }
  
      return `/product/one${queryParams}`;

    },
    // URL: (slug: string, color: string | null, size: string | null) => {
    //   let queryParams = `/${slug}`;
    //   const params = [];
  
    //   if (color) {
    //     params.push(`color=${color}`);
    //   }
    //   // Only add size if it's a valid string
    //   if (size && size !== "null" && size !== "undefined") {
    //     params.push(`size=${size}`);
    //   }
  
    //   if (params.length > 0) {
    //     queryParams += `?${params.join("&")}`;
    //   }
  
    //   return `/product/one${queryParams}`;
    // },
  },
  

  
  
  PRODUCT_BY_COLLECTION_N_TYPE: {
    ID: `_productByCollectionType`,
    URL: (collection: string, type: string, paramUrl: string, page: number, limit: number) =>
      `/product/byAnyCategory/${collection}?page=${page}&limit=${limit}&sort=${type}${paramUrl ? "&" + paramUrl : ""}`,
  },
};
export const TESTIMONIAL_API = {
  ID: `_allTestimonial`,
  URL: `/testimonials/all`,
};

export const BLOG_API = {
  ID: `_allBlog`,
  URL: (page: number, limit: number) =>
    `/blog/all/web?page=${page || 1}&limit=${limit || 4}`,
  BLOG_ONE: {
    ID: `_getBlogOne`,
    URL: (slug: string) => `/blog/detailBySlug/${slug}`
  }
};

export const AUTH_API = {
  ID: `_allAuth`,
  SEND_OTP: {
    ID: `_sendOTP`,
    URL: `/otp/otpMobileNumber`,
  },
  VERIFY_OTP: {
    ID: `_verifyOTP`,
    URL: `/customer/verifyotp`,
  },
  SIGNUP: { ID: "_createUser", URL: "/customer/signup" },
  UPDATE_USER: { ID: "_updateUser", URL: (_id: string) => `/customer/update/${_id}` },
};

export const CART_API = {
  ADD_TO_CART: {
    ID: `_addToCart`,
    URL: `/cart/addProductToCart`,
  },
  GET_CART_PRODUCT: {
    ID: `_getAllCartProduct`,
    URL: `/cart/cartBycustomer`,
  },
  UPDATE_CART_PRODUCT_QTY: {
    ID: `_updateCartQty`,
    URL: `/cart/updateQty`,
  },
  REMOVE_CART_PRODUCT: {
    ID: `_deleteCartProduct`,
    URL: `/cart/deleteCartByProductId`,
  },
  CLEAR_CART: {
    ID: '_clearCartById',
    URL: `/cart/deleteAllByCustomer`
  }
};

export const WISHLIST_API = {
  ADD_TO_WISHLIST: {
    ID: '_addWishlist',
    URL: (id: string) => `/wishlist/remove/${id}`,
  },
  GET_WISHLIST_PRODUCT: {
    ID: `_getAllCartProduct`,
    URL: `/cart/cartBycustomer`,
  },
  UPDATE_WISHLIST_PRODUCT_QTY: {
    ID: `_updateCartQty`,
    URL: `/cart/updateQty`,
  },
  REMOVE_WISHLIST_PRODUCT: {
    ID: `'_removeFromWishlist'`,
    URL: (id: string) => `/wishlist/remove/${id}`
  },
  CLEAR_WISHLIST: {
    ID: '_clearCartById',
    URL: (id: string) => `/wishlist/remove/${id}`
  }
};
export const DISCOUNT_API = {
  ACTIVE_DISCOUNT: {
    ID: `_getActiveDiscount`,
    URL: `/discount/allActiveDiscount`,
  },
  ONLINE_DISCOUNT: { ID: `_getOnlineDiscount`, URL: '/generalconfig/getOnlinePaymentDiscount' },
  COUPON_CODE: { ID: `_getCouponCode`, URL: 'coupon/verifyCouponCode' }

}

export const ORDER_API = {
  CREATE_ORDER: {
    ID: '_createOrder',
    URL: '/order'
  }
  , ORDER_DETAIL: {
    ID: '_getAllOrders',
    URL: '/order/customer/list'
  }
}

export const OCCASSION_API = {
  ID: `_allOccassion`,
  URL: `/occasion/all`,
}
export const COLOR_FAMILY_API = {
  ID: `_allColorFamily`,
  URL: `/colorfamilies/all`,
}

export const VIRTUAL_SHOP_FORM_API = {
  ID: '_vsForm',
  URL: `/virtualshopping/virtua-shopping-add`
}

export const USER_API = {
  ID: `_getUserDetails`,
  URL: (_id: string) => `/customer/one/${_id}`
}

export const ENQUIRY_API = {
  ID: `_getEnquiry`,
  URL: `/contactenquiry/add`
}

export const PINCODE_API = {
  ID: '_getStateCityByPincode',
  GET_PINCODE_DETAILS_API: (pincode: String) =>
    `https://api.postalpincode.in/pincode/${pincode}`,
}

export const REVIEW_API = {
  ID: '_getProductReview',
  REVIEW_BY_ID: (productId: string, page: number, limit: number) => {
    return `productreview/reviewByProductId/${productId}?page=${page ? page : 1}&limit=${limit ? limit : 10}&sort=asc`

  },
  ADD_REVIEW: { ID: `_addReviewByCustomer`, URL: '/productreview/addByCustomer' },
  UPDATE_REVIEW: {
    ID: `_updateReviewByCustomer`, URL: (productId: string) =>
      `/productreview/updateById/${productId}`
  }
}