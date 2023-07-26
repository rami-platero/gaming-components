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

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date,
  updatedAt: Date
}

@Entity()
export class User extends BaseEntity implements IUser{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column({nullable: true})
  password: string;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public static async signUp(username: string, email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      throw Error("All fields must be filled");
    }
    const exists = await User.findOneBy({ email });
    if (exists) {
      throw Error(JSON.stringify({ email: "Email already in use" }));
    }
    const existsName = await User.findOneBy({ username });
    if (existsName) {
      throw Error(JSON.stringify({ username: "Username already in use" }));
    }
    if (!validator.isEmail(email)) {
      throw Error(JSON.stringify({ email: "Email is not valid" }));
    }
    if (!validator.isStrongPassword(password)) {
      throw Error(JSON.stringify({ password: "Password not strong enough" }));
    }
    if (!validator.isAlphanumeric(username)) {
      throw Error(
        JSON.stringify({
          username: "Username can only contain letters and numbers",
        })
      );
    }
    if (!validator.isLength(username, { min: 3, max: 15 })) {
      throw Error(
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
    return await user.save();
  }

  public static async login(username: string, password: string) {
    const user = await User.findOneBy({ username });
    if (!user) {
      throw Error(JSON.stringify({ username: "Username does not exist" }));
    }
    const match: boolean = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error(JSON.stringify({ password: "Incorrect password" }));
    }
    return user
  }
}
