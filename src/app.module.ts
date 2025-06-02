// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { StoresModule } from './stores/stores.module';
import { typeOrmConfig } from './config/database_config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { AppController } from './app.controller';
import { ProfileModule } from './profile/profile.module';

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
    UsersModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule { }