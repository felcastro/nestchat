import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { Public } from 'src/shared/decorator/public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('me')
  async me(@Request() req: any) {
    return req.user;
  }
}
