import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductsController } from "../../app/api/products.controller";
import { ProductsService } from "../../domain/services/product.service";
import { AuthModule } from "./auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductModule {}
