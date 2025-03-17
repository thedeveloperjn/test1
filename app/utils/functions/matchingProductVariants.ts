import { Product, VariantData } from "@/interfaces/product/product";
import { arraysMatch } from "./arrMatch";

// match product
export function matchingProductsVariant(product: Product, variantData: VariantData[]) {
    const matchingRow = product.rows.find((row) => {
        const rowVariantDataTitles = row?.variantData?.map((data) => data.title);
        const rowVariantDataValues = row?.variantData?.map((data) => data.value);
        const providedVariantTitles = variantData?.map((data) => data.title);
        const providedVariantValues = variantData?.map((data) => data.value);
        return (
            rowVariantDataTitles?.length === providedVariantTitles?.length &&
            arraysMatch(rowVariantDataTitles, providedVariantTitles) &&
            arraysMatch(rowVariantDataValues, providedVariantValues)
        );
    });
    if (matchingRow) {
        // // console.log("Matching Row:", matchingRow);
        return matchingRow;
    } else {
        // console.log("No matching row found.");
    }
}