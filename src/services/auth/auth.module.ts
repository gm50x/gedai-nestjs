import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AutomapperModule } from 'src/common';
import { CreateClientCredentialsHandler } from './application';
import { IClientCredentialsRepository } from './domain';
import { ClientCredentialsRepository } from './infrastructure';
import { ClientCredentialsProfile } from './mappings/automapper-profiles';
import { CreateClientCredentialsController } from './presentation';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule, AutomapperModule],
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
