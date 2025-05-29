import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { commonPaginationDTO } from 'src/common/dto/paginate.dto';

export class UserFilterDTO extends commonPaginationDTO {
    @ApiPropertyOptional({ description: 'Filter berdasarkan email' })
    @IsOptional()
    @IsString()
    email?: string;

    // kamu bisa tambah filter lain juga di sini
    @ApiPropertyOptional({ description: 'Filter berdasarkan nama user' })
    @IsOptional()
    @IsString()
    name?: string;
}
