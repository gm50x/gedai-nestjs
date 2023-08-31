import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  configureCORS,
  configureCompression,
  configureExceptionsHandler,
  configureHelmet,
  configureLogger,
  configureMicroservices,
  configureOpenAPI,
  configureValidation,
  configureVersioning,
} from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
    .then(configureLogger)
    .then(configureExceptionsHandler)
    .then(configureVersioning)
    .then(configureHelmet)
    .then(configureValidation)
    .then(configureCORS)
    .then(configureCompression)
    .then(configureOpenAPI)
    .then(configureMicroservices);

  const config = app.get(ConfigService);
  const port = config.get('PORT', '3000');

  await app.listen(port);
  await app.startAllMicroservices();

  const url = await app.getUrl();

  Logger.log(`🚀 Application is running on ${url}`);
}
bootstrap();
