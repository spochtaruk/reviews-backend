import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
