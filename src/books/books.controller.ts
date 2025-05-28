// src/books/books.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post()
    create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @Get()
    findAll(): Promise<Book[]> {
        // console.log('Fetching all books...'); // Tambahkan log
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        return this.booksService.update(+id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(+id);
    }
}