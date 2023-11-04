import { Product } from "../entities/Product";

export type CartItem = {
  id: number;
  quantity: number;
};

export type CartUpdatedItem = {
  product: Product;
  quantity: number;
};

export type CustomerItems = { price: string; quantity: number }[];
