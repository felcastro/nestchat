import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async findById(uuid: string): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne(uuid);

      return user;
    } catch (err) {
      throw err;
    }
  }

  async findWithPasswordByUsername(username: string): Promise<User> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ username })
        .getOne();

      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(createUserRequestDto: CreateUserRequestDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        username: createUserRequestDto.username,
      });

      if (user) {
        throw new ConflictException('Username already exists');
      }

      createUserRequestDto.password = await bcrypt.hash(
        createUserRequestDto.password,
        10,
      );

      return await this.userRepository.create(createUserRequestDto).save();
    } catch (err) {
      throw err;
    }
  }

  async signin(signinDto: SigninDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findOne({
        username: signinDto.username,
      });
      if (!user) {
        throw new UnauthorizedException('Username or password incorrect');
      }

      const isPasswordCorrect = bcrypt.compare(
        signinDto.password,
        user.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Username or password incorrect');
      }

      return { uuid: user.uuid, username: user.username };
    } catch (err) {
      throw err;
    }
  }
}
