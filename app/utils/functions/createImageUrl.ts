export const createImageUrl = (imageName: string) => {
    // Assuming images are stored in a directory named "images"
    const baseUrl = process.env.NEXT_PUBLIC_S3_BUCKET || "https://doubletick-s3.s3.ap-south-1.amazonaws.com/giftingsaga-s3-bucket/"
    // Replace "example.com" with your domain
    return baseUrl + imageName
}
