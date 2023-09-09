import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import config from "../../config/config";
import { AuthState, logOut, setCredentials } from "../features/user/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.API_BASE_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AuthState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    "originalStatus" in result.error &&
    result.error.originalStatus === 401
  ) {
    // try to get a new token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult.data) {
      const user = (api.getState() as AuthState).auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut(null));
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({}),
});
