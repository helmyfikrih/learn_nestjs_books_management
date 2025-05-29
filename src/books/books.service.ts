import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/entities/store.entity'; // Tambahkan impor ini
import { generatePaginationMeta } from 'src/common/utils/pagination-meta.util';
import { getPaginationParams } from 'src/common/utils/pagination.util';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const { storeIds, ...bookData } = createBookDto;
        let stores = [];
        if (storeIds && storeIds.length > 0) {
            // Validasi storeIds
            const stores = await this.storeRepository.findByIds(storeIds);
            if (stores.length !== storeIds.length) {
                const foundIds = stores.map((store) => store.id);
                const missingIds = storeIds.filter((id) => !foundIds.includes(id));
                throw new NotFoundException(`Stores with IDs ${missingIds.join(', ')} not found`);
            }
        }
        const book = this.bookRepository.create({
            ...bookData,
            stores, // Assign stores ke relasi
        });
        return this.bookRepository.save(book);
    }

    async findAll(paginationDto: PaginationDto): Promise<{
        data: Book[];
        meta: ReturnType<typeof generatePaginationMeta>;
    }> {
        const { storeName, year, storeLocation, minYear, maxYear } = paginationDto;
        const { page, limit, skip } = getPaginationParams(paginationDto.page, paginationDto.limit);

        const queryBuilder = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.stores', 'store')
            .skip(skip)
            .take(limit);

        if (storeName) {
            queryBuilder.andWhere('store.name ILIKE :storeName', { storeName: `%${storeName}%` });
        }

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
            meta: generatePaginationMeta(total, page, limit),
        };
    }

    async findOne(id: number): Promise<Book> {
        const book = await this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.stores', 'store')
            .where('book.id = :id', { id })
            .getOne();
        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }

    async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.findOne(id);

        if (updateBookDto.storeIds) {
            const stores = await this.storeRepository.findByIds(updateBookDto.storeIds);
            if (stores.length !== updateBookDto.storeIds.length) {
                const foundIds = stores.map((store) => store.id);
                const missingIds = updateBookDto.storeIds.filter((id) => !foundIds.includes(id));
                throw new NotFoundException(`Stores with IDs ${missingIds.join(', ')} not found`);
            }
            book.stores = stores;
        }

        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }

    async remove(id: number): Promise<void> {
        const book = await this.findOne(id);
        await this.bookRepository.remove(book);
    }
}