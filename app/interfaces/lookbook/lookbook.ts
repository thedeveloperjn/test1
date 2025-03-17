export interface LookbookAPIResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    data: Lookbook[];
}

export interface Lookbook {
    descriptions: Description[];
    seoTags: string[];
    _id: string;
    title: string;
    subTitle: string;
    seoSlug: string;
    backLink: string;
    seoTitle: string;
    seoMetaDescription: string;
    __v: number;
}

export interface Description {
    file?: string;
    videoLink?: string;
    _id?: number;
}
