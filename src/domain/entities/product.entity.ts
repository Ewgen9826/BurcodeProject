import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

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
  imagePath: string;
}
