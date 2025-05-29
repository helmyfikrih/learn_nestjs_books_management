import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './enum/role.enum';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from './interfaces/token-payload.interface';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async registerUser(registerDto: RegisterDto): Promise<{ message: string }> {
        const hashPassword = await bcrypt.hash(registerDto.password, 10)

        const userEmail = await this.userRepository.findOneBy({ email: registerDto.email })

        if (userEmail) {
            throw new ConflictException("Email is already exist")
        }

        const userData = await this.userRepository.find()
        const roleUser: Role = userData.length === 0 ? Role.ADMIN : Role.USER

        const newUser = await this.userRepository.create({
            ...registerDto,
            password: hashPassword,
            role: roleUser
        })

        await this.userRepository.save(newUser)

        return {
            message: "User registered successfully"
        }
    }

    async loginUser(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } })

        if (!user) {
            throw new UnauthorizedException("Invalid Credentials")
        }

        if (!await bcrypt.compare(loginDto.password, user.password)) {
            throw new UnauthorizedException("Invalid Credentials")
        }

        const tokenPayload: TokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: await this.jwtService.signAsync(tokenPayload)
        }
    }

    async getUser(id: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({ id })
        if (user?.password) {
            user.password = "************"
        }
        return user
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userRepository.findOne({ where: { email: loginDto.email } })
        if (user && await bcrypt.compare(loginDto.password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const tokenPayload: TokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: await this.jwtService.signAsync(tokenPayload)
        }
    }

    async googleValidateUser(payload: any): Promise<any> {
        const { email, firstName, lastName, picture } = payload;

        // Cari user berdasarkan email
        let user = await this.userRepository.findOne({ where: { email } });

        if (!user) {
            // Generate random password
            const randomPassword = randomBytes(12).toString('hex').slice(0, 12);
            const hashPassword = await bcrypt.hash(randomPassword, 10);

            // Buat DTO untuk user baru
            const registerDto: RegisterDto = {
                email,
                name: `${firstName} ${lastName || ''}`.trim(), // Gabungkan firstName dan lastName
                password: hashPassword,
                role: Role.USER,
            };

            // Buat dan simpan user baru
            user = this.userRepository.create(registerDto);
            await this.userRepository.save(user);
        }

        const tokenPayload: TokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: await this.jwtService.signAsync(tokenPayload)
        }
    }

}
