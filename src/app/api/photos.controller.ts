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
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitFile,
  ApiImplicitParam,
} from "@nestjs/swagger";

@ApiUseTags("photos")
@Controller("api/:productId/photos")
export class PhotosController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly configService: ConfigService,
  ) {}

  @Get("/:fileName")
  get(@Param("fileName") fileName: string, @Res() res) {
    if (fileName === null) {
      return new NotFoundException("Image not found");
    }
    res.sendFile(fileName, {
      root: this.configService.environment.storePhotosPath,
    });
  }

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor("file"))
  @ApiBearerAuth()
  @ApiImplicitFile({ required: true, name: "file" })
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
  @ApiBearerAuth()
  async delete(@Param("fileName") fileName: string) {
    this.photoService.deletePhoto(fileName);
  }
}
