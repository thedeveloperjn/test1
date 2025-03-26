import { Product } from "../../interfaces/product/product";
import { getProductBySlug } from "../../services/product/product-one1";
import { SEO_DATA } from "../../utils/constants/metaData";
import { metaGenerator } from "../../utils/functions/getMetaTags";
import { use } from "react";
import ProductPage from "./components/product-page";
type Params = Promise<{ slug: string[] }>;
type SearchParams = Promise<{ [key: string]: string }>;

export default function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = use(props.params);
  const searchParams = use(props.searchParams);
  return (
    <div className="animate-in">
      <ProductPage params={params} searchParams={searchParams} />
    </div>
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const queryColor = (await searchParams)?.color?.toLowerCase();
  const productData = (await getProductBySlug((await params).slug[0]))?.data;
  const { title, subtitle, images } = productData || {};

  let image = "";

  if (productData) {
    const matchingImage = images?.find(
      (item: { title: string }) => item?.title?.toLowerCase() === queryColor
    );

    if (matchingImage) {
      image = matchingImage.values[0]?.url;
    } else if (images?.length > 0) {
      image = images[0].values[0]?.url;
    }
  }

  const cachedImage = image;

  const metadata = metaGenerator({
    title: `${title} | ${SEO_DATA.title}`,
    description: `${subtitle} | ${SEO_DATA.description}`,
    image: cachedImage,
  });

  return metadata;
}
