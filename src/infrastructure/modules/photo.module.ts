import { Module } from "@nestjs/common";
import { PhotosController } from "../../app/api/photos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { PhotoRepository } from "../../domain/repositories/photo.repository";
import { PhotoService } from "../../domain/services/photo.service";
import { CustomMulterModule } from "../multer/custom.multer.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "../multer/multer.config.service";
import { AuthModule } from "./auth.module";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([ProductRepository, PhotoRepository]),
    MulterModule.registerAsync({
      imports: [CustomMulterModule],
      useExisting: MulterConfigService,
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotoService],
})
export class PhotoModule {}
