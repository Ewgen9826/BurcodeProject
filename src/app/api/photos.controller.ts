import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
  Get,
  NotFoundException,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PhotoService } from "../../domain/services/photo.service";
import { Photo } from "../../domain/entities/photo.entity";
import { ConfigService } from "../../infrastructure/config/config.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("api/:productId/photos")
export class PhotosController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly configService: ConfigService,
  ) {}

  @Get("/:id")
  get(@Param("id") id: string, @Res() res) {
    if (id === null) {
      return new NotFoundException("Image not found");
    }
    res.sendFile(id, {
      root: this.configService.environment.storePhotosPath,
    });
  }

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file,
    @Param("productId") productId: number,
  ): Promise<Photo> {
    const photo = await this.photoService.createPhoto(
      productId,
      file.originalname,
      file.filename,
    );
    return photo;
  }

  @Delete("/:fileName")
  @UseGuards(AuthGuard())
  async delete(@Param("fileName") fileName: string) {
    this.photoService.deletePhoto(fileName);
  }
}
