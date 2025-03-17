import { Product, VariantData } from "@/interfaces/product/product";

interface checkProductStockResponse {
  status: string;
  availableStocks?: number;
  variant?: VariantData[];
}
// check product stock
export function checkProductStock(
  product: Product,
  variantData: VariantData[],
  quantity: number
): checkProductStockResponse {
  // CHECK PRODUCT HAS VARIANTS
  if (product?.variants?.length > 0 && product?.isOnlineStock === true) {
    const matchingStock = product.onlineStock.find((row) => {
      // console.log("kkk", row)
      const rowVariantDataTitles = row?.variantData.map(
        (data: VariantData) => data?.title
      );
      const rowVariantDataValues = row?.variantData.map(
        (data: VariantData) => data?.value
      );
      const providedVariantTitles = variantData?.map((data) => data?.title);
      const providedVariantValues = variantData?.map((data) => data?.value);
      return (
        rowVariantDataTitles?.length === providedVariantTitles?.length &&
        arraysMatch(rowVariantDataTitles, providedVariantTitles) &&
        arraysMatch(rowVariantDataValues, providedVariantValues)
      );
    });
    if (matchingStock) {
      if (
        matchingStock?.stockStatus === "In Stock" &&
        matchingStock?.availableStock >= quantity
      ) {
        return {
          status: "IN_STOCK",
          availableStocks: matchingStock?.availableStock,
        };
      } else if (matchingStock?.stockStatus === "Infinite Stock") {
        return {
          status: "IN_STOCK",
          availableStocks: matchingStock?.availableStock,
        };
      } else if (matchingStock?.stockStatus === "Out of Stock") {
        return { status: "OUT_OF_STOCK", variant: matchingStock?.variantData };
      } else {
        return { status: "OUT_OF_STOCK" };
      }
    } else {
      return { status: "Variant not found in online stock" };
    }
    // CHECK PRODUCT HAS NO VARIANTS
  } else if (product?.isOnlineStock === true) {
    const matchingStock = product?.onlineStock[0];
    if (matchingStock) {
      if (
        matchingStock?.stockStatus === "In Stock" &&
        matchingStock?.availableStock >= quantity
      ) {
        return {
          status: "IN_STOCK",
          availableStocks: matchingStock?.availableStock,
        };
      } else if (matchingStock?.stockStatus === "Infinite Stock") {
        return {
          status: "IN_STOCK",
          availableStocks: matchingStock?.availableStock,
        };
      } else if (matchingStock?.stockStatus === "Out of Stock") {
        return { status: "OUT_OF_STOCK" };
      } else {
        return { status: "OUT_OF_STOCK" };
      }
    } else {
      return { status: "Product not found in online stock" };
    }
  } else {
    return {
      status: "IN_STOCK",
    };
  }
}

// match two array
function arraysMatch(arr1: any[], arr2: any[]) {
  if (arr1?.length !== arr2?.length) {
    return false;
  }

  const titles1 = arr1?.map((item: string) => item?.toLowerCase());
  const titles2 = arr2?.map((item: string) => item?.toLowerCase());

  titles1.sort();
  titles2.sort();

  for (let i = 0; i < titles1?.length; i++) {
    if (titles1[i] !== titles2[i]) {
      return false;
    }
  }

  return true;
}
