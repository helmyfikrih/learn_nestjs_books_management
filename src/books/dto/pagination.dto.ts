// src/books/dto/pagination.dto.ts
import { IsInt, Min, Max, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number) // Konversi string ke number
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(10)
    limit: number = 2;

    @IsOptional()
    @IsString()
    storeName?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    year?: number;

    @IsOptional()
    @IsString()
    storeLocation?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    minYear?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    maxYear?: number;
}