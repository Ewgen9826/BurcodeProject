import { Product } from "../entities/product.entity";
import { getRepository, SelectQueryBuilder } from "typeorm";
import { IsOptional, IsIn, IsEnum } from "class-validator";
import { ProductPredicateEnum } from "../enums/product.predicate.enum";
import { ApiImplicitQuery, ApiModelPropertyOptional } from "@nestjs/swagger";

export class ProductSearchModel {
  private readonly queryBuilder: SelectQueryBuilder<Product>;

  constructor() {
    this.queryBuilder = getRepository(Product).createQueryBuilder("product");
  }
  @ApiModelPropertyOptional()
  ids: string;

  @ApiModelPropertyOptional()
  name: string;

  @ApiModelPropertyOptional()
  producerName: string;

  @ApiModelPropertyOptional()
  producerLink: string;

  @ApiModelPropertyOptional()
  taste: string;

  @ApiModelPropertyOptional()
  remarks: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  skip: number = 0;

  @ApiModelPropertyOptional()
  @IsOptional()
  take: number = 10;

  @ApiModelPropertyOptional({
    enum: ["name", "producer", "date", "price"],
  })
  @IsOptional()
  @IsEnum(ProductPredicateEnum)
  predicate: ProductPredicateEnum = ProductPredicateEnum.Default;

  @ApiModelPropertyOptional({
    enum: ["true", "false"],
  })
  @IsOptional()
  @IsIn(["false", "true"])
  revers: string = "false";

  private ordering() {
    switch (this.predicate) {
      case ProductPredicateEnum.Date:
        this.order("createAt");
        break;
      case ProductPredicateEnum.Price:
        this.order("priceWithoutTax");
        break;
      case ProductPredicateEnum.Producer:
        this.order("producerName");
        break;
      case ProductPredicateEnum.Name:
        this.order("name");
        break;
      default:
        this.order("id");
    }
  }

  private filter() {
    // get products by ids
    if (this.ids) {
      const arrayIds = this.ids.split(",");
      this.queryBuilder.andWhereInIds(arrayIds);
    }

    // get products by name
    if (this.name) {
      this.queryBuilder.andWhere("product.name LIKE :name", {
        name: `${this.name}%`,
      });
    }

    // get products by producerName
    if (this.producerName) {
      this.queryBuilder.andWhere("product.producerName LIKE :producerName", {
        producerName: `${this.producerName}%`,
      });
    }

    // get products by taste
    if (this.taste) {
      this.queryBuilder.andWhere("product.taste LIKE :taste", {
        taste: `${this.taste}%`,
      });
    }

    // get products by remarks
    if (this.remarks) {
      this.queryBuilder.andWhere("product.remarks LIKE :remarks", {
        remarks: `${this.remarks}%`,
      });
    }
  }

  private order(predicateValue: string): SelectQueryBuilder<Product> {
    return this.queryBuilder.orderBy(
      `product.${predicateValue}`,
      this.revers === "true" ? "DESC" : "ASC",
    );
  }

  async find(): Promise<Product[]> {
    this.filter();
    this.ordering();
    const products = await this.queryBuilder
      .offset(this.skip)
      .limit(this.take)
      .getMany();
    return products;
  }
}
