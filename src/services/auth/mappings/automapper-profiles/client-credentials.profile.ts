import { MappingProfile, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { AutomapperProfile } from '../../../../common';
import {
  CreateClientCredentialsCommand,
  CreateClientCredentialsResult,
} from '../../application';
import {
  CreateClientCredentialsRequest,
  CreateClientCredentialsResponse,
} from '../../presentation';

@Injectable()
export class ClientCredentialsProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CreateClientCredentialsRequest,
        CreateClientCredentialsCommand,
      );
      createMap(
        mapper,
        CreateClientCredentialsResult,
        CreateClientCredentialsResponse,
      );
    };
  }
}
