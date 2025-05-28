// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Membuat ConfigModule tersedia di semua modul
      envFilePath: '.env', // Lokasi file .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_DEV_HOST', 'db'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'mimiplsss'),
        database: configService.get<string>('DATABASE_NAME', 'book_management'),
        entities: [Book],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    BooksModule,
  ],
})
export class AppModule {}