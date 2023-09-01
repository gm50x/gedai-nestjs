import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomapperModule } from 'src/common';
import { SignUpCommandHandler } from './application';
import { IUsersRepository } from './domain';
import { UserSchemaDefinition, UsersRepository } from './infrastructure';
import { SignUpProfile } from './mapping/sign-up.profile';
import { SignUpController } from './presentation/sign-up.controller';

@Module({
  imports: [
    CqrsModule,
    AutomapperModule,
    MongooseModule.forFeature([UserSchemaDefinition]),
  ],
  controllers: [SignUpController],
  providers: [
    SignUpProfile,
    SignUpCommandHandler,
    { provide: IUsersRepository, useClass: UsersRepository },
  ],
  exports: [],
})
export class AuthModule {}
