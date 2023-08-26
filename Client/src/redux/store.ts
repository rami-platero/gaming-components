import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/products/productsSlice";
import { productsApi } from "./services/productsApi";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
  products: productReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(userApi.middleware, productsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

