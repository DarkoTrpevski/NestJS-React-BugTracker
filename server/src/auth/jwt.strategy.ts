import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayload } from 'src/models/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AuthPayload) {
    try {
      const { email } = payload;
      const user = await this.userRepo.findOneOrFail({ where: { email } });
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException('Sorry, server error');
    }
  }
}