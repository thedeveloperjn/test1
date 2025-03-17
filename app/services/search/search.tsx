import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetProductBySearch = ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ProductsBysearch", search, page, limit],
    queryFn: async () => {
      return axiosInstance.get(
        `https://giftingsaga.com/api/v1/product/search?search=${search}&page=${page}&limit=${limit}`
      );
    },
  });

  return {
    productBySearchData: data?.data?.data,
    isproductBySearchError: isError,
    isproductBySearchLoading: isLoading,
    productBySearchRefetch: refetch,
  };
};
