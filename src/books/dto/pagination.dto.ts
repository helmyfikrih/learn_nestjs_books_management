// src/books/dto/pagination.dto.ts
import { IsInt, Min, Max, IsOptional } from 'class-validator';
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
}