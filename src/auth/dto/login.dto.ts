// src/books/dto/create-book.dto.ts
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}