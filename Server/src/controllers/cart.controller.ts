import { NextFunction, Request, Response } from "express";
import { Product } from "../entities/Product";
import { AppError } from "../helpers/AppError";
import { CartItem } from "../types/cart";
import { clearCartCookie, createCartToken } from "../utils/jwt";

export const getCart = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (res.locals.cart.length === 0) {
      return res.sendStatus(204);
    }
    return res.status(200).json(res.locals.cart);
  } catch (error) {
    return next(error);
  }
};

export const clearCart = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    clearCartCookie(res);
    return res.sendStatus(204);
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
  const cart = res.locals.cart as CartItem[];
  try {
    if (cart.length === 0) {
      return res.status(204).json({ message: "Cart is empty." });
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

    if (quantity > product.stock) {
      throw new AppError(
        422,
        JSON.stringify({
          message: "Requested quantity exceeds stock availability",
        })
      );
    }

    const index = cart?.findIndex((p: CartItem) => {
      return p.product.id === product.id;
    });

    if (index === -1) {
      cart.push({ product, quantity });
    } else {
      cart[index].quantity = quantity;
    }

    // sign cart token
    const cartToken = createCartToken(cart);
    // update cookie with new token
    res.cookie("cart", cartToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

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
  const cart = res.locals.cart as CartItem[];
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
        422,
        JSON.stringify({ message: "This product is out of stock!" })
      );
    }

    cart?.push({ product, quantity: 1 });

    // sign cart token
    const cartToken = createCartToken(cart);
    // update cookie with new token
    res.cookie("cart", cartToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

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
  let cart = res.locals.cart as CartItem[];
  try {
    cart = cart?.filter((p: CartItem) => {
      return p.product.id !== parseInt(id);
    });

    // sign cart token
    const cartToken = createCartToken(cart);
    // update cookie with new token
    res.cookie("cart", cartToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

    return res.status(204).json({ message: "Removed item from cart." });
  } catch (error) {
    return next(error);
  }
};
