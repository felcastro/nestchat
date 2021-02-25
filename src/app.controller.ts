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

  @Public()
  @Get('/status')
  @HttpCode(HttpStatus.OK)
  async status() {
    const [{ database }] = await this.connection.query(
      "SELECT 'CONNECTED' AS database",
    );
    return { database };
  }
}
