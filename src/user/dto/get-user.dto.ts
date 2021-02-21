import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import SwaggerProperties from 'src/api-properties';

export class GetUserRequestDto {
  @ApiProperty(SwaggerProperties.shared.uuid)
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string;
}
