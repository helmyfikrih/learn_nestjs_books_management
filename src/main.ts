// src/main.ts
import './polyfills'; // Impor polyfill sebelum aplikasi dijalankan
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); // Ambil PORT dari .env
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('My API Docs')
    .setDescription('API untuk user, book, dan lainnya')
    .setVersion('1.0')
    .addTag('users') // tag opsional
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // akan muncul di /api

  await app.listen(port);
}
bootstrap();