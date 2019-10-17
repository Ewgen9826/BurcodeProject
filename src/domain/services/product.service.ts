import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "../dtos/product/update-product.dto";
import { CreateProductDto } from "../dtos/product/create-product.dto";
import { ProductSearchModel } from "../search-models/product.search.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}
  async search(productSearchModel: ProductSearchModel): Promise<Product[]> {
    const products = await productSearchModel.find();
    return products;
  }

  async getProduct(id: number): Promise<Product> {
    const product = await this.productRepository.getProductById(id);
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.createProduct(
      createProductDto,
    );
    return product;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.updateProduct(
      id,
      updateProductDto,
    );
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
