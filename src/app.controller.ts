import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Public } from './shared/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly connection: Connection) {}

  @Public()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async root() {
    return { status: 'ok' };
  }

  @Get('/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async status() {
    return this.connection.query('SELECT 1');
  }
}
