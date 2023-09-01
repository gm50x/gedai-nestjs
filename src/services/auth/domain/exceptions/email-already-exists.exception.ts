import { UnprocessableEntityException } from '@nestjs/common';

export class EmailAlreadyExistsException extends UnprocessableEntityException {
  constructor() {
    super('Email Already Exists');
  }
}
