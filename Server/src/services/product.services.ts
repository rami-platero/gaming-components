import { Product } from "../entities/Product";

enum Filters {
  name_asc = "name_asc",
  name_desc = "name_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
}

export const sortProducts = (products: Product[], filter: Filters) => {
  switch (filter) {
    case Filters.name_asc:
      products.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      break;
    case Filters.name_desc:
      products.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      break;
    case Filters.price_desc:
      products.sort((a, b) => {
        return b.price - a.price;
      });
      break;
    case Filters.price_asc:
      products.sort((a, b) => {
        return a.price - b.price;
      });
      break;
    default:
      break;
  }
  return products;
};

export const filterProductsByBrand = (products: Product[], brand: string) => {
  const brandArray = brand.split("-");

  return products.filter((product) => {
    return brandArray.some((br) => {
      return br === product.brand;
    });
  });
};

export const filterProductsByName = (products: Product[], search: string) => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(search.toLowerCase());
  });
};

export const filterProductsByPage = (products: Product[], page: string) => {
  const postsPerPage = 16;
  return products.slice(
    (parseInt(page) - 1) * postsPerPage,
    postsPerPage * parseInt(page)
  );
};

import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2023-08-16",
});

export const createStripeProduct = async (product: Product) => {
  const { default_price } = await stripe.products.create({
    name: product.name,
    description: product.description,
    id: product.id.toString(),
    default_price_data: {
      currency: "usd",
      unit_amount: product.price * 100,
    },
  });
  if (default_price) {
    product.stripe_price = default_price as string;
    await product.save();
  }

  return default_price
}