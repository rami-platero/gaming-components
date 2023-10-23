import { NextFunction, Request, Response } from "express";
import { Review } from "../entities/Review";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { AppError } from "../helpers/AppError";
import { AccessToken } from "../../types";
import { getFileURL } from "../utils/s3";

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

export const postReview = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const decodedUser = res.locals.user as AccessToken["user"];
    const { id } = req.params;
    const { body, rating } = req.body;

    const product = (await Product.findOne({
      where: {
        id: Number(id),
      },
    })) as Product;

    const exists = await Review.findOne({
      where: {
        user: {
          id: decodedUser.id,
        },
        product: {
          id: Number(id)
        }
      },
    });

    if (exists)
      throw new AppError(
        400,
        JSON.stringify({ message: "You have already reviewed this product!" })
      );

    const user = (await User.findOne({
      where: { id: decodedUser.id },
    })) as User;

    const review = Review.create({
      body,
      user,
      product,
      edited: false,
      rating,
    });

    await review.save();
    const { product: xd, user: reviewUser, ...rest } = review;
    const responseReview = {
      ...rest,
      product_id: review.product.id,
      avatar: null,
      username: review.user.username,
      user_id: review.user.id
    };

    return res.status(200).json(responseReview);
  } catch (error) {
    console.log(error);
    return next(error)
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
        JSON.stringify({ message: "Review does not exist" })
      );
    }

    const deleteResult = await Review.createQueryBuilder()
      .delete()
      .from(Review)
      .where("id =:id", { id })
      .where("user_id =:user_id", { user_id: user?.id })
      .execute();

    if (deleteResult.affected) {
      return res.sendStatus(204)
    }
    throw new AppError(
      401,
      JSON.stringify({ message: "You can't delete this review" })
    );
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const editReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {user} = res.locals as AccessToken
    const {id} = req.params
    const { body } = req.body;
    if (!body) {
      throw new Error("You must provide a text body to edit a review");
    }

    await Review.createQueryBuilder()
      .update(Review)
      .set({ body, edited: true })
      .where("id =:id", { id: Number(id) })
      .andWhere("user_id =:user_id", {user_id: user.id})
      .execute();

    return res.status(200).json({ message: "Success!"});
  } catch (error) {
    console.log(error);
    return next(error)
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, date } = req.query;
    const { id } = req.params;

    console.log(new Date(Number(date)));

    let reviews = (await Review.createQueryBuilder("review")
      .select([
        "review.*",
        "user.username AS username",
        "user.id AS user_id",
        "user.avatar AS avatar",
      ])
      .innerJoin("review.user", "user")
      .where("review.product_id=:product_id", { product_id: id })
      .andWhere("review.createdAt < :date", {date: new Date(Number(date)).toISOString()})
      .offset(Number(offset))
      .limit(5)
      .orderBy("review.createdAt", "DESC")
      .execute()) as (Review & { avatar: string | null; username: string, user_id: string })[];

    for (let review of reviews) {
      if (review.avatar) {
        const signedUrl = await getFileURL(review.avatar);
        review.avatar = signedUrl;
      }
    }

    const totalReviewsQuery = Review.createQueryBuilder()
      .select("COUNT(*)", "count")
      .where("product_id = :product_id", { product_id: id });

    const [{ count }] = await totalReviewsQuery.getRawMany();
    const hasNextPage = count > Number(offset) + reviews.length;

    return res.status(200).json({ hasNextPage, reviews });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
