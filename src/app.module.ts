import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { TypeOrmConfigService } from "./infrastructure/database/typeorm.service";
import { ProductModule } from "./infrastructure/modules/product.module";
import { PhotoModule } from "./infrastructure/modules/photo.module";
import { AuthModule } from "./infrastructure/modules/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useExisting: TypeOrmConfigService,
    }),
    ProductModule,
    PhotoModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
