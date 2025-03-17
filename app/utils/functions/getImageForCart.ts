import { Product, VariantData } from "@/interfaces/product/product";

// for sending images according to variants for cart
export function getImageForCart(product: Product, variant: VariantData[]) {
    if (product?.variants?.length > 0) {
        // const variants = product?.rows[0]?.variantData;
        const variants = variant;
        let leadVariantTitle = variants?.filter(
            (item) =>
                item?.title?.toLowerCase() === product?.leadVariant?.toLowerCase()
        );

        const finalImages = product?.images?.filter(
            (row) =>
                row?.title?.toLowerCase() === leadVariantTitle[0]?.value?.toLowerCase()
        );
        // // console.log("finalImages=", finalImages);
        if (finalImages) {
            return finalImages[0]?.values[0]?.url;
        } else {
            return "";
        }
    } else {
        const pImages = product?.images?.filter(
            (row) => row?.title?.toLowerCase() === "base"
        );
        if (pImages) {
            return pImages[0]?.values[0]?.url;
        } else {
            return "";
        }
    }
}