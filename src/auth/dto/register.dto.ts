// src/books/dto/create-book.dto.ts
import { IsString,  IsNotEmpty, IsEmail, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../enum/role.enum';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    @Matches(/[A-Z]/, {
        message: "Password must contain 1 capital"
    })
    @Matches(/[0-9]/, {
        message: "Password must contain 1 number"
    })
    @Matches(/[^A-Za-z0-9]/, {
        message: "Password must contain 1 special character"
    })
    password: string

    @IsOptional()
    @IsEnum(Role)
    role: Role


}