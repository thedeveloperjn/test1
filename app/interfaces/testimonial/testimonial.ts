export interface Testimonial {
    status: string;
    _id: string;
    name: string;
    rating: string;
    link: string;
    comment: string;
    designation: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TestimonialResponse {
    status: boolean;
    code: number;
    count: number;
    message: string;
    testimonials: Testimonial[];
}
