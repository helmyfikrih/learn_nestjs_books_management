import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity'; // Tambahkan impor ini

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const { storeId, ...bookData } = createBookDto;
        const store = await this.storeRepository.findOneBy({ id: storeId });
        if (!store) {
            throw new NotFoundException(`Store with ID ${storeId} not found`);
        }
        const book = this.bookRepository.create({ ...bookData, store });
        return this.bookRepository.save(book);
    }

    async findAll(paginationDto: PaginationDto): Promise<{
        data: Book[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }> {
        const { page = 1, limit = 2, storeName, year, storeLocation, minYear, maxYear } = paginationDto;

        if (isNaN(page) || isNaN(limit)) {
            throw new BadRequestException('Page and limit must be valid numbers');
        }

        const skip = (page - 1) * limit;

        if (skip < 0 || isNaN(skip)) {
            throw new BadRequestException('Invalid pagination parameters');
        }

        const queryBuilder = this.bookRepository.createQueryBuilder('book')
            .leftJoinAndSelect('book.store', 'store') // Join dengan Store
            .skip(skip)
            .take(limit);

        // Filter berdasarkan nama toko
        if (storeName) {
            queryBuilder.andWhere('store.name ILIKE :storeName', { storeName: `%${storeName}%` });
        }

        // Filter berdasarkan tahun
        if (year) {
            queryBuilder.andWhere('book.year = :year', { year });
        }

        if (storeLocation) {
            queryBuilder.andWhere('store.location ILIKE :storeLocation', { storeLocation: `%${storeLocation}%` });
        }
        if (minYear) {
            queryBuilder.andWhere('book.year >= :minYear', { minYear });
        }
        if (maxYear) {
            queryBuilder.andWhere('book.year <= :maxYear', { maxYear });
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number): Promise<Book> {
        const book = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.store', 'store')
            .where('book.id = :id', { id })
            .getOne();
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findOne(id);
        if (updateBookDto.storeId) {
            const store = await this.storeRepository.findOneBy({ id: updateBookDto.storeId });
            if (!store) {
                throw new NotFoundException(`Store with ID ${updateBookDto.storeId} not found`);
            }
            book.store = store;
        }
        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }

    async remove(id: number): Promise<void> {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
}