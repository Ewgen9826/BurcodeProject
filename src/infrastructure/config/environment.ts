import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsNotEmpty,
  IsIn,
} from "class-validator";
import { TypeDatabase } from "./type-database";
export class Environment {
  @IsNumber()
  @Min(2000)
  port: number = 0;

  @IsNotEmpty()
  databaseType: TypeDatabase = "mysql";

  @IsString()
  @MinLength(4)
  databaseHost: string = "";

  @IsString()
  @MinLength(4)
  databaseUsername: string = "";

  @IsString()
  @MinLength(4)
  databasePassword: string = "";

  @IsString()
  @MinLength(4)
  databaseName: string = "";

  @IsIn(["true", "false"])
  databaseSynchronize: string = "false";

  @IsNumber()
  @Min(2000)
  databasePort: number = 0;
}
