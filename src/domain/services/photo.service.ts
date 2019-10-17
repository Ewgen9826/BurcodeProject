import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhotoRepository } from "../repositories/photo.repository";
import { CreatePhotoDto } from "../dtos/photo/create-photo.dto";
import { ProductRepository } from "../repositories/product.repository";
import { Photo } from "../entities/photo.entity";
import { CustomLogger } from "../../infrastructure/logger/custom-logger.service";
import { ConfigService } from "../../infrastructure/config/config.service";
import * as fs from "fs";

@Injectable()
export class PhotoService {
  private readonly logger = new CustomLogger("PhotoService");
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
    private readonly configService: ConfigService,
  ) {}

  async createPhoto(
    productId: number,
    originalFileName: string,
    fileName: string,
  ): Promise<Photo> {
    const createPhotoDto = new CreatePhotoDto();
    const product = await this.productRepository.getProductById(productId);
    if (originalFileName === null || fileName === null) {
      this.logger.error("Photo not created");
      throw new InternalServerErrorException();
    }
    product.updateAt = new Date(Date.now());
    createPhotoDto.product = product;
    createPhotoDto.originalName = originalFileName;
    createPhotoDto.name = fileName;
    const photo = this.photoRepository.createPhoto(createPhotoDto);
    return photo;
  }

  async deletePhoto(fileName: string): Promise<void> {
    const photo = await this.photoRepository.getByName(fileName);
    try {
      fs.unlinkSync(
        `./${this.configService.environment.storePhotosPath}${fileName}`,
      );
    } catch (err) {
      this.logger.error(`Photo with name ${photo.name} not deleted`);
      throw new InternalServerErrorException();
    }
    photo.product.updateAt = new Date(Date.now());
    await this.photoRepository.deletePhoto(photo.name);
  }
}
