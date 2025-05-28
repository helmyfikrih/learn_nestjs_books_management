// src/stores/dto/update-store.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateStoreDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    location?: string;
}