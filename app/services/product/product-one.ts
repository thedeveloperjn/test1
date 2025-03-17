"use client"
import { Product, ProductsBySlugApiResponse } from "@/interfaces/product/product";
import { axiosInstance } from "@/lib/axios";
import { useAuthSlice } from "@/store/main-store";
import { BASE_URL, PRODUCT_API } from "@/utils/constants/apiEndpoints";
import localStorageAvailable from "@/utils/functions/localStorageAvailable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from 'next/navigation';

// Hook to fetch product data by slug
export const useGetProductBySlug = (
    slug: string,
    otherVarients: string
) => {
    const authToken = useAuthSlice.getState().authToken;
    const searchParams = useSearchParams();
    const query = searchParams.toString(); 
    otherVarients = query.replace(/%20|\s+|\+/g, "")


    console.log('slug',slug)
    console.log('other Varients',otherVarients)
    const { data, isLoading, isError, error, refetch } = useQuery<ProductsBySlugApiResponse, Error>({
        queryKey: [PRODUCT_API.PRODUCT_ONE_BY_SLUG.ID, slug, otherVarients],
        queryFn: async () => {
            const response = await axiosInstance.get(PRODUCT_API.PRODUCT_ONE_BY_SLUG.URL(slug,otherVarients), { 
                headers: { Authorization: `Bearer ${authToken}` } 
            });

            console.log(response, "Product by slug----");
            if (response) return response.data;
            else throw new Error("Try Again Later");
        },
    });

    console.log('other query', otherVarients);
    
    return {
        productOneData: data?.data ?? null,
        isProductOneLoading: isLoading,
        isProductOneError: isError,
        error: isError ? error : null,
        productOneRefetch: refetch
    };
};
