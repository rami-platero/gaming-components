import { TProduct } from "./products";

export type OrderItem = {
  id: number;
  quantity: number;
  product: TProduct;
  order: Order;
  unit_price: number
  total_price: number
  createdAt: Date;
  updatedAt: Date;
};
export type Order = {
  id: number;
  payment_intent: string;
  orderItems: OrderItem[];
  customer_id: string;
  mode: string;
  subtotal: number;
  total: number;
  payment_status: string;
  createdAt: Date;
  updatedAt: Date;
};
