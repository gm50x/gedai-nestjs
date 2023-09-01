import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpRequest {
  @ApiProperty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsString()
  @AutoMap()
  name: string;
}

export class SignUpResponse {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  password: string;
}
