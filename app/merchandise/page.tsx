// app/merchandise/page.tsx
import { Suspense } from "react";
import MerchandiseClient from "./MerchandiseClient";

export default function MerchandisePage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading merchandise...</div>}>
      <MerchandiseClient />
    </Suspense>
  );
}