import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'src/shared/decorator/public.decorator';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { GetUserRequestDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto })
  async signup(
    @Body() body: CreateUserRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const response = await this.userService.create(body);

    res.send(response);
  }

  @Get('/:uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto })
  async get(
    @Param() params: GetUserRequestDto,
    @Res() res: Response,
  ): Promise<void> {
    const user = await this.userService.findById(params.uuid);

    res.send(user);
  }
}
