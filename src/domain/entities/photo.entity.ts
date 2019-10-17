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
  originalName: string;

  @Column()
  createAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => Product, product => product.photos)
  product: Product;
}
