import { Module } from "@nestjs/common";
import { PhotosController } from "../../app/api/photos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { PhotoRepository } from "../../domain/repositories/photo.repository";
import { LoggerModule } from "../logger/logger.module";
import { PhotoService } from "../../domain/services/photo.service";
import { CustomMulterModule } from "../multer/custom.multer.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "../multer/multer.config.service";
import { ConfigModule } from "../config/config.module";
@Module({
  imports: [
    ConfigModule.register({ folder: "./env" }),
    TypeOrmModule.forFeature([ProductRepository, PhotoRepository]),
    MulterModule.registerAsync({
      imports: [CustomMulterModule],
      useExisting: MulterConfigService,
    }),
    LoggerModule,
  ],
  controllers: [PhotosController],
  providers: [PhotoService],
})
export class PhotoModule {}
