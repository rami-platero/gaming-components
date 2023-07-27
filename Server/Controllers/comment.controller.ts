import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/Comment";
import { Product } from "../entities/Product";
import { User } from "../entities/User";
import { AppError } from "../helpers/AppError";

export const getCommentsFromProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = (await Product.findOne({
      where: { id: parseInt(id) },
    })) as Product;

    if (!product) throw new Error("No product found");

    const comments = await Comment.createQueryBuilder()
      .select("*")
      .where("product_id =:product_id", { product_id: id })
      .execute();

    return res.status(200).json({ message: "success!", comments });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json();
  }
};

export const postComment = async (req: Request, res: Response) => {
  try {
    /* const {user} = req */
    const { body, product_id } = req.body;

    const product = (await Product.findOne({
      where: {
        id: product_id,
      },
    })) as Product;

    const user = (await User.findOne({ where: { id: 8 } })) as User;

    const comment = Comment.create({ body, user, product, edited: false });

    const newComment = await comment.save();

    return res.status(200).json({ message: "Success", newComment });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json();
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const comment = await Comment.findOne({
      where: {
        id: parseInt(id),
      },
    });

    if (!comment) {
      throw new AppError(
        404,
        JSON.stringify({ comment: "Comment does not exist" })
      );
    }

    const deleteResult = await Comment.createQueryBuilder()
      .delete()
      .from(Comment)
      .where("id =:id", { id })
      .where("user_id =:user_id", { user_id: user?.id })
      .execute();

    if (deleteResult.affected) {
      return res.status(204).json({ message: "Comment deleted" });
    }
    throw new AppError(
      401,
      JSON.stringify({ comment: "You can't delete this comment" })
    );
  } catch (error) {
    return next(error);
  }
};

export const editComment = async (req: Request, res: Response) => {
  try {
    const { body } = req.body;
    if (!body) {
      throw new Error("You must provide a text body to edit a comment");
    }

    const editedComment = await Comment.createQueryBuilder()
      .update(Comment)
      .set({ body, edited: true })
      .where("id =:id", { id: req.params.id })
      .returning("*")
      .execute();

    return res
      .status(200)
      .json({ message: "Success!", editedComment: editedComment.raw });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error });
  }
};
