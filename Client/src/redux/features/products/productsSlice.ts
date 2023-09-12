import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SortByFilters, TCurrentFilters, TFilters, TProduct } from "../../../types/products.d";
import { ProductsParams } from "../../services/productsApi";
import axiosInstance from "../../../libs/axios";
import {  AxiosError } from "axios";

type TProducts = {
  products: TProduct[];
  pages_amount: number;
  filters: TFilters | null;
  currentFilters: TCurrentFilters | null;
  isFetching: boolean;
  error: AxiosError | null;
};

const initialState: TProducts = {
  products: [],
  pages_amount: 0,
  filters: null,
  currentFilters: null,
  isFetching: true,
  error: null,
};

export const getProducts = createAsyncThunk(
  "products/fetchAndProcessProductData",
  async (params: ProductsParams, { dispatch }) => {
    try {
      let response;
      const { category } = params;

      if (category) {
        response = await axiosInstance.get(
          `/products/${params.category}?search=${params.search}&filter=${params.filter}&page=${params.page}&brand=${params.brands}&price_min=${params.price_min}&price_max=${params.price_max}&no_stock=${params.no_stock}`
        );
      } else {
        response = await axiosInstance.get(
          `/products/?search=${params.search}&filter=${params.filter}&page=${params.page}`
        );
      }
      return response;
    } catch (error) {
      if(error instanceof AxiosError){
        dispatch(setProductsError(error));
      }
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state = action.payload;
      return state;
    },
    resetProducts: (state, _action) => {
      state = initialState;
      return state;
    },
    setProductsError: (state, action: PayloadAction<AxiosError>) => {
      state.error = action.payload;
      return state;
    },
    sortProducts: (state, action: PayloadAction<SortByFilters>) => {
      switch (action.payload) {
        case SortByFilters.name_asc:
          state.products.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case SortByFilters.name_desc:
          state.products.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        case SortByFilters.price_desc:
          state.products.sort((a, b) => {
            return b.price - a.price;
          });
          break;
        case SortByFilters.price_asc:
          state.products.sort((a, b) => {
            return a.price - b.price;
          });
          break;
        default:
          break;
      }
      return state;
    },
    filterProductsByStock: (state, _action) => {
      state.products = state.products.filter((product)=>{
        return product.stock > 0
      })
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.currentFilters = action.payload?.data?.currentFilters!;
        state.filters = action.payload?.data?.filters!;
        state.products = action.payload?.data?.products!;
        state.pages_amount = action.payload?.data?.pages_amount!;
        state.isFetching = false;
      });
  },
});

export const {
  setProducts,
  resetProducts,
  sortProducts,
  setProductsError,
  filterProductsByStock
} = productsSlice.actions;

export default productsSlice.reducer;
