import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUsersRepository, User } from '../domain';
import { EmailAlreadyExistsException } from '../domain/exceptions';
import { SignUpCommand, SignUpResult } from './sign-up.command';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler
  implements ICommandHandler<SignUpCommand, SignUpResult>
{
  constructor(private readonly repository: IUsersRepository) {}

  async execute(command: SignUpCommand): Promise<SignUpResult> {
    const existing = this.repository.findByEmail(command.email);

    if (existing) {
      throw new EmailAlreadyExistsException();
    }

    const user = new User(command.name, command.email);

    user.generatePassword();
    const password = user.password;

    user.securePassword();
    await this.repository.save(user);

    return { id: user.id, password };
  }
}
