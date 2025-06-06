import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { generatePaginationMeta } from 'src/common/utils/pagination-meta.util';
import { getPaginationParams } from 'src/common/utils/pagination.util';
import { Repository } from 'typeorm';
import { UserFilterDTO } from './dto/user-flter.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async findAllUser(userFilterDto: UserFilterDTO): Promise<{
        data: User[];
        meta: ReturnType<typeof generatePaginationMeta>;
    }> {
        const { page, limit, skip } = getPaginationParams(
            userFilterDto.page,
            userFilterDto.limit,
        );

        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .select(['user.id', 'user.name', 'user.email'])
            .skip(skip)
            .take(limit);

        if (userFilterDto.email) {
            queryBuilder.andWhere('user.email ILIKE :email', {
                email: `%${userFilterDto.email}%`,
            });
        }

        if (userFilterDto.name) {
            queryBuilder.andWhere('user.name ILIKE :name', {
                name: `%${userFilterDto.name}%`,
            });
        }

        const [data, total] = await queryBuilder.getManyAndCount();

        return {
            data,
            meta: generatePaginationMeta(total, page, limit),
        };
    }

    async findByParams(id: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ id })
    }

    async updateRoleUser(user: User, updateRoleDTO: UpdateRoleDTO): Promise<{ message: string }> {
        Object.assign(user, updateRoleDTO);
        await this.userRepository.save(user);

        return {
            message: "update role berhasil."
        }
    }
}
