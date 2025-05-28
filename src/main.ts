// src/main.ts
import './polyfills'; // Impor polyfill sebelum aplikasi dijalankan
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000); // Ambil PORT dari .env
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();