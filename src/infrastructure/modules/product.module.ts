import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggerModule } from "../logger/logger.module";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductController } from "../../app/api/product.controller";
import { ProductsService } from "../../domain/services/product.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), LoggerModule],
  controllers: [ProductController],
  providers: [ProductsService],
})
export class ProductModule {}
