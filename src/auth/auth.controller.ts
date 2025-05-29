import { Body, Controller, Post, Request, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { LocalAuthGuard } from './guard/local.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.registerUser(registerDto)
    }

    // @Public()
    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {
    //     return await this.authService.loginUser(loginDto)
    // }

    @HttpCode(HttpStatus.OK)
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: Express.Request) {
        return this.authService.login(req.user);
    }


    @Get('getUser')
    async getUser(@Request() request): Promise<User | null> {
        return await this.authService.getUser(request.user.id)
    }

    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get('test')
    getTest(): { message: string } {
        return {
            message: "Test role guard berhasil"
        }
    }
}
