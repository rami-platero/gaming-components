import { TProduct } from "./products";

export type TCartItem = {
    product: TProduct;
    quantity: number;
    loading: boolean
  };
  
export type Cart = TCartItem[];