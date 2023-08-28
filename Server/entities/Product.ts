import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import {Comment} from './Comment'

export enum Category {
  GPU = "Graphics Card",
  CPU = "CPU",
  Monitor = "Monitor",
}

export interface ProductImage {
  thumbnail: string;
  xl: string;
}

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  category: Category;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column('jsonb', { nullable: true })
  main_image: ProductImage;

  @Column("simple-array",{ nullable: true })
  images: ProductImage[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
