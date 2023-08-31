import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IAutomapper } from 'src/common';
import { SignUpCommand, SignUpResult } from '../application';
import { SignUpRequest, SignUpResponse } from './models/sign-up.models';

@Controller({
  path: 'sign-up',
  version: '1',
})
export class SignUpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly automapper: IAutomapper,
  ) {}

  @Post()
  async execute(@Body() data: SignUpRequest): Promise<SignUpResponse> {
    const command = this.automapper.map(data, SignUpRequest, SignUpCommand);
    console.log(data, command);
    const result = await this.commandBus.execute(command);
    const response = this.automapper.map(result, SignUpResult, SignUpResponse);
    return response;
  }
}
