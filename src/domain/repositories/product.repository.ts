import { Repository, EntityRepository } from "typeorm";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CustomLogger } from "../../infrastructure/logger/custom-logger.service";
import { Product } from "../entities/product.entity";
import { CreateProductDto } from "../dtos/product/create-product.dto";
import { UpdateProductDto } from "../dtos/product/update-product.dto";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private readonly logger = new CustomLogger("ProductRepository");
  async getProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder("product");

    try {
      const places = await query.getMany();
      return places;
    } catch (error) {
      this.logger.error(error.message, error.trace);
      throw new InternalServerErrorException();
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const {
      name,
      producerName,
      producerLink,
      priceOneOfPretein,
      priceWithoutTax,
      remarks,
      taste,
    } = createProductDto;

    const product = new Product();
    product.name = name;
    product.producerName = producerName;
    product.producerLink = producerLink;
    product.priceOneOfPretein = priceOneOfPretein;
    product.priceWithoutTax = priceWithoutTax;
    product.taste = taste;
    product.remarks = remarks;
    const date = new Date(Date.now());
    product.createAt = date;
    product.updateAt = date;

    try {
      product.save();
    } catch (error) {
      this.logger.error(error.message, error.trace);
      throw new InternalServerErrorException();
    }
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const {
      name,
      producerName,
      producerLink,
      priceOneOfPretein,
      priceWithoutTax,
      remarks,
      taste,
    } = updateProductDto;

    const product = await this.getProductById(id);
    product.name = name;
    product.producerName = producerName;
    product.producerLink = producerLink;
    product.priceOneOfPretein = priceOneOfPretein;
    product.priceWithoutTax = priceWithoutTax;
    product.taste = taste;
    product.remarks = remarks;
    product.updateAt = new Date(Date.now());
    try {
      product.save();
    } catch (error) {
      this.logger.error(error.message, error.trace);
      throw new InternalServerErrorException();
    }
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      const errorMessage = `Product with ID: ${id} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
  }

  async getProductById(id: number): Promise<Product> {
    console.log(id);
    const product = await this.findOne({ id });
    if (!product) {
      const errorMessage = `Product with ID ${id} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
    return product;
  }
}
