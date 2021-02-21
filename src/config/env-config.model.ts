import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { NodeEnv } from './enum/node-env.enum';

export class EnvConfig {
  @IsNumber()
  @IsPositive()
  httpPort: number;

  @IsString()
  @IsEnum(NodeEnv)
  env: string;

  @IsString()
  dbHost: string;

  @IsNumber()
  @IsPositive()
  dbPort: number;

  @IsString()
  dbName: string;

  @IsString()
  dbUsername: string;

  @IsString()
  dbPassword: string;

  @IsString()
  secret: string;

  get isProduction(): boolean {
    return this.env === NodeEnv.PRODUCTION;
  }
}
