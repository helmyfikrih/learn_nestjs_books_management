// src/books/dto/create-book.dto.ts
import { IsString, IsInt, Min, Max, IsNumber, IsArray } from 'class-validator';

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
  @IsNumber({}, { each: true })
  storeIds: number[]; // Array ID toko
}