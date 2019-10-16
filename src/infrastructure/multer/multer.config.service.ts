import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ConfigService } from "../config/config.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: this.configService.environment.storePhotosPath,
        filename: (req, file, cb) => {
          return cb(null, `${this.randomValue}${extname(file.originalname)}`);
        },
      }),
    };
  }

  private get randomValue(): string {
    return Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join("");
  }
}
