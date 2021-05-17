import { Body, Controller, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';
import { UserDeco } from './user.decorator';


@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@UserDeco() loggedInUser: User) {
    return this.authService.getCurrentUser(loggedInUser);
  }

  @Post('/register')
  async register(@Body(ValidationPipe) user: RegisterDTO) {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) user: LoginDTO) {
    return this.authService.login(user);
  }

}