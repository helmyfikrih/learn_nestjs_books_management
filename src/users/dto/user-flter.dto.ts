import { IsOptional, IsString } from 'class-validator';
import { commonPaginationDTO } from 'src/common/dto/paginate.dto';

export class UserFilterDTO extends commonPaginationDTO {
    @IsOptional()
    @IsString()
    email?: string;

    // kamu bisa tambah filter lain juga di sini
    @IsOptional()
    @IsString()
    name?: string;
}
