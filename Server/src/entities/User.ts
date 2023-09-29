import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import bcrypt from "bcrypt";
import validator from "validator";
import { Comment } from "./Comment";
import { AppError } from "../helpers/AppError";
import { Order } from "./Order";

export enum Roles {
  user = "User",
  admin = "Admin",
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Roles[];
  createdAt: Date;
  updatedAt: Date;
}

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({nullable: true})
  avatar: string

  @Column({ type: "simple-array" })
  refreshToken: string[];

  @Column({ nullable: true })
  customer_id: string;

  @Column({ type: "enum", enum: Roles, array: true, default: [Roles.user] })
  roles: Roles[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public static async signUp(
    username: string,
    email: string,
    password: string
  ) {
    if (!email.trim() || !password.trim()) {
      throw Error("All fields must be filled");
    }
    const exists = await User.findOneBy({ email });
    if (exists) {
      throw new AppError(
        400,
        JSON.stringify({ email: "Email already in use" })
      );
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
  }

  public static async login(email: string, password: string) {
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
  }
}
