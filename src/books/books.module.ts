// src/books/books.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { Store } from '../stores/store.entity'; // Tambahkan impor Store

@Module({
  imports: [TypeOrmModule.forFeature([Book, Store])],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}