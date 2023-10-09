import Stripe from "stripe";
import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { OrderItem } from "../entities/OrderItem";

export const createOrderItems = async (
  items: Stripe.LineItem[],
  order: Order
) => {
  for (const item of items) {
    const orderItem = new OrderItem();
    const product = await Product.findOne({
      where: {
        stripe_price: item.price?.id,
      },
    });
    if (product) {
      orderItem.product = product;
    }
    orderItem.unit_price = product?.price!
    orderItem.total_price = product?.price! * item.quantity!
    orderItem.quantity = item.quantity!;
    orderItem.order = order;
    await orderItem.save();
  }

  await order.save();
};

export const updateOrder = async (
  data: Stripe.Checkout.Session,
  user: User,
  order: Order
) => {
  order.session_id = data.id;

  order.user = user;
  order.customer_id = data.customer as string;

  order.payment_intent = data.payment_intent as string;
  order.payment_status = data.payment_status;
  order.mode = data.mode;

  if (data.amount_subtotal && data.amount_total) {
    order.subtotal = data.amount_subtotal / 100;
    order.total = data.amount_total / 100;
  }

  await order.save();
};

export const createOrder = async (session_id: string) => {
  const order = new Order();
  order.session_id = session_id;
  await order.save();
};

export const getUnixExpirationTime = () => {
  const currentDate = new Date();
  const expirationTime = new Date(currentDate.getTime() + 60 * 60 * 1000);
  return Math.floor(expirationTime.getTime() / 1000);
};
