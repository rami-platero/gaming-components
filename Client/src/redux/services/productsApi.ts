import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {  Products } from "../../types/products";
import config from "../../config/config";

export type Params = {
  search: string;
  page: string;
  filter: string;
};

export const productsApi = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Products, Params>({
      query: (params) =>
        `/products/?search=${params.search}&filter=${params.filter}&page=${params.page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
