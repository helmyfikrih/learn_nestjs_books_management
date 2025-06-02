import { Body, Controller, Post, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateOrUpdateProfileDTO } from './dto/create-update.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    async updateOrCreateProfile(@Request() req, @Body() createOrUpdateProfileDTO: CreateOrUpdateProfileDTO): Promise<{ message: string }> {
        return await this.profileService.updateOrCreateProfile(req.userId, createOrUpdateProfileDTO)
    }
}
