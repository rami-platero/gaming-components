import { NextFunction, Request, Response } from "express";
import { CartItem } from "../types/cart";
import { AppError } from "../helpers/AppError";
import { Product } from "../entities/Product";

export const checkCart = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const cart = res.locals.cart as CartItem[];
  const updatedCart = [] as CartItem[];
  try {
    if (cart.length === 0) {
      throw new AppError(
        400,
        JSON.stringify({ message: "The shopping cart is empty" })
      );
    }
    for (const item of cart) {
      const foundProduct = await Product.findOne({
        where: {
          id: item.product.id,
        },
      });
      if (!foundProduct) {
        throw new AppError(
          404,
          JSON.stringify({
            message: "A product in your cart is not available.",
          })
        );
      }
      if (foundProduct.stock === 0) {
        throw new AppError(
          422,
          JSON.stringify({ message: "A product in your cart is out of stock!" })
        );
      }
      if (foundProduct.stock < item.quantity) {
        throw new AppError(
          422,
          JSON.stringify({
            message: "A product in your cart exceeds the stock amount!",
          })
        );
      }
      updatedCart.push({product: foundProduct,quantity:item.quantity})
    }
    res.locals.cart = updatedCart
    return next()
  } catch (error) {
    return next(error);
  }
};
