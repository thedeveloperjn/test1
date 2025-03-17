
import {
  AddToCartAPIResponse,
  AddToCartPayload,
  CartDetails,
  CartDetailsApiResponse,
  CartItem,
  RemoveCartItemPayload,
  UpdateCartItemQtyPayload,
} from "@/interfaces/cart/cart";
import { axiosInstance } from "@/lib/axios";
import { CART_API } from "@/utils/constants/apiEndpoints";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
// Add To Cart
export const AddToCartService = () => {
  // const { addItemToCart } = useCartStore()
  const authToken = Cookies.get("session");
  const { mutate, isPending, isError, error } = useMutation<
    AddToCartAPIResponse,
    AxiosError<{ message: string }>,
    AddToCartPayload
  >({
    mutationKey: [],
    mutationFn: async (CartItems: AddToCartPayload) => {
      const response = await axiosInstance.post<AddToCartAPIResponse>(
        CART_API.ADD_TO_CART.URL,
        { ...CartItems },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response?.data;
    },
  });

  return {
    addToCartMutate: mutate,
    isAddToCartPending: isPending,
    isAddToCartErrorStatus: isError,
    isAddToCartError: isError ? error : null,
  };
};

// Get Cart Details
export const GetUserCartService = () => {
  const authToken = Cookies.get("session");
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [CART_API.GET_CART_PRODUCT.ID],
    queryFn: async () => {
      const response = await axiosInstance.get<CartDetailsApiResponse>(
        CART_API.GET_CART_PRODUCT.URL,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response?.data?.data;
    },
  });

  return {
    cartDetails: data || null,
    iscartDetailsLoading: isPending,
    iscartDetailsError: isError,
    error: isError ? error : null,
    refetchCart: refetch,
  };
};

// Remove Item From Cart
export const RemoveCartItemService = () => {
  // const { addItemToCart } = useCartStore()
  const authToken = Cookies.get("session");
  const { mutate, isPending, isError, error } = useMutation<
    AddToCartAPIResponse,
    AxiosError<{ message: string }>,
    RemoveCartItemPayload
  >({
    mutationKey: [CART_API.REMOVE_CART_PRODUCT.ID],
    mutationFn: async (CartItems: RemoveCartItemPayload) => {
      const response = await axiosInstance.delete<AddToCartAPIResponse>(
        CART_API.REMOVE_CART_PRODUCT.URL,
        {
          headers: { Authorization: `Bearer ${authToken}` },
          data: CartItems,
        }
      );
      return response?.data;
    },
  });

  return {
    removeCartItemMutate: mutate,
    isRemoveCartItemPending: isPending,
    isRemoveCartItemErrorStatus: isError,
    isRemoveCartItemError: isError ? error : null,
  };
};

// Remove Item From Cart
export const UpdateCartItemQtyService = () => {
  // const { addItemToCart } = useCartStore()
  const authToken = Cookies.get("session");
  const { mutate, isPending, isError, error } = useMutation<
    AddToCartAPIResponse,
    AxiosError<{ message: string }>,
    UpdateCartItemQtyPayload
  >({
    mutationKey: [CART_API.UPDATE_CART_PRODUCT_QTY.ID],
    mutationFn: async (CartItems: UpdateCartItemQtyPayload) => {
      const response = await axiosInstance.put<AddToCartAPIResponse>(
        CART_API.UPDATE_CART_PRODUCT_QTY.URL,
        { ...CartItems },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response?.data;
    },
  });

  return {
    UpdateCartItemQtyMutate: mutate,
    iUpdateCartItemQtyPending: isPending,
    iUpdateCartItemQtyErrorStatus: isError,
    iUpdateCartItemQtyError: isError ? error : null,
  };
};


