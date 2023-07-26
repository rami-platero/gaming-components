import { Request, Response } from "express";
import { Product } from "../entities/Product";

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
      name
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


