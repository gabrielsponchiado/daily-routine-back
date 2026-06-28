import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') 
  async create(@Body() data: RegisterDto) {
    return await this.authService.register(data)
  }

  @Post('login')
  async login(@Body() data:RegisterDto) {
    return await this.authService.login(data)
  }
}
