// src/books/dto/create-book.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrUpdateProfileDTO {
    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    bio: string
}