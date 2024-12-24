import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  const docsPath = 'api';

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Reviews API Documentation`)
    .setDescription(
      'A package that generates TypeScript interfaces and API client based on Swagger documentation: ' +
        '<a href="https://www.npmjs.com/package/swagger-typescript-api" target="_blank">swagger-typescript-api</a>. ' +
        `JSON schema can be found <a href="/${docsPath}-json" target="_blank">here</a>.`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(docsPath, app, document);

  await app.listen(3000);
}
bootstrap();
