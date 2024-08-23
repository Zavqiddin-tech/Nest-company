import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAll() {
  }

  @Post('/regis') 
  regis(@Body() dto: CreateAuthDto) {
    return this.authService.regis(dto)
  }
  
  @Post('/login') 
  login(@Body() dto: CreateAuthDto) {
    return this.authService.login(dto)
  }
}
