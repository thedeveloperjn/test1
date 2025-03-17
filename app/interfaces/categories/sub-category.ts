export interface Subcategory {
    videoFile: string;
    thumbNailType: "video";
    fileType: "ATTACH_VIDEO" | "ATTACH_IMAGE";
    bannerVideo(bannerVideo: any): unknown;
    desktopImage: string;
    _id: string;
    category: string;
    categoryId: string;
    categorySlug: string;
    name: string;
    icon: string;
    sizeChart: string;
    slug: string;
    deleteStatus: boolean;
    subTitle: string;
    __v: number;
}

export interface SubcategoryResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    subcategory: Subcategory[];
}

export interface CollectionsResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    data: Subcategory[];
}