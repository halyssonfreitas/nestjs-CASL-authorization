import { Body, Controller, Get, Post, Request, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private authService : AuthService
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() user: LoginUserDto) {
        return this.authService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
