import { NextFunction, Request, Response } from "express";
import { Product } from "../entities/Product";
import { AppError } from "../helpers/AppError";
import { CartItem } from "../types/cart";

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json(req.session.cart);
  } catch (error) {
    return next(error);
  }
};

export const clearCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.session.cart = []
    return res.status(200).json({message: "Cleared the cart."})
  } catch (error) {
    return next(error);
  }
};

export const updateQuantity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { quantity } = req.body;
  try {
    if(req.session.cart === undefined){
      throw new AppError(404, JSON.stringify({message: "Cart does not exist"}))
    }
    const product = await Product.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new AppError(
        404,
        JSON.stringify({ message: "Product does not exist." })
      );
    }

    const index = req.session.cart?.findIndex((p: CartItem) => {
      return p.product.id === product.id;
    });

    if (index === -1) {
      req.session.cart.push({ product, quantity });
    } else {
      req.session.cart[index].quantity = quantity
    }

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(error);
  }
};

export const addItemToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      throw new AppError(
        404,
        JSON.stringify({ message: "Product does not exist." })
      );
    }

    if (product.stock === 0) {
      throw new AppError(
        404,
        JSON.stringify({ message: "This product is out of stock!" })
      );
    }

    req.session.cart?.push({ product, quantity: 1 });

    return res.status(200).json({ message: "Added item to cart." });
  } catch (error) {
    return next(error);
  }
};

export const removeItemFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    req.session.cart = req.session.cart?.filter((p: CartItem) => {
      return p.product.id !== parseInt(id);
    });

    return res.status(204).json({ message: "Removed item from cart." });
  } catch (error) {
    return next(error);
  }
};
