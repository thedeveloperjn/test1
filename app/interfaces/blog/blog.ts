interface BlogDescription {
    facebookLink: string;
    blogDescriptions: string; // Description of the blog
    _id: number; // Unique identifier
    images: string; // Primary image
    attachmentLink: string; // Link to an external attachment
    buttonTitle: string; // Title for the button
    backLink: string; // Backlink URL
    youtubeLink: string; // YouTube video link
    instagramLink: string; // Instagram profile or post link
    multipleimages: string[];
}

export interface BlogData {
    descriptions: BlogDescription[];
    seoTags: string[];
    deleteStatus: boolean;
    _id: string;
    blogId: string;
    bannerType: string;
    attachFile: string;
    youtubeLink: string;
    title: string;
    shortDescription: string;
    seoSlug: string;
    seoTitle: string;
    seoMetaDescription: string;
    postedBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface BlogResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    data: BlogData[];
}

export interface BlogOneResponse {
    status: boolean;
    code: number;
    data: BlogData;
}