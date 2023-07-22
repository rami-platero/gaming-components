import { type } from "os";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

export enum Category {
  GPU="Graphics Card",
  CPU="CPU",
  Monitor="Monitor"
}

export interface ProductImage{
  thumbnail: string
  xl: string
}


@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: Category

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  main_image: ProductImage 

  @Column({type: "simple-array", nullable: true})
  images: ProductImage[]

}
