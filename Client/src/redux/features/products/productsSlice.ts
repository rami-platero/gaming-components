import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types";

const initialState = [] as Product[] 

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        /* createProduct: (state,action)=>{

        },
        updateProduct: (state,action)=>{

        },
        deleteProduct: (state,action)=>{

        } */
    }
})

export default productsSlice.reducer