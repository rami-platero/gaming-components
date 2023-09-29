import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config/config";
import { Cart } from "../../types/cart";
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  setCartItems,
  setItemLoading,
} from "../features/cart/cartSlice";
import { TProduct } from "../../types/products";

type CartParams = {
  id: number;
  quantity: number;
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ['Cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateQuantity: builder.mutation<null, CartParams>({
      query: (params) => ({
        url: `/cart/update/${params.id}`,
        method: "PUT",
        body: { quantity: params.quantity },
      }),
    }),
    getCart: builder.query<Cart, null>({
      query: () => "/cart",
      providesTags: ['Cart'],
      onQueryStarted: async (_params, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setCartItems(response.data));
        } catch (error) {
          return;
        }
      },
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: `/cart`,
        method: "DELETE",
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        dispatch(clearCart(null));
        await queryFulfilled;
        dispatch(clearCart(null));
      },
      invalidatesTags: ['Cart'],
    }),
    addItemToCart: builder.mutation<null, TProduct>({
      query: (params) => ({
        url: `/cart/${params.id}`,
        method: "POST",
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        try {
          dispatch(addItemToCart(params));
          await queryFulfilled;
        } catch (error) {
          dispatch(removeItemFromCart(params.id));
        }
      },
    }),
    removeItem: builder.mutation<null, number>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setItemLoading({ id, loading: true }));
          await queryFulfilled;
          dispatch(removeItemFromCart(id));
        } catch (error) {
          dispatch(setItemLoading({ id, loading: false }));
        }
      },
    }),
    
  }),
});

export const {
  useLazyGetCartQuery,
  useUpdateQuantityMutation,
  useAddItemToCartMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = cartApi;
