interface PostOffice {
    Name: string
    Description: string
    BranchType: string
    DeliveryStatus: string
    Circle: string
    District: string
    Division: string
    Region: string
    Block: string
    State: string
    Country: string
    Pincode: string
}

interface getPincodeResponse {
    data: { Message: string; Status: string; PostOffice: PostOffice[] }[]
}

export type { getPincodeResponse }
