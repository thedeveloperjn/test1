export interface EnquiryAPIResponse {
    status: boolean;
    code: number;
    message: string;
    enquiry: {
        viewStatus: number;
        _id: string;
        name: string;
        contactNo: string;
        emailId: string;
        city: string;
        remarks: string;
        createdAt: string;  // ISO string date format
        updatedAt: string;  // ISO string date format
        __v: number;
    };
}

export interface EnquiryProps {
    name: string;
    contactNo: string;
    emailId: string;
    city: string;
    remarks: string;
}