import { AutoMap } from '@automapper/classes';
import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {
  @AutoMap()
  readonly email: string;
  @AutoMap()
  readonly name: string;
}

export class SignUpResult {
  @AutoMap()
  id: string;

  @AutoMap()
  accessToken: string;
}
