// src/stores/stores.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreWithBooksDto } from './dto/store-with-books.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private storeRepository: Repository<Store>,
    ) { }

    async create(createStoreDto: CreateStoreDto): Promise<Store> {
        const store = this.storeRepository.create(createStoreDto);
        return this.storeRepository.save(store);
    }

    async findAll(): Promise<Store[]> {
        return this.storeRepository
            .createQueryBuilder('store')
            .leftJoinAndSelect('store.books', 'book')
            .getMany();
    }

    async findOne(id: string): Promise<Store> {
        const store = await this.storeRepository
            .createQueryBuilder('store')
            .leftJoinAndSelect('store.books', 'book')
            .where('store.id = :id', { id })
            .getOne();
        if (!store) {
            throw new NotFoundException(`Store with ID ${id} not found`);
        }
        return store;
    }

    async update(id: string, updateStoreDto: UpdateStoreDto): Promise<Store> {
        const store = await this.findOne(id);
        Object.assign(store, updateStoreDto);
        return this.storeRepository.save(store);
    }

    async remove(id: string): Promise<void> {
        const store = await this.findOne(id);
        await this.storeRepository.remove(store);
    }

    async getStoreWithTotalBooks(id: string): Promise<StoreWithBooksDto> {
        const store = await this.findOne(id);

        return {
            ...store,
            totalBooks: store.books.length,
        };
    }

}