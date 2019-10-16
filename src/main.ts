import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Environment } from "./infrastructure/config/environment";
import { CustomLogger } from "./infrastructure/logger/custom-logger.service";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: false,
  });
  const logger = new CustomLogger("bootstrap");

  // get configuration file
  const env = app.get("ConfigService").env as Environment;

  // custom logger
  //app.useLogger(app.get(CustomLogger));

  // global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // configuration Swagger
  const options = new DocumentBuilder()
    .setTitle("Barcodes Application")
    .setDescription("The application is barcode scanner")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);

  await app.listen(env.port);
  logger.log(`Application listening on port ${env.port}`);
}
bootstrap();
