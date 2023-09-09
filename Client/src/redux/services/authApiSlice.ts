import { LoginSchema, SignUpSchema } from "../../schemas/authSchema";
import { User } from "../../types";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => "/auth/getUser",
    }),
    signUp: builder.mutation<User, SignUpSchema>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<User, LoginSchema>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    logOut: builder.mutation<null, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useSignUpMutation,
  useLoginMutation,
  useLogOutMutation,
} = authApiSlice;
