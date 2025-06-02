// src/books/dto/create-book.dto.ts
import { IsString, IsInt, Min, Max, IsArray, IsOptional, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(1800)
  @Max(2025)
  year: number;

  @IsArray()
  @IsUUID('4', { each: true }) // Versi UUID v4
  @IsOptional()
  storeIds?: string[];
}