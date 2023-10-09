import { NextFunction, Request, Response } from "express";
import { Review } from "../entities/Review";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { AppError } from "../helpers/AppError";
import { AccessToken } from "../../types";

export const getReviewsFromProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = (await Product.findOne({
      where: { id: parseInt(id) },
    })) as Product;

    if (!product) throw new Error("No product found");

    const reviews = await Review.createQueryBuilder()
      .select("*")
      .where("product_id =:product_id", { product_id: id })
      .execute();

    return res.status(200).json({ message: "success!", reviews });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json();
  }
};

export const postReview = async (req: Request, res: Response) => {
  try {
    /* const {user} = req */
    const { body, product_id, rating } = req.body;

    const product = (await Product.findOne({
      where: {
        id: product_id,
      },
    })) as Product;

    const user = (await User.findOne({ where: { id: 29 } })) as User;

    const review = Review.create({ body, user, product, edited: false, rating });

    const newReview = await review.save();

    return res.status(200).json({ message: "Success", newReview });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json();
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = res.locals as AccessToken;

    const review = await Review.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!review) {
      throw new AppError(
        404,
        JSON.stringify({ review: "Review does not exist" })
      );
    }

    const deleteResult = await Review.createQueryBuilder()
      .delete()
      .from(Review)
      .where("id =:id", { id })
      .where("user_id =:user_id", { user_id: user?.id })
      .execute();

    if (deleteResult.affected) {
      return res.status(204).json({ message: "Review deleted" });
    }
    throw new AppError(
      401,
      JSON.stringify({ review: "You can't delete this review" })
    );
  } catch (error) {
    return next(error);
  }
};

export const editReview = async (req: Request, res: Response) => {
  try {
    const { body } = req.body;
    if (!body) {
      throw new Error("You must provide a text body to edit a review");
    }

    const editedReview = await Review.createQueryBuilder()
      .update(Review)
      .set({ body, edited: true })
      .where("id =:id", { id: req.params.id })
      .returning("*")
      .execute();

    return res
      .status(200)
      .json({ message: "Success!", editedReview: editedReview.raw });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error });
  }
};
