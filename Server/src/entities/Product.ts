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
  GPUs = "GPUs",
  CPUs = "CPUs",
  Monitors = "Monitors",
  Motherboards = "Motherboards",
  Mouse = "Mouse",
  Keyboards = "Keyboards",
  RAM = "RAM"
}

export interface ProductImage {
  thumbnail?: string;
  xl: string;
}

export type Specs = {
  [key: string]: {
    name: string,
    value: string
  }
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

  @Column({type: "enum", enum: Category, nullable: true})
  category: Category;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  brand: string;

  @Column({nullable: true, type: "jsonb"})
  specifications: Specs

  @Column("jsonb")
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
