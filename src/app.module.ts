import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { TypeOrmConfigService } from "./infrastructure/database/typeorm.service";
import { ProductModule } from "./infrastructure/modules/product.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseModule],
      useExisting: TypeOrmConfigService,
    }),
    ProductModule,
  ],
  providers: [],
})
export class AppModule {}
