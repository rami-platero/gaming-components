import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";
import { SignUpSchema } from "../../Schemas/SignUpSchema";
import { LoginSchema } from "../../Schemas/LoginSchema";
import config from "../../config/config";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.API_BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => "/getUser",
    }),
    signUp: builder.mutation<User, SignUpSchema>({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<User, LoginSchema>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useSignUpMutation, useLoginMutation } = userApi;
