import { INestApplication, Logger } from '@nestjs/common';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DummyTransportServer } from 'src/sdk';

export const configureMicroservices = (app: INestApplication) => {
  Logger.log('Microservices initialized', 'Configuration');

  app.connectMicroservice<MicroserviceOptions>({
    strategy: new DummyTransportServer(app, {
      consumerId: Symbol.for('dummy'),
    }),
  });
  return app;
};
