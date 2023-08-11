import { AutoMap } from '@automapper/classes';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IsString } from 'class-validator';

import { IAutomapper } from '../../../common';
import {
  CreateClientCredentialsCommand,
  CreateClientCredentialsResult,
} from '../application';

export class CreateClientCredentialsRequest {
  @IsString()
  @AutoMap()
  name: string;
}

export class CreateClientCredentialsResponse {
  @AutoMap()
  clientId: string;
  @AutoMap()
  clientSecret: string;
}

@Controller('client-credentials')
export class CreateClientCredentialsController {
  constructor(
    private readonly automapper: IAutomapper,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async execute(
    @Body() data: CreateClientCredentialsRequest,
  ): Promise<CreateClientCredentialsResponse> {
    const command = this.automapper.map(
      data,
      CreateClientCredentialsRequest,
      CreateClientCredentialsCommand,
    );

    console.log(command);

    const result = await this.commandBus.execute(command);

    return this.automapper.map(
      result,
      CreateClientCredentialsResult,
      CreateClientCredentialsResponse,
    );
  }
}
