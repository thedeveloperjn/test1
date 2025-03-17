import { BASE_URL, PROJECT_ID , api_swarn} from "../config/constants";

export async function fetchAllPosts() {
  const response = await fetch(
    `${BASE_URL}/website/post/get-all-posts/${PROJECT_ID}`
  );

  if (!response.ok) throw new Error("Could not get products");

  const result = await response.json();
  return result.data || []; // Ensure it always returns an array
}


export async function gallerydata() {
    const response = await fetch(
      `${BASE_URL}/website/gallery/get-all-galleries/${PROJECT_ID}`
    );
  
    if (!response.ok) throw new Error("Could not get gallery data");
  
    const result = await response.json();
  
    return result.data || []; // ✅ Ensure we return an array
  }


  export async function swarnkriti() {
    try {
        // Check if products exist in localStorage
        const cachedData = localStorage.getItem("products");
        if (cachedData) {
            console.log("Loaded products from cache"); // ✅ Debugging Log
            return JSON.parse(cachedData);
        }

        // If no cache, fetch from API
        const response = await fetch(api_swarn);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched fresh products:", result); // ✅ Debugging Log

        const products = result?.product || [];

        // Store in localStorage for future use
        localStorage.setItem("products", JSON.stringify(products));

        return products;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
}

  export async function swarnkriticategory() {
    const response = await fetch(
    "https://swarnakriti-api.technolitics.com/api/v1/category/all"
    );

    if (!response.ok) throw new Error("Could not get products");
  
    const result = await response.json();
    return result.categorys || [];
  }