import { Mapper } from '@automapper/core';
import {
  InjectMapper,
  AutomapperProfile as _AutomapperProfile,
} from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AutomapperProfile extends _AutomapperProfile {
  constructor(
    @InjectMapper()
    protected readonly mapper: Mapper,
  ) {
    super(mapper);
  }
}
