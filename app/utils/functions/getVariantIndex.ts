import { Rows, Variant } from "@/interfaces/product/product";

// Function to get the index of the color family based on the variant data
export const getColorFamilyIndex = (
    rows: Rows[],
    variantData: Variant[]
): number => {
    // Get the color value from rows.variantData
    const colorValue = rows[0]?.variantData?.find(
        (data) => data.title.toLowerCase() === "color"
    )?.value;

    if (!colorValue) {
        return -1;
    }

    // Find the variant data for color
    const colorVariant = variantData.find(
        (data) => data.title.toLowerCase() === "color"
    );

    if (!colorVariant || !colorVariant.colorFamilies) {
        return -1;
    }

    // Find the index of the color family that matches the color value
    const colorFamilyIndex = colorVariant.colorFamilies.findIndex(
        (family) => family.colorSlug?.toLowerCase() === colorValue?.toLowerCase()
    );

    return colorFamilyIndex;
};
