import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Body,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { GetUserRequestDto } from './dto/get-user.dto';
import { SigninDto } from './dto/signin.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/signin')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({ type: UserDto, isArray: true })
  // async list(@Query() params: SigninDto, @Res() res: Response): Promise<void> {
  //   const { user, token } = await this.userService.signin(params);

  //   res.send(user);
  // }

  @Post('/signup')
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
