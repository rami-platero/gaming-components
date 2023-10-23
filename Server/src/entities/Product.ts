import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Review } from "./Review";
import slugify from "slugify";
import { OrderItem } from "./OrderItem";

export enum Category {
  GPU = "Graphics Card",
  CPU = "CPU",
  Monitor = "Monitor",
}

export interface ProductImage {
  thumbnail?: string;
  xl: string;
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true,
    unique: true,
  })
  slug: string;

  @BeforeInsert()
  generateSlug() {
    this.slug = slugify(this.name, {
      lower: true,
      replacement: "_",
      strict: true,
    });
  }

  @Column()
  category: Category;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ nullable: true })
  brand: string;

  @Column("jsonb", { nullable: true })
  images: ProductImage[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column({ nullable: true })
  stripe_price: string;

  @OneToMany(
    () => OrderItem,
    (orderItem) => {
      orderItem.product;
    },
    { onDelete: "SET NULL" }
  )
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export type TProduct = typeof Product;
