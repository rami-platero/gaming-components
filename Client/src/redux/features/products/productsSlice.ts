import { createSlice } from "@reduxjs/toolkit";
import { TCurrentFilters, TFilters, TProduct } from "../../../types/products";

type TProducts = {
    products: TProduct[];
    pages_amount: number;
    filters?: TFilters | null;
    currentFilters: TCurrentFilters | null;
  };


const initialState: TProducts = {
    products: [],
    pages_amount: 0,
    filters: null,
    currentFilters: null
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state,action)=>{
            state = action.payload
            return state
        },
        resetProducts: (state,_action) => {
            state = initialState
            return state
        }
    }
})

export const {setProducts,resetProducts} = productsSlice.actions

export default productsSlice.reducer