import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { generatePaginationMeta } from 'src/common/utils/pagination-meta.util';
import { UserFilterDTO } from './dto/user-flter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Query() userFilterDTO: UserFilterDTO): Promise<
    {
      data: User[];
      meta: ReturnType<typeof generatePaginationMeta>;
    }> {
    return this.usersService.findAllUser(userFilterDTO)
  }
}
