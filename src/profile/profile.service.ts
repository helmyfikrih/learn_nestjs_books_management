import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from './entities/profile.entity';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrUpdateProfileDTO } from './dto/create-update.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }


    async updateOrCreateProfile(userId: string, createOrUpdateProfileDTO: CreateOrUpdateProfileDTO): Promise<{ message: string }> {
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['profile'] })
        if (!user) {
            throw new NotFoundException("user tidak ditemukan")
        }

        if (user.profile) {
            Object.assign(user.profile, createOrUpdateProfileDTO)
            await this.profileRepository.save(user.profile)
            return {
                message: "berhasil update profile"
            }
        } else {
            const newProfile = this.profileRepository.create(createOrUpdateProfileDTO)
            newProfile.user = user
            await this.profileRepository.save(newProfile)
            return {
                message: "berhasil membuat profile"
            }
        }
    }
}
