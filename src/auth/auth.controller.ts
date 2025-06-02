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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleOauthGuard } from './guard/google.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {

    }

    @HttpCode(HttpStatus.OK)
    @Public()
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
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: LoginDto }) // ← dokumentasi input body
    @ApiResponse({ status: 200, description: 'Login berhasil dan mengembalikan JWT' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Request() req: Express.Request) {
        return this.authService.login(req.user);
    }


    // @Get('getUser')
    // async getUser(@Request() request): Promise<User | null> {
    //     return await this.authService.getUser(request.user.id)
    // }

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    @Get('test')
    getTest(): { message: string } {
        return {
            message: "Test role guard berhasil"
        }
    }

    @Public()
    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async googleAuth(@Request() req) {
        // Memulai flow autentikasi Google
    }

    @Public()
    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthRedirect(@Request() req) {
        // Callback setelah user login dengan Google
        return await this.authService.googleValidateUser(req.user)
        return {
            message: 'User logged in successfully',
            user: req.user,
        };
    }
}
