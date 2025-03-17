// app/merchandise/[slug]/page.tsx
import { Suspense } from "react";
import ProductClient from "./ProductClient";

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading product...</div>}>
      <ProductClient />
    </Suspense>
  );
}