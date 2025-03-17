import { Product } from "../interfaces/product/product";
import { ProductCard } from "./product-card";

function ProductListWishList({
  products,
}: {
  products: { product: Product }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 gap-4 gap-y-4 lg:mx-0 mx-2">
      {products?.map((product: { product: Product }, index: any) => (
        <ProductCard key={index} {...product.product} />
      ))}
      {/* <ViewMoreCard /> */}
    </div>
  );
}

export default ProductListWishList;
