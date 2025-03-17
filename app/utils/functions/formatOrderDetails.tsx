import { CustomerCartItem } from "@/interfaces/cart/cart";

interface OrderDetails {
  productId: string;
  hsnCode: string;
  sku: number;
  productName: string;
  productQuantity: number;
  mrp: number | string;
  sellingPrice: number;
  basePrice: string;
  gst: number;
  sgst: number;
  cgst: number;
  discount: number;
  images: string;
  inputFields: {
    inputTextFields: { title: string }[];
    inputImageFields: { title: string }[];
  };
  variant: {
    title: string;
    option: string;
  }[];
}
export const formatOrderDetails = (
  cart: CustomerCartItem[]
): OrderDetails[] => {
  return cart.map((item) => ({
    productId: item._id,
    hsnCode: item.hsnCode,
    sku: item.rows.sku,
    productName: item.title,
    productQuantity: item.quantity,
    mrp: item.rows.mrp,
    sellingPrice: item.rows.perProductPrice,
    basePrice: item.rows.basePrice,
    gst: item.rows.gst,
    sgst: item.rows.sgst,
    cgst: item.rows.cgst,
    discount: item.rows.discount,
    images: item.image ? item.image : "",
    inputFields: item.inputFields,
    variant: item.rows.variantData
      ? item.rows.variantData.map((variant) => ({
          title: variant.title,
          option: variant.value,
          colorWith: variant.colorWith,
          ...(variant.colorWith === "IMAGE" && {
            image: variant?.image,
            colorName: variant?.colorName,
          }),
          ...(variant.isAge === true && {
            ageTitle: variant?.ageTitle,
            isAge: variant?.isAge,
          }),
        }))
      : [],
    
  }));
};
// productName: item.title,
// image: item.image,
// rows: {
//   id: item.rows.id,
//   sku: item.rows.sku,
//   variant: item.rows.variant,
//   url: item.rows.url,
//   variantData: item.rows.variantData.map(variant => ({
//     title: variant.title,
//     value: variant.option
//   })),
//   stockStatus: item.rows.stockStatus,
//   stock: item.rows.stock,
//   costPrice: item.rows.costPrice,
//   mrp: item.rows.mrp,
//   perProductPrice: item.rows.perProductPrice,
//   basePrice: item.rows.basePrice,
//   gst: item.rows.gst,
//   sgst: item.rows.sgst,
//   cgst: item.rows.cgst,
//   discount: item.rows.discount
// },
// isOnlineStock: item.isOnlineStock,
// _id: item._id,
// productId: item.productId,
// hsnCode: item.hsnCode,
// productQuantity: item.quantity,
// categoryIds: item.categoryIds
