import { EntityRepository, Repository } from "typeorm";
import { Photo } from "../entities/photo.entity";
import { CreatePhotoDto } from "../dtos/photo/create-photo.dto";
import { CustomLogger } from "../../infrastructure/logger/custom-logger.service";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  private readonly logger = new CustomLogger("PhotRepository");
  async createPhoto(createPhotDto: CreatePhotoDto): Promise<Photo> {
    const { originalName, name, product } = createPhotDto;
    const photo = new Photo();
    photo.originalName = originalName;
    photo.name = name;
    photo.product = product;
    photo.createAt = new Date(Date.now());

    try {
      photo.save();
    } catch (error) {
      this.logger.error(error.message, error.trace);
      throw new InternalServerErrorException();
    }
    return photo;
  }

  async deletePhoto(name: string) {
    const result = await this.delete({ name });
    if (result.affected === 0) {
      const errorMessage = `Photo with Key: ${name} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
  }

  async getByName(name: string): Promise<Photo> {
    const photo = await this.findOne({ name });
    if (!photo) {
      const errorMessage = `Photo with name ${name} not found`;
      this.logger.error(errorMessage);
      throw new NotFoundException(errorMessage);
    }
    return photo;
  }
}
