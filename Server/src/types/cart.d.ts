import { Product } from "../entities/Product";

export type CartItem = {
    product: Product;
    quantity: number;
  };

export type CustomerItems = {price: string, quantity: number}[] 