import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./features/user/authSlice";
import productReducer from "./features/products/productsSlice";
import { productsApi } from "./services/productsApi";

const store = configureStore({
  reducer: {
    auth: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      productsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
