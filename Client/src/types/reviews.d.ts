import { User } from "../types";

export type Review = {
  id: number;
  body: string;
  edited: boolean;
  rating: number;
  user_id: number;
  username: User["username"]
  avatar: User["avatar"]
  createdAt: Date;
  updatedAt: Date;
  product_id: number;
};
