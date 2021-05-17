import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { RegisterDTO, LoginDTO } from 'src/models/user.dto';
import { Repository } from 'typeorm';



@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) { }

  
  async getCurrentUser(loggedInUser: User) {
    const user = await this.userRepo.findOneOrFail(loggedInUser.id);
    return { user: user };
  }
  
  async register(credentials: RegisterDTO) {
    try {
      const user = await this.userRepo.findOne({ where: { email: credentials.email } });
      if (user) throw new ConflictException('User with that email already exists');

      const newUser = this.userRepo.create(credentials);
      await newUser.save();
      const payload = { email: newUser.email };
      const token = this.jwtService.sign(payload);

      return this.toAuthResponse(newUser.toJSON(), token);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async login(credentials: LoginDTO) {
    const { email, password } = credentials;
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) throw new BadRequestException("Invalid credentials");

      const payload = { email: user.email };
      const token = this.jwtService.sign(payload);

      return this.toAuthResponse(user.toJSON(), token)
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  toAuthResponse(user: any, token: string) {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token: token
    };
  }

}