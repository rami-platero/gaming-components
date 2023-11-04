import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import * as dotenv from "dotenv";
import { AccessToken } from "../../types";
import { User } from "../entities/User";
import { AppError } from "../helpers/AppError";
import { CartItem, CartUpdatedItem } from "../types/cart";
import {
  createOrder,
  createOrderItems,
  getUnixExpirationTime,
  updateOrder,
} from "../services/payment.services";
import { Order } from "../entities/Order";
import { Product } from "../entities/Product";
import { clearCartCookie } from "../utils/jwt";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2023-08-16",
});

export const createCheckoutSession = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user as AccessToken["user"];
  const cart = res.locals.cart as CartUpdatedItem[];

  try {
    const foundUser = await User.findOne({
      where: {
        id: user.id,
      },
    });

    let customer;

    if (!foundUser)
      throw new AppError(
        404,
        JSON.stringify({ message: "User does not exist" })
      );

    if (foundUser.customer_id) {
      // get customer from user
      customer = await stripe.customers.retrieve(foundUser?.customer_id);
    } else {
      // create customer for user
      customer = await stripe.customers.create({
        metadata: {
          user_id: user.id,
        },
        email: foundUser?.email,
      });
      // asign customer.id to user
      foundUser.customer_id = customer.id;
      await foundUser.save();
    }

    const products = cart?.map((p: CartUpdatedItem) => {
      return { price: p.product.stripe_price, quantity: p.quantity };
    });

    const expiresAt = getUnixExpirationTime();

    const session = await stripe.checkout.sessions.create({
      line_items: products,
      customer: customer.id,
      mode: "payment",
      expires_at: expiresAt,
      success_url: `${process.env.CLIENT_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_BASE_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      expand: ["line_items"],
    });

    // create order
    createOrder(session.id);

    // clear cart
    clearCartCookie(res)

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const stripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_ENDPOINT_SECRET as string
    );
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).json({ message: `Webhook Error": ${message}` });
    return;
  }

  if (event.type === "checkout.session.expired") {
    const bufferToString = req.body.toString("utf-8");
    const body = JSON.parse(bufferToString);
    const data = body.data.object as Stripe.Checkout.Session;

    await Order.createQueryBuilder()
      .delete()
      .from(Order)
      .where("session_id =: session_id", { session_id: data.id })
      .execute();
  }

  if (event.type === "checkout.session.completed") {
    try {
      const bufferToString = req.body.toString("utf-8");
      const body = JSON.parse(bufferToString);
      const data = body.data.object as Stripe.Checkout.Session;

      // get customer
      const customer = await stripe.customers.retrieve(
        body.data.object.customer
      );
      // get session
      const session = await stripe.checkout.sessions.retrieve(data.id, {
        expand: ["line_items"],
      });
      // get order
      const order = await Order.findOne({
        where: {
          session_id: data.id,
        },
      });
      if (!order) {
        throw new AppError(
          404,
          JSON.stringify({ message: "Error while creating order." })
        );
      }

      if ("metadata" in customer && "user_id" in customer.metadata) {
        const foundUser = await User.findOne({
          where: {
            id: parseInt(customer.metadata.user_id),
          },
          relations: ["orders"],
        });

        if (!foundUser)
          throw new AppError(
            404,
            JSON.stringify({ message: "User does not exist." })
          );

        // create order
        await updateOrder(data, foundUser, order);
        // save order inside user entity
        foundUser.orders = foundUser.orders || [];
        foundUser.orders.push(order);
        await foundUser.save();

        // create and assign order items to order
        await createOrderItems(session.line_items?.data!, order);
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }

  return res.sendStatus(200);
};

export const getCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { session_id } = req.params;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session) throw Error("Session does not exist.");

    const order = await Order.findOne({
      where: {
        payment_intent: session.payment_intent as string,
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};

export const getOrderID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { session_id } = req.params;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    const result = await Order.createQueryBuilder()
      .select("id")
      .where("session_id = :session_id", { session_id: session.id })
      .getRawOne();

    return res.status(200).json({ id: result.id });
  } catch (error) {
    return next(error);
  }
};
