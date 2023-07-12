import { Request, Response } from "express";
import { User } from "../entities/User";

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    await user.save();
    return res.status(200).json({ message: "new user created" });
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({ error: error.message });
    }
    return 
  }
};
