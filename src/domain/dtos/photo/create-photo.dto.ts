import { Product } from "src/domain/entities/product.entity";

export class CreatePhotoDto {
  originalName: string;
  name: string;
  product: Product;
}
