import { NextFunction, Request, Response } from "express";
import { AccessToken } from "../../types";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { AppError } from "../helpers/AppError";

export const getOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user as AccessToken["user"];

    const orders = await Order.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    for (const order of orders) {
      const orderItems = await OrderItem.find({
        where: {
          order: {
            id: order.id,
          },
        },
      });
      order.orderItems = orderItems;
    }

    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
};

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user as AccessToken["user"];
    const { id } = req.params;

    if (isNaN(Number(id))) {
      throw new AppError(404, JSON.stringify({ message: "Invalid ID" }));
    }

    const order = await Order.findOne({
      where: {
        user: {
          id: user.id,
        },
        id: Number(id)
      },
    });

    if (!order)
      throw new AppError(
        404,
        JSON.stringify({ message: "Order does not exist!" })
      );

    const orderItems = await OrderItem.find({
      where: {
        order: {
          id: order.id,
        },
      },
      relations: {
        product: true,
      },
    });

    order.orderItems = orderItems;

    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};
