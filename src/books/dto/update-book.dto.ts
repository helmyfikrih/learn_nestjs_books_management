// src/books/dto/update-book.dto.ts
import { IsString, IsInt, Min, Max, IsOptional, IsArray, IsUUID } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @Min(1800)
  @Max(2025)
  @IsOptional()
  year?: number;

  @IsArray()
  @IsUUID('4', { each: true }) // Versi UUID v4
  @IsOptional()
  storeIds?: string[];
}