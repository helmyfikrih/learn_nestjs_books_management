// src/stores/stores.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Controller('stores')
export class StoresController {
    constructor(private readonly storesService: StoresService) { }

    @Post()
    create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
        return this.storesService.create(createStoreDto);
    }

    @Get()
    findAll(): Promise<Store[]> {
        return this.storesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Store> {
        return this.storesService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto): Promise<Store> {
        return this.storesService.update(+id, updateStoreDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.storesService.remove(+id);
    }
}