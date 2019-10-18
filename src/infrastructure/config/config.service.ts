import * as dotenv from "dotenv";
import * as fs from "fs";
import { Environment } from "./environment";
import { validateOrReject } from "class-validator";
import { join } from "path";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Options } from "./options";

@Injectable()
export class ConfigService {
  private env: Environment;
  constructor(private options: Options) {
    const filePath = `${process.env.NODE_ENV || "development"}.env`;
    const config = dotenv.parse(
      fs.readFileSync(join(options.folder, filePath)),
    );
    this.validate(config)
      .then(result => (this.env = result))
      .catch(error => {
        throw new InternalServerErrorException(error);
      });
  }

  public get environment(): Environment {
    return this.env;
  }

  private async validate(config): Promise<Environment> {
    const env: Environment = new Environment();
    for (const key of Object.keys(env)) {
      if (typeof env[key] === "number") {
        env[key] = +config[key];
      } else {
        env[key] = config[key];
      }
    }
    try {
      await validateOrReject(env);
      return env;
    } catch (error) {
      throw new Error(`Config validation error: ${error}`);
    }
  }
}
