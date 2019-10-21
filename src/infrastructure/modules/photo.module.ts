import { Module } from "@nestjs/common";
import { PhotosController } from "../../app/api/photos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { PhotoRepository } from "../../domain/repositories/photo.repository";
import { PhotoService } from "../../domain/services/photo.service";
import { AuthModule } from "./auth.module";
import { CustomMulterModule } from "../multer/custom.multer.module";

@Module({
  imports: [
    AuthModule,
    CustomMulterModule,
    TypeOrmModule.forFeature([ProductRepository, PhotoRepository]),
  ],
  controllers: [PhotosController],
  providers: [PhotoService],
})
export class PhotoModule {}
