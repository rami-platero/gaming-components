import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types";
import { SignUpSchema } from "../../Schemas/SignUpSchema";
import { LoginSchema } from "../../Schemas/LoginSchema";

const backend_endpoint: string = "http://localhost:4000/api/auth";

export const userApi = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: backend_endpoint,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => "getUser",
    }),
    signUp: builder.mutation<User, SignUpSchema>({
      query: (body) => ({
        url: "signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<User, LoginSchema>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useSignUpMutation, useLoginMutation } = userApi;
