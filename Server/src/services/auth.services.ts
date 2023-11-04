import { User } from "../entities/User";
import { AppError } from "../helpers/AppError";
import bcrypt from "bcrypt";
import validator from "validator";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOneBy({ email });
  if (!user) {
    throw new AppError(
      400,
      JSON.stringify({ email: "Email address is not registered." })
    );
  }
  if (!user.password) {
    throw new AppError(
      403,
      JSON.stringify({ message: "User is registered with a Google account." })
    );
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(
      401,
      JSON.stringify({ password: "Password does not match!" })
    );
  }
  return user;
};

export const signUpUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (!email.trim() || !password.trim()) {
    throw Error("All fields must be filled");
  }
  const exists = await User.findOneBy({ email });
  if (exists) {
    throw new AppError(400, JSON.stringify({ email: "Email already in use" }));
  }
  const existsName = await User.findOneBy({ username });
  if (existsName) {
    throw new AppError(
      400,
      JSON.stringify({ username: "Username already in use" })
    );
  }
  if (!validator.isEmail(email)) {
    throw new AppError(400, JSON.stringify({ email: "Email is not valid" }));
  }
  if (!validator.isAlphanumeric(username)) {
    throw new AppError(
      400,
      JSON.stringify({
        username: "Username can only contain letters and numbers",
      })
    );
  }
  if (!validator.isLength(username, { min: 3, max: 15 })) {
    throw new AppError(
      400,
      JSON.stringify({
        username: "Username must be between 3 and 15 characters",
      })
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new User();
  user.username = username;
  user.email = email;
  user.password = hash;
  user.refreshToken = [];
  return await user.save();
};

export const comparePasswords = async (userPassword: string, enteredPassword: string) => {
  return await bcrypt.compare(enteredPassword, userPassword);
}
