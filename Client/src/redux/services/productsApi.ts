import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct, TProducts } from "../../types/products";
import config from "../../config/config";

export type ProductsParams = {
  category?: string;
  search: string;
  page: string;
  filter: string;
  brands?: string;
  price_min?: string;
  price_max?: string;
  no_stock?: string;
};

export const productsApi = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<TProducts, ProductsParams>({
      query: (params) =>
        `/products/?search=${params.search}&filter=${params.filter}&page=${params.page}`,
    }),
    getProductsByCategory: builder.query<TProducts, ProductsParams>({
      query: (params) =>
        `/products/${params.category}?search=${params.search}&filter=${params.filter}&page=${params.page}&brand=${params.brands}&price_min=${params.price_min}&price_max=${params.price_max}&no_stock=${params.no_stock}`,
    }),
    getSingleProduct: builder.query<TProduct, string>({
      query: (slug) => `/product/${slug}`,
    }),
    getProductComments: builder.query<TProduct, string>({
      query: (slug) => `/product/comments/${slug}`
    })
  }),
});

export const { useGetProductsQuery, useGetProductsByCategoryQuery, useGetSingleProductQuery, useGetProductCommentsQuery, useLazyGetProductsQuery, useLazyGetProductsByCategoryQuery } =
  productsApi;
