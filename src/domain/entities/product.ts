import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  producerName: string;

  @Column()
  produceLink: string;

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
