// app/merchandise/MerchandiseClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Breadcrumb } from "../components/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { cn } from "../lib/utils";
import ProductBox from "../components/Productbox";
import { ListFilter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MerchandiseClient() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug || "";
  const category = searchParams.get("category") || "";
  const type = searchParams.get("sort") || "";
  const collection = searchParams.get("collection") || "";

  const [sortBy, setSortBy] = useState(type);
  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://swarnakriti-api.technolitics.com/api/v1/product/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status && data.product) {
          const mappedProducts = data.product.map((item: any) => ({
            _id: item._id || item.id,
            seoSlug: item.seoSlug || item.slug || "default-slug",
            title: item.title || item.name,
            images: item.images || [{ values: [{ url: item.thumbnail || "" }] }],
            rows: item.price
              ? [{ perProductPrice: item.price, mrp: item.mrp || item.price }]
              : [],
            thumbnail: item.thumbnail,
            variants: item.variants || [],
            isWishlisted: item.isWishlisted || false,
          }));
          setProducts(mappedProducts);
          setTotalProducts(data.count);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="relative animate-in duration-300 min-h-screen bg-white pb-10 flex justify-center">
      <div id="main-content" className="sticky top-0 max-w-[1200px] flex flex-col justify-center">
        <div className="container mx-auto px-4 py-8 mb-20" id="plsh">
          <div className="sticky top-0 lg:h-auto h-auto items-center justify-between lg:mb-6 z-10">
            <div className="flex lg:flex-row flex-col justify-start lg:justify-between lg:items-center items-start lg:gap-4 gap-2 w-full bg-white">
              <Breadcrumb
                items={[
                  { label: "home", href: "/" },
                  { label: "products", href: "/products" },
                ]}
              />
              {/* Mobile Content */}
              <div className="lg:hidden flex w-full justify-between">
                <div className="lg:hidden flex sticky top-0">
                  <Select onValueChange={(e) => setSortBy(e as any)} value={sortBy}>
                    <SelectTrigger
                      className="w-auto rounded-none lg:text-sm shadow-none focus:ring-0 text-black hover:text-secondary flex justify-start items-center p-0 border-none"
                      rightIcon={null}
                    >
                      <ListFilter className="mr-2 h-4 w-4" />
                      <SelectValue
                        placeholder="Sort By"
                        className="rounded-none text-primary text-start capitalize font-federo"
                      />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col gap-6 rounded-none shadow-none p-0 bg-[#FFF0E3] border border-primary/10">
                      <SelectItem value="NEW_ARRIVALS">New Arrival</SelectItem>
                      <SelectItem value="BEST_SELLER">Best sellers</SelectItem>
                      <SelectItem value="low_to_heigh">Price: Low to High</SelectItem>
                      <SelectItem value="heigh_to_low">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-6">
                <div className="lg:flex hidden items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <p className="lg:text-sm text-xs text-secondary gap-2 tracking-wider font-light">
                    Genuine Kanchivaram Silks - Pure & Authentic
                  </p>
                </div>
                <div className="font-public-sans text-black lg:text-base text-sm">
                  {totalProducts > 0 ? `${totalProducts} Products` : null}
                </div>
                <div className="lg:flex hidden">
                  <Select
                    onValueChange={(e) => {
                      setSortBy(e as any);
                    }}
                    value={sortBy}
                  >
                    <SelectTrigger
                      className="w-auto rounded-none lg:text-sm shadow-none focus:ring-0 text-black hover:text-secondary lg:flex hidden justify-start items-center p-0 border-none"
                      rightIcon={null}
                    >
                      <ListFilter className="mr-2 h-4 w-4" />
                      <SelectValue
                        placeholder="Sort By"
                        className="rounded-none text-primary text-start capitalize font-federo"
                      />
                    </SelectTrigger>
                    <SelectContent className="flex flex-col gap-6 rounded-none shadow-none p-0 bg-[#FFF0E3] border border-primary/10">
                      <SelectItem value="NEW_ARRIVALS">New Arrival</SelectItem>
                      <SelectItem value="BEST_SELLER">Best sellers</SelectItem>
                      <SelectItem value="low_to_heigh">Price: Low to High</SelectItem>
                      <SelectItem value="heigh_to_low">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Render Products */}
          {loading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {products.map((product, index) => (
                <ProductBox key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">No products available</div>
          )}
        </div>
      </div>
    </main>
  );
}