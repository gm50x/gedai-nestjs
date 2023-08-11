import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateClientCredentialsHandler } from './application';
import { IClientCredentialsRepository } from './domain';
import { ClientCredentialsRepository } from './infrastructure';
import { ClientCredentialsProfile } from './mappings/automapper-profiles';
import { CreateClientCredentialsController } from './presentation';

@Module({
  imports: [CqrsModule],
  controllers: [CreateClientCredentialsController],
  providers: [
    CreateClientCredentialsHandler,
    ClientCredentialsProfile,
    {
      provide: IClientCredentialsRepository,
      useClass: ClientCredentialsRepository,
    },
  ],
})
export class AuthModule {}
