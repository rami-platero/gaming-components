import { NextFunction, Request, Response } from "express";
import { Category, Product, ProductImage, Specs } from "../entities/Product";
import { AppError } from "../helpers/AppError";
import {
  createStripeProduct,
  filterProductsByBrand,
  filterProductsByName,
  filterProductsByPage,
  sortProducts,
} from "../services/product.services";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files;
  try {
    const { category, description, price, stock, name, brand } = req.body;

    if (files && Array.isArray(files)) {
      const images = [] as ProductImage[];
      for (const file of files) {
        const imageKey = await uploadProductFile(file);
        const thumbnailKey = `thumbnail/${imageKey}-thumbnail`;
        images.push({ thumbnail: thumbnailKey, xl: imageKey });
      }
      const product = Product.create({
        category,
        description,
        price: Number(price),
        stock: Number(stock),
        images,
        name,
        brand,
      });

      // save product to get id
      await product.save();

      const default_price = await createStripeProduct(product);
      product.stripe_price = default_price as string;
      await product.save();

      return res.status(200).json({ message: "Success", product });
    }

    throw new AppError(404, "Not files where found.");
  } catch (error) {
    return next(error);
  }
};

enum Filters {
  name_asc = "name_asc",
  name_desc = "name_desc",
  price_asc = "price_asc",
  price_desc = "price_desc",
}

type Queries = {
  search: string;
  filter: Filters;
  page: string;
  price_min: string;
  price_max: string;
  brand: string;
  no_stock: string;
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, filter, page } = req.query as Queries;
    let products = await Product.createQueryBuilder("product")
      .where("product.stock > :stock", { stock: 0 })
      .getMany();
    if (!products?.length)
      throw new AppError(
        404,
        JSON.stringify({ message: "Products not found" })
      );

    if (search) {
      products = filterProductsByName(products, search);
    }

    if (filter) {
      sortProducts(products, filter);
    }

    const pages_amount = Math.ceil(products.length / 16);

    if (page) {
      products = filterProductsByPage(products, page);
    }

    return res.status(200).json({
      products,
      pages_amount,
      currentFilters: { search, filter, page },
    });
  } catch (error) {
    return next(error);
  }
};

type TFilters = {
  priceRange: {
    min: number;
    max: number;
  } | null;
  brands: string[];
};

export const getProductsWithCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params;
    if (!(category in Category)) {
      throw Error("Category does not exist!");
    }
    const {
      search,
      filter,
      page,
      price_min,
      price_max,
      brand,
      no_stock = "false",
    } = req.query as Queries;
    let queryBuilder = Product.createQueryBuilder("product").where(
      "product.category =:category",
      { category }
    );

    if (no_stock !== "true") {
      queryBuilder.andWhere("product.stock > :stock", { stock: 0 });
    }

    let products = await queryBuilder.getMany();

    // Initialize filters
    let filters: TFilters = {
      priceRange: {
        min: 0,
        max: 0,
      },
      brands: brand.split("-") || [brand],
    };

    // set priceRange
    filters.priceRange = {
      min: Math.min(
        ...products.map((product) => {
          return product.price;
        })
      ),
      max: Math.max(
        ...products.map((product) => {
          return product.price;
        })
      ),
    };

    // filter products by priceRange queries
    if (price_max) {
      products = products.filter((product) => {
        return product.price <= parseInt(price_max);
      });
    }

    if (price_min) {
      products = products.filter((product) => {
        return product.price >= parseInt(price_min);
      });
    }

    // get brands based on priceRange
    filters.brands = [
      ...new Set(
        products.map((product) => {
          return product.brand;
        })
      ),
    ];

    // filter products by brand queries
    if (brand) {
      products = filterProductsByBrand(products, brand);
    }

    // filters products by search input
    if (search) {
      products = filterProductsByName(products, search);
    }

    // sort by filters
    if (filter) {
      sortProducts(products, filter);
    }

    // get amount of pages based on filters
    const pages_amount = Math.ceil(products.length / 16);

    if (page) {
      products = filterProductsByPage(products, page);
    }

    return res.status(200).json({
      products,
      pages_amount,
      filters,
      currentFilters: {
        search,
        filter,
        page,
        priceRange: {
          min: price_min,
          max: price_max,
        },
        brand,
        no_stock,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { brand } = req.body;
  try {
    const response = await Product.createQueryBuilder("product")
      .where({ id })
      .update({ brand })
      .execute();

    if (response.affected === 0) {
      throw new AppError(
        404,
        JSON.stringify({ message: "Product was not found" })
      );
    }

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await Product.delete(parseInt(id));
    if (result.affected === 0)
      throw new AppError(
        404,
        JSON.stringify({ message: "Product does not exist." })
      );

    return res.json({ message: "success." });
  } catch (error) {
    return next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      where: {
        slug,
      },
    });

    if (!product)
      throw new AppError(
        404,
        JSON.stringify({ message: "Product does not exist!" })
      );

    const rating = await Review.createQueryBuilder()
      .select([
        "AVG(review.rating) AS avg",
        "COUNT(DISTINCT review.id) as amount",
      ])
      .from(Review, "review")
      .where("review.product_id=:product_id", { product_id: product.id })
      .getRawOne();

    let avg = 0;
    let amount = 0;

    if (rating) {
      avg = Math.round(Number(rating.avg));
      amount = Number(rating.amount);
    }

    return res.status(200).json({
      ...product,
      rating: {
        avg,
        amount,
      },
    });
  } catch (error) {
    return next(error);
  }
};

import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { Review } from "../entities/Review";
import { AccessToken } from "../../types";
import { uploadProductFile } from "../utils/s3";
const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2023-08-16",
});

export const createStripeProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    products.forEach(async (product) => {
      const { default_price } = await stripe.products.retrieve(
        product.id.toString()
      );
      if (default_price) {
        product.stripe_price = default_price as string;
        await product.save();
      }
    });

    return res.json({ message: "success", products });
  } catch (error) {
    return next(error);
  }
};

export const updateImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { images }: {images: ProductImage[]} = req.body

    await Product.createQueryBuilder("product")
      .update()
      .set({ images })
      .where("product.id = :id", { id })
      .execute();

    return res.status(200).json({message: "success"})  
  } catch (error) {
    return next(error);
  }
};

export const setProductsSpecs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as Specs
    const {id} = req.params

    await Product.createQueryBuilder("product")
      .update()
      .set({ specifications: body})
      .where("product.id = :id", { id })
      .execute();

    return res.status(200).json({message: "success"})
  } catch (error) {
    return next(error)
  }
}