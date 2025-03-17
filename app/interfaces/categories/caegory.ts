export interface Category {
    _id: string;
    icon: string;
    name: string;
    slug: string;
    subTitle: string;
    deleteStatus: boolean;
    __v: number;
    title?: string;
    thumbNailType?: string;
    desktopImage?: string;
    mobileImage?: string;
    desktopVideoLink?: string;
    mobileVideoLink?: string;
    coverImageDesktop?: string;
    coverImageMobile?: string;
}

export interface CategoryResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    categorys: Category[];
}