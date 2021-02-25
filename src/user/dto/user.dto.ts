import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';
import SwaggerProperties from 'src/api-properties';

export class UserDto {
  @ApiProperty(SwaggerProperties.shared.uuid)
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string;

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

  @ApiProperty(SwaggerProperties.shared.createdAt)
  @IsString()
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty(SwaggerProperties.shared.updatedAt)
  @IsString()
  @IsNotEmpty()
  updatedAt: Date;
}
