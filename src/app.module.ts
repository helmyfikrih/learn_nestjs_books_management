// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { StoresModule } from './stores/stores.module';
import { typeOrmConfig } from './config/database_config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig], // Daftarkan konfigurasi
    }),
    // TypeOrmModule.forRoot(typeOrmConfig()),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database')
      }),
    }),
    BooksModule,
    StoresModule,
    AuthModule,
  ],
})
export class AppModule {}