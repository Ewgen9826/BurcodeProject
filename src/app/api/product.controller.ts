import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductsService } from "../../domain/services/product.service";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { ProductDto } from "../../domain/dtos/product/product.dto";

@Controller("api/products")
export class ProductController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<ProductDto[]> {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get("/:id")
  async get(@Param() id: number): Promise<ProductDto> {
    const product = await this.productsService.getProduct(id);
    return product;
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    const product = await this.productsService.createProduct(createProductDto);
    return product;
  }

  @Put("/:id")
  async update(
    @Param() id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.productsService.updateProduct(
      id,
      updateProductDto,
    );
    return product;
  }

  @Delete("/:id")
  async delete(@Param() id: number): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
