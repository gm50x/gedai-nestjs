import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { SignUpCommand, SignUpResult } from './sign-up.command';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler
  implements ICommandHandler<SignUpCommand, SignUpResult>
{
  async execute(command: SignUpCommand): Promise<SignUpResult> {
    console.log(command);

    return {
      accessToken: randomUUID(),
      id: randomUUID(),
    };
  }
}
