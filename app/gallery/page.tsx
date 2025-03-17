import { gallerydata } from "../utils/api";
import Gallery from "../components/gallery";
import Loading from "./loading";

export default async function Home() {
  let data = [];
  let loading = true;

  try {
    data = await gallerydata();
    loading = false;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    loading = false;
  }

  return loading ? <Loading /> : <Gallery data={data} />;
}
