import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";

const backend_endpoint: string = "http://localhost:4000/api/";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: backend_endpoint,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User[], null>({
      query: () => "getUser",
    }),
  }),
});

export const { useGetUserQuery } = userApi;
