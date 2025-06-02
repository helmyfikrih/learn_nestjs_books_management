import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';

export class UpdateRoleDTO {
    @ApiPropertyOptional({ description: 'Role' })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}
