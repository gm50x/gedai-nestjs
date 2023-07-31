import { INestApplication } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { TracingContext } from '../../config';
import { messenger } from './dummy.emitter';

type Options = {
  consumerId: symbol;
};

export class DummyTransportServer
  extends Server
  implements CustomTransportStrategy
{
  readonly transportId: symbol;

  constructor(
    private readonly app: INestApplication,
    private readonly options: Options,
  ) {
    super();
  }

  async listen(callback: () => void) {
    const keys = Array.from(this.messageHandlers.keys());

    const tracingContext = this.app.get(TracingContext);

    messenger.asObservable().subscribe(async (ev) => {
      const { pattern, traceId, clientId, clientName } = ev.attributes;
      const handler = this.getHandlerByPattern(pattern);

      if (!handler) {
        this.logger.error(
          `No handler found for message with pattern ${pattern}`,
        );
        return;
      }

      const contextStore = new Map<string, any>();
      contextStore.set('traceId', traceId);
      contextStore.set('clientId', clientId);
      contextStore.set('clientName', clientName);

      tracingContext.run(contextStore, async () => await handler(ev.data, ev));
    });

    console.log(keys);

    callback();
  }

  async close() {
    console.log('transport closed');
  }
}
