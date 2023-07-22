import { Request, Response } from "express";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

export const createToken = (_id: number): string => {
  return jwt.sign({ _id }, process.env.JWT_SECRET!);
};

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signUp(username,email,password)
    const token = createToken(user.id)
    return res.status(200).json({ user,token });
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({ error: error.message });
    }
    return 
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    
    const user = await User.login(username,password)
    const token = createToken(user.id)
    return res.status(200).json({ user,token });
  } catch (error) {
    if(error instanceof Error){
        return res.status(500).json({ error: error.message });
    }
    return 
  }
};

export const getGoogleUser = async (req:Request, res: Response)=>{
  try {
    console.log("req.user is", req.user)
    return res.status(200).json({user: req.user})
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({ error: error.message });
  }
  return 
  }
}

export const deleteUser = async (req:Request, res:Response)=>{
  const {id} = req.params
  try {
    const user = await User.findBy({id: parseInt(id)})
    if(!user) return res.status(404).json({error: "User not found"})
    await User.delete({id: parseInt(id)})
    return res.status(204).json({message: "Removed user successfully"})
  } catch (error) {
    if(error instanceof Error){
      return res.status(500).json({ error: error.message });
    }
    return
  }
}

export const logout = async (req:Request,_res: Response)=>{
  try {
    if(req.user){
    }
  } catch (error) {
    
  }
}
