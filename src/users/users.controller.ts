import { Body, Controller, Get, NotFoundException, Param, Patch, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { generatePaginationMeta } from 'src/common/utils/pagination-meta.util';
import { UserFilterDTO } from './dto/user-flter.dto';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindOneParamsDTO } from './dto/findOne-params.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiOkResponse({
    description: 'List semua user',
    type: User, // kalau kamu pakai class entity
  })
  async findAll(@Query() userFilterDTO: UserFilterDTO): Promise<
    {
      data: User[];
      meta: ReturnType<typeof generatePaginationMeta>;
    }> {
    return this.usersService.findAllUser(userFilterDTO)
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async update(@Param() params: FindOneParamsDTO, @Body() updateRoleDTO: UpdateRoleDTO): Promise<{ message: string }> {
    const userData = await this.findOneOrFail(params.id)
    await this.usersService.updateRoleUser(userData, updateRoleDTO);
    return {
      message: "Role berhasil diubah"
    }
  }

  private async findOneOrFail(id: string): Promise<User> {
    const user = await this.usersService.findByParams(id)
    if (!user) {
      throw new NotFoundException()
    }

    return user
  }

}
