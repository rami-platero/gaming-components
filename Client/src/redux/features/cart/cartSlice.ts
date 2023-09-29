import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../types/products";
import { Cart } from "../../../types/cart";

const initialState = [] as Cart;

type Loading = {
  id: number,
  loading: boolean
}

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setCartItems: (state, action: PayloadAction<Cart | null>) => {
      if (action.payload) {
        state = action.payload;
      }
      return state;
    },
    clearCart: (state,_action) => {
      state = initialState
      return state
    },
    addItemToCart: (state, action: PayloadAction<TProduct>) => {
      const exists = state.findIndex((item) => {
        return item.product.id === action.payload.id;
      });
      if (exists !== -1) {
        state[exists].quantity++;
      } else {
        state.push({ product: action.payload, quantity: 1, loading: false });
      }
      return state;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state = state.filter((p) => {
        return p.product.id !== action.payload;
      });
      return state;
    },
    addQuantity: (state, action) => {
      const index = state.findIndex((p) => {
        return p.product.id === action.payload;
      });
      state[index].quantity++;
      return state;
    },
    removeQuantity: (state, action) => {
      const index = state.findIndex((p) => {
        return p.product.id === action.payload;
      });
      state[index].quantity--;
      return state;
    },
    setItemLoading: (state,action: PayloadAction<Loading>) => {
      const index = state.findIndex((p) => {
        return p.product.id === action.payload.id;
      });
      state[index].loading = action.payload.loading
      return state
    }
  },
});

export const selectCartTotal = createSelector(
  (state: { cart: Cart }) => state.cart,
  (products) => {
    return products.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }
);

export const isProductInCart = (id: number) => {
  return createSelector(
    (state: { cart: Cart }) => state.cart,
    (products) => {
      return products.some((p) => p.product.id === id);
    }
  );
};

export const {
  addQuantity,
  setCartItems,
  removeQuantity,
  addItemToCart,
  removeItemFromCart,
  setItemLoading,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
