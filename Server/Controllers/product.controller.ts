import { NextFunction, Request, Response } from "express";
import { Product } from "../entities/Product";
import { AppError } from "../helpers/AppError";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { category, description, price, main_image, images, stock, name } =
      req.body;

    const product = Product.create({
      category,
      description,
      price,
      main_image,
      images,
      stock,
      name,
    });

    const newProduct = await product.save();

    return res.status(200).json({ message: "Success", product: newProduct });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json();
  }
};

enum Filters {
  name_asc = "name_asc",
  name_desc = "name_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
}

type Params = {
  search: string;
  filter: Filters;
  page: string;
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, filter, page } = req.query as Params;
    let products = await Product.find();
    if (!products) throw new AppError(404, "Products not found");

    if (search) {
      products = products.filter((product) => {
        return product.name.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (filter) {
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
    }

    if (page) {
      const postsPerPage = 15;
      products = products.slice(
        (parseInt(page) - 1) * postsPerPage,
        postsPerPage * parseInt(page)
      );
    }

    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};
