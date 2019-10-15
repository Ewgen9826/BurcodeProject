import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createAt: Date;

  @Column()
  url: string;

  @ManyToOne(() => Product, product => product.photos)
  product: Product;
}
