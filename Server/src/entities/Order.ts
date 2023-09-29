import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  session_id: string;

  @Column({ nullable: true })
  payment_intent: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(
    () => OrderItem,
    (orderItem) => {
      orderItem.order;
    },
    { onDelete: "RESTRICT", nullable: true }
  )
  orderItems: OrderItem[];

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  mode: string;

  @Column({ nullable: true })
  subtotal: number;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  payment_status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
