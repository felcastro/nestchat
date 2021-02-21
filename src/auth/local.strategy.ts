import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<TokenDto> {
    const user = this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
