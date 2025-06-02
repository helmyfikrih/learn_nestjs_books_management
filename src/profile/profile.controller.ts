import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateOrUpdateProfileDTO } from './dto/create-update.dto';
import { User } from 'src/auth/entities/user.entity';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async updateOrCreateProfile(@Request() req, @Body() createOrUpdateProfileDTO: CreateOrUpdateProfileDTO): Promise<{ message: string }> {
        return await this.profileService.updateOrCreateProfile(req.user.id, createOrUpdateProfileDTO)
    }

    @Get()
    async getUserProfile(@Request() req): Promise<User | null> {
        return this.profileService.getUserProfileByToken(req.user.id)
    }
}
