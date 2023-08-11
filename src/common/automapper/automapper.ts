import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Type } from '@nestjs/common';

export interface IAutomapper {
  map<T, K>(source: T, SourceClass: Type<T>, DestinationClass: Type<K>): K;
}

export abstract class IAutomapper implements IAutomapper {}

export class Automapper implements IAutomapper {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  map<T, K>(source: T, SourceClass: Type<T>, DestinationClass: Type<K>): K {
    return this.mapper.map(source, SourceClass, DestinationClass);
  }
}
