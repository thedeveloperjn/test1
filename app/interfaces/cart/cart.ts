import { Category } from "../categories/caegory";
import { Subcategory } from "../categories/sub-category";
import { SupSubCategory } from "../categories/super-sub-category";
import { ActiveDiscountInterface } from "../discount/active-discount";
import { DiscountDetailsInterface } from "../discount/discountInterface";
import {
  Gst,
  ImageGalleryProps,
  Product,
  Rows,
  Variant,
  VariantData,
} from "../product/product";

// Define the shape of a cart item
export interface CartItem {
  productDetail: addToLocalCartPayload;
  quantity: number;
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
}


export interface CartSliceProps {
  products: CartItem[];
  cartDetails: CartDetails
  isLoading: { state: boolean; id: string };
  error: any;
  addToCart?: (product: CartItem) => void;
  updateCartQty?: (productId: string, quantity: number) => void;
  clearCart?: () => void;
  removeItemFromCart?: (productId: string) => void;

}

export interface CartItemOnline {
  productId: string;
  variant: VariantData[];
  quantity: number;
  categoryId: string;
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
}

export interface AddToCartPayload {
  cart: CartItemOnline[];
}

export interface AddToCartAPIResponse {
  status: boolean;
  code: number;
  message: string;
}

export interface CustomerCartItem {
  title: string | ''
  image?: string | ''
  rows: Rows
  isOnlineStock: boolean
  _id: string | ''
  productId: string | ''
  hsnCode: string | ''
  quantity: number | 0
  categoryIds: string | ''
  discountId?: string | ''
  discountTitle?: string | ''
  discountApplicable?: boolean
  discountDetails?: DiscountDetailsInterface
  applicableDiscounts?: ActiveDiscountInterface[]
  offerStatus?: string | ''
  isPair?: 'PAIRED' | 'NOT_PAIRED'
  sku: number | 0
  productName: string | ''
  productQuantity: number
  mrp: number | 0 | string
  sellingPrice: number | 0
  basePrice: string | ''
  gst: number | 0
  sgst: number | 0
  cgst: number | 0
  discount: number | 0
  images?: string | ''
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
  
  variant: Variant[]
}

export interface CartSummary {
  subTotal: number;
  totalQuantity: number;
  totalDiscount: number;
  offerDiscount: number;
  shipping: string;
  grandTotal: number;
}

export interface CartDetailsApiResponse {
  status: boolean;
  code: number;
  count: number;
  message: string;
  data: CartDetails;
}

export interface addToLocalCartPayload {
  _id: string;
  categoryIds: Category[];
  subCategoryIds: Subcategory[];
  supSubCategoryIds: SupSubCategory[];
  variants: Variant[];
  quantityVariants: any[];
  seoTags: string[];
  images: ImageGalleryProps[];
  rows: Rows;
  onlineStock: any[];
  onlineStockColumns: any[];
  brandId: string | null;
  occasionIds: any[];
  isWishlisted: boolean;
  deletedStatus: boolean;
  isActive: boolean;
  productId: string;
  title: string;
  subtitle: string;
  description: string;
  leadVariant: string;
  seoTitle: string;
  seoMetaDescription: string;
  seoSlug: string;
  isCommonMrp: boolean;
  commonMrp: string;
  perProductPrice: string;
  isAutoFill: boolean;
  discountType: string;
  type: string;
  attribute: string;
  isOnlineStock: boolean;
  gst: Gst;
  gstId: string;
  hsnCode: string;
  weavingPattern: string;
  zari: string;
  dimension: string;
  goldSilverThread: string;
  blouseColor: string;
  blouseDimension: string;
  stock: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  discount: Record<string, unknown>;
  isFeaturedProduct: boolean | null;
  gsts: Gst[];
  applicableDiscounts: any[];
}

// Define the type for the cart details
export interface CartDetails {
  cart: CustomerCartItem[];
  summary: CartSummary;
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
}

export interface RemoveCartItemPayload {
  productId: string;
  variant: VariantData[];
}
export interface UpdateCartItemQtyPayload {
  productId: string;
  variant: VariantData[];
  quantity: number;
}
