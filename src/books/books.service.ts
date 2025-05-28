import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from './dto/pagination.dto';
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

    async findAll(paginationDto: PaginationDto): Promise<{
        data: Book[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const { page = 1, limit = 2 } = paginationDto;

        // Validasi bahwa page dan limit adalah number dan tidak NaN
        if (isNaN(page) || isNaN(limit)) {
            throw new BadRequestException('Page and limit must be valid numbers');
        }

        const skip = (page - 1) * limit;

        // Pastikan skip adalah number positif
        if (skip < 0 || isNaN(skip)) {
            throw new BadRequestException('Invalid pagination parameters');
        }

        const [data, total] = await this.bookRepository.findAndCount({
            skip,
            take: limit,
        });

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
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