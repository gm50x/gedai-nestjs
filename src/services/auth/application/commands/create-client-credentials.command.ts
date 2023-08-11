import { AutoMap } from '@automapper/classes';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';

export class CreateClientCredentialsCommand {
  @AutoMap()
  readonly name: string;
}

export class CreateClientCredentialsResult {
  @AutoMap()
  readonly clientId: string;
  @AutoMap()
  readonly clientSecret: string;
}

@CommandHandler(CreateClientCredentialsCommand)
export class CreateClientCredentialsHandler
  implements
    ICommandHandler<
      CreateClientCredentialsCommand,
      CreateClientCredentialsResult
    >
{
  async execute(
    command: CreateClientCredentialsCommand,
  ): Promise<CreateClientCredentialsResult> {
    /**
     * @TODO
     * 1 create entity instance
     * 2 store entity state to the db
     * 3 return entity as result
     */

    console.log('do something with', command.name);

    return {
      clientId: randomUUID(),
      clientSecret: randomUUID() + randomUUID(),
    };
  }
}
