// src/books/books.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Store } from '../stores/entities/store.entity'; // Tambahkan impor Store

@Module({
  imports: [TypeOrmModule.forFeature([Book, Store])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}