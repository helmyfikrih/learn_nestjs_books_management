// src/stores/dto/create-store.dto.ts
import { IsString } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    name: string;

    @IsString()
    location: string;
}