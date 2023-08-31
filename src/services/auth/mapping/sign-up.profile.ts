import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AutomapperProfile } from '../../../common';
import { SignUpCommand, SignUpResult } from '../application';
import {
  SignUpRequest,
  SignUpResponse,
} from '../presentation/models/sign-up.models';

@Injectable()
export class SignUpProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, SignUpRequest, SignUpCommand);
      createMap(mapper, SignUpResult, SignUpResponse);
    };
  }
}
