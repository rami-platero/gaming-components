import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  body: string;

  @Column({ nullable:false, default: false })
  edited: boolean;

  @Column()
  rating: number

  @ManyToOne(() => Product, (product) => product.reviews, {onDelete: "CASCADE"})
  @JoinColumn({ name: "product_id" })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
