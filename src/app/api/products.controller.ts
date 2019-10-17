import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ProductsService } from "../../domain/services/product.service";
import { CreateProductDto } from "../../domain/dtos/product/create-product.dto";
import { UpdateProductDto } from "../../domain/dtos/product/update-product.dto";
import { ProductDto } from "../../domain/dtos/product/product.dto";
import { ProductSearchModel } from "../../domain/search-models/product.search.model";

@Controller("api/products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async search(
    @Query() productSearchModel: ProductSearchModel,
  ): Promise<ProductDto[]> {
    const products = await this.productsService.search(productSearchModel);
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
    @Param("id", ParseIntPipe) id: number,
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
