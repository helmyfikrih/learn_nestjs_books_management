import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const book = this.bookRepository.create(createBookDto);
        return this.bookRepository.save(book);
    }

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find();
    }

    async findOne(id: number): Promise<Book> {
        const book = await this.bookRepository.findOneBy({ id });
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findOne(id);
        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }

    async remove(id: number): Promise<void> {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
}