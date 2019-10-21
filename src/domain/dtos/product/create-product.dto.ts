import {
  IsNotEmpty,
  IsUrl,
  IsNumber,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiModelProperty({ minLength: 4, maxLength: 50, required: true })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  name: string;

  @ApiModelProperty({ minLength: 4, maxLength: 50, required: true })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  producerName: string;

  @ApiModelProperty({ required: true })
  @IsNotEmpty()
  @IsUrl()
  producerLink: string;

  @ApiModelProperty({ minLength: 10, maxLength: 100, required: true })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  taste: string;

  @ApiModelProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  priceWithoutTax: number;

  @ApiModelProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  priceOneOfPretein: number;

  @ApiModelProperty({ minLength: 4, maxLength: 50, required: true })
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(4)
  remarks: string;
}
