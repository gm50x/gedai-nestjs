import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Type } from '@nestjs/common';

export abstract class IAutomapper {
  abstract map<T, K>(
    source: T,
    SourceClass: Type<T>,
    DestinationClass: Type<K>,
  );
}

export class Automapper implements IAutomapper {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  map<T, K>(source: T, SourceClass: Type<T>, DestinationClass: Type<K>): K {
    return this.mapper.map(source, SourceClass, DestinationClass);
  }
}
