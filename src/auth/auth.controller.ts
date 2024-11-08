import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/create-user.dto';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async create(@Body() loginDto: AuthDto) {
    return await this.authService.signIn(loginDto);
  }

  @Post('signup')
  async signup(@Body() createUserDto: UserDto) {
    return await this.authService.signUp(createUserDto);
  }
}
