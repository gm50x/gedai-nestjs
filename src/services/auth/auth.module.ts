import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AutomapperModule } from 'src/common';
import { SignUpCommandHandler } from './application';
import { SignUpProfile } from './mapping/sign-up.profile';
import { SignUpController } from './presentation/sign-up.controller';

@Module({
  imports: [CqrsModule, AutomapperModule],
  controllers: [SignUpController],
  providers: [SignUpProfile, SignUpCommandHandler],
  exports: [],
})
export class AuthModule {}
