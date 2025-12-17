import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { changePasswordSchema, loginSchema, signUpSchema } from "../schemas/auth.schema";
import {
  CreateProductSchema,
  GPUSpecsSchema,
  KeyboardsSpecsSchema,
  MotherboardsSpecsSchema,
  createProductSchema,
  getProductSchema,
} from "../schemas/products.schema";
import { Category, Product } from "../entities/Product";
import { AppError } from "../helpers/AppError";

export const validateBody =
  (
    schema:
      | z.AnyZodObject
      | z.ZodOptional<z.AnyZodObject>
      | z.ZodEffects<z.AnyZodObject>
      | CreateProductSchema
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if ("specifications" in req.body && typeof req.body.specifications === "string") {
        req.body.specifications = JSON.parse(req.body.specifications);
      }
      console.log(req.body);
      await schema.parseAsync(req.body);
      return next();
    } catch (error) {
      console.log(error);
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({
          path: [...e.path],
          message: e.message,
        }));
      }
      return res.status(409).json({
        status: "failed",
        error: err,
      });
    }
  };

export const validateParams =
  (
    schema:
      | z.AnyZodObject
      | z.ZodOptional<z.AnyZodObject>
      | z.ZodEffects<z.AnyZodObject>
      | z.ZodDiscriminatedUnion<"category", [z.AnyZodObject]>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.params);
      return next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({
          path: [...e.path],
          message: e.message,
        }));
      }
      return res.status(409).json({
        status: "failed",
        error: err,
      });
    }
  };

export const validateLogin = validateBody(loginSchema);
export const validateSignUp = validateBody(signUpSchema);
export const validateCreateProduct = validateBody(createProductSchema);
export const validateChangePassword = validateBody(changePasswordSchema)
export const validateGetProduct = validateParams(getProductSchema)

export const validateProductsSchema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!product) {
      throw new AppError(
        404,
        JSON.stringify({ message: "Product does not exist." })
      );
    }
  
    switch (product?.category) {
      case Category.GPUs:
        await GPUSpecsSchema.parseAsync(req.body);
        return next();

      case Category.Motherboards:
        await MotherboardsSpecsSchema.parseAsync(req.body);
        return next();

      case Category.Keyboards:
        await KeyboardsSpecsSchema.parseAsync(req.body);
        return next();

      default:
        throw Error("Internal server error");
    }
  } catch (error) {
    let err = error;
    if (err instanceof z.ZodError) {
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
    }
    return res.status(409).json({
      status: "failed",
      error: err,
    });
  }
};
