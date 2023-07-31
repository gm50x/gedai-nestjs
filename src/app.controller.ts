import {
  ArgumentMetadata,
  Body,
  Controller,
  Logger,
  PipeTransform,
  Post,
  UsePipes,
} from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { TracingService } from './config';
import { messenger } from './sdk/dummy-messaging/dummy.emitter';

class MyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`${JSON.stringify({ metadata, value }, null, 2)}`);
    return value;
  }
}

@Controller()
export class AppController {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly appService: AppService,
    private readonly tracer: TracingService,
  ) {}

  @Post()
  sendMessage(@Body() payload: any): string {
    const [traceId, clientId, clientName] = [
      this.tracer.get('traceId'),
      this.tracer.get('clientId'),
      this.tracer.get('clientName'),
    ];

    const data = {
      attributes: {
        clientId,
        traceId,
        clientName,
        pattern: payload.pattern,
      },
      data: payload,
    };

    messenger.next(data);

    console.log(payload);
    this.logger.log('yayay');

    return this.appService.getHello();
  }

  @MessagePattern('foo.bar.bin.baz.message')
  @UsePipes(new MyPipe())
  onMessage(@Payload() payload: any, @Ctx() rawMessage: any): string {
    // this.logger.log({ message: 'got a message...', payload, rawMessage });
    this.logger.log('got a message');
    return this.appService.getHello();
  }

  @EventPattern('foo.bar.bin.baz.event')
  onEvent(@Payload() payload: any, @Ctx() rawMessage: any): string {
    this.logger.log('got an event');
    const hello = this.appService.getHello();
    throw new Error('all good');
    // this.logger.log({ message: 'got an event...', payload, rawMessage });
  }
}
