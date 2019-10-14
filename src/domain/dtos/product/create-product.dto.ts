import { IsNotEmpty, IsUrl, IsNumber } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  producerName: string;

  @IsNotEmpty()
  @IsUrl()
  producerLink: string;

  @IsNotEmpty()
  taste: string;

  @IsNotEmpty()
  @IsNumber()
  priceWithoutTax: number;

  @IsNotEmpty()
  @IsNumber()
  priceOneOfPretein: number;

  @IsNotEmpty()
  remarks: string;

  @IsNotEmpty()
  @IsUrl()
  imagePath: string;
}
