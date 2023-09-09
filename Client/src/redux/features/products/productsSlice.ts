import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "../../../types/products";

const initialState = {} as TProducts 

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state,action)=>{
            return state = action.payload
        },
        resetProducts: (state,_action) => {
            return state = initialState
        }
    }
})

export const {setProducts,resetProducts} = productsSlice.actions

export default productsSlice.reducer