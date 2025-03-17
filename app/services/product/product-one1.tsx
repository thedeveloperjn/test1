
import { BASE_URL,} from "@/utils/constants/apiEndpoints";



export async function getProductBySlug(
    slug = "",
    otherVarients ="" 
) {
    let queryParams = `/${slug}`;
    if (otherVarients) {
        queryParams += `?${otherVarients}`;
    }
    
    const productPath = `/product/one/${slug}?${otherVarients}`;
    console.log("productPath=", productPath);

    try {
        const response = await fetch(`${BASE_URL}${productPath}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log('fetch data', data);
        return data;
    } catch (error) {
        throw new Error("Failed to fetch product: " + error);
    }
}