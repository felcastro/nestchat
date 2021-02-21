import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserRequestDto } from './dto/validate-user.dto';
import { TokenDto } from './dto/token.dto';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userPayload: ValidateUserRequestDto): Promise<TokenDto> {
    try {
      const user = await this.userService.findWithPasswordByUsername(
        userPayload.username,
      );
      if (user && user.password) {
        const isPasswordCorrect = await bcrypt.compare(
          userPayload.password,
          user.password,
        );
        if (isPasswordCorrect) {
          return { userUuid: user.uuid };
        }
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async login(user: TokenDto): Promise<LoginResponseDto> {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
