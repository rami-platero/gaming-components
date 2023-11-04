import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./features/user/authSlice";
import productReducer from "./features/products/productsSlice";
import { productsApi } from "./services/productsApi";
import cartReducer from "./features/cart/cartSlice";
import { cartApi } from "./services/cartApi";
import { reviewsApi } from "./services/reviewsApi";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import useToast from "../hooks/useToast";
const { notifyError } = useToast();

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (
      isRejectedWithValue(action) &&
      action.meta.arg.endpointName !== "getUser" &&
      action.payload.status === 500
    ) {
      notifyError("Internal server error");
    }

    return next(action);
  };

const store = configureStore({
  reducer: {
    auth: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      productsApi.middleware,
      cartApi.middleware,
      reviewsApi.middleware,
      rtkQueryErrorLogger
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
