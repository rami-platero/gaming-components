import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { DecodedToken } from "../types";
dotenv.config({ path: __dirname + "/.env" });

export const createToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "10y" });
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signUp(username, email, password);
    const token = createToken(user.id);
    return res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user.id);
    return res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const loginWithGoogle = async (req: Request, res: Response) => {
  if (req.user && req.user instanceof User) {
    const token = createToken(req.user.id);
    res.cookie("token", token);
  }
  return res.redirect("http://localhost:5173");
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;
      const user = await User.findOne({ where: { id: decodedToken.id } });
      return res.status(200).json({ ...user });
    } else {
      return res.status(204);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: "Error" });
    }
    return res.status(400).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findBy({ id: parseInt(id) });
    if (!user) return res.status(404).json({ error: "User not found" });
    await User.delete({ id: parseInt(id) });
    return res.status(204).json({ message: "Removed user successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.createQueryBuilder()
      .update(User)
      .set(req.body)
      .where("id =:id", { id: req.params.id })
      .returning("*")
      .execute()
    
    return res.status(200).json({message: "success", updatedUser})
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    return res.status(200).json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(400).json({ error });
  }
};
