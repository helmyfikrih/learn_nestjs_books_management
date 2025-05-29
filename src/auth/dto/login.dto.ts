// src/books/dto/create-book.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength, Matches, IsEnum } from 'class-validator';

export class LoginDto {

    @ApiPropertyOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    password: string
}