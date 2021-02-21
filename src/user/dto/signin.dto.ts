import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import SwaggerProperties from 'src/api-properties';

export class SigninDto {
  @ApiProperty(SwaggerProperties.modules.user.username)
  @IsString()
  @IsNotEmpty()
  @Length(
    SwaggerProperties.modules.user.username.minLength,
    SwaggerProperties.modules.user.username.maxLength,
    {
      message: SwaggerProperties.shared.messages.minMaxLength,
    },
  )
  username: string;

  @ApiProperty(SwaggerProperties.modules.user.password)
  @IsString()
  @IsNotEmpty()
  @Length(
    SwaggerProperties.modules.user.password.minLength,
    SwaggerProperties.modules.user.password.maxLength,
    {
      message: SwaggerProperties.shared.messages.minMaxLength,
    },
  )
  password: string;
}
