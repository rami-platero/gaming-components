import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany,
  } from "typeorm";

  @Entity()
  export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", length: 255})
    body: string
  }