import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto.email, dto.password, dto.name);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}