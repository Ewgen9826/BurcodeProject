import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { Photo } from "./photo.entity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  producerName: string;

  @Column()
  producerLink: string;

  @Column()
  taste: string;

  @Column()
  priceWithoutTax: number;

  @Column()
  priceOneOfPretein: number;

  @Column()
  remarks: string;

  @Column()
  createAt: Date;

  @Column()
  updateAt: Date;

  @OneToMany(() => Photo, photo => photo.product)
  photos: Photo[];
}
