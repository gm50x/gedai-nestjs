import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(this.constructor.name);
  getHello(): string {
    this.logger.log('Hello there....');
    return 'Hello World!';
  }
}
