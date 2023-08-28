import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types/products";

export type Params = {
  search: string;
  page: string;
  filter: string;
};

export const productsApi = createApi({
  reducerPath: "productsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Params>({
      query: (params) =>
        `products/?search=${params.search}&filter=${params.filter}&page=${params.page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
