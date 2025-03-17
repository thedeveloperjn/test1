import { Category } from "../categories/caegory";
import { Subcategory } from "../categories/sub-category";
import { SupSubCategory } from "../categories/super-sub-category";

export interface ProductsByTypeApiResponse {
    status: boolean;
    code: number;
    totalProducts: number;
    message: string;
    data: Product[];
}

export interface ProductsBySlugApiResponse {
    status: boolean;
    code: number;
    totalProducts: number;
    message: string;
    data: Product;
}

export interface Product {
    videoLink: string | undefined;
    _id: string;
    categoryIds: Category[];
    subCategoryIds: Subcategory[];
    supSubCategoryIds: SupSubCategory[];
    variants: Variant[];
    quantityVariants: any[];
    seoTags: string[];
    images: ImageGalleryProps[];
    rows: Rows[];
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
    inputValues: string;
    inputFields: {
        inputTextFields: { title: string }[];
        inputImageFields: { title: string }[];
      };
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



export interface ImageGalleryProps {
    title: string;
    values: ImageValue[];
}

export interface ImageValue {
    id: string;
    url: string;
}

export interface VariantData {
    isAge?: boolean;
    ageTitle?: any;
    title: string;
    value: string;
    colorWith?: string;
    image?: string;
    colorName?: string;
}

export interface RowVariantDataOption {
    title: string
    option: string
    colorWith?: string
    image?: string
    isAge?: boolean
    colorName?: string
    ageTitle?: string
}
export interface Rows {
    id: string;
    sku: number;
    variant: string;
    url: string;
    variantData: VariantData[];
    stockStatus: string;
    stock: number;
    costPrice: number;
    mrp: number;
    perProductPrice: number;
    basePrice: string;
    gst: number;
    sgst: number;
    cgst: number;
    discount: number;
}

export interface Gst {
    deletedStatus: boolean;
    status: string;
    _id: string;
    name: string;
    sgst: string;
    igst: string;
    totalGst: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ColorFamily {
    _id: string;
    colorName: string;
    hexaColor: string;
    __v: number;
}

export interface ColorOption {
    colorImages: string;
    colorSlug: string;
    title: string;
    families: ColorFamily[];
}

export interface Variant {
    title: string;
    colorWith: string;
    options: string[];
    images: string[];
    optionsImageColorSlug: string[];
    colorFamilies: ColorOption[];
}
