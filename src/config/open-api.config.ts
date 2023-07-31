import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const VOLTZ_ID = 'VOLTZ_ID';

export const ApiVoltzIdAuth = () => ApiBearerAuth(VOLTZ_ID);

export const configureOpenAPI = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const [env, title, description, version] = [
    configService.get('NODE_ENV', 'development'),
    configService.get('APP_NAME', 'my-application'),
    configService.get('APP_DESCRIPTION', 'My Application Description'),
    configService.get('APP_VERSION', '1.0.0'),
  ];

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(`${version}-${env}`)
    .addBearerAuth(
      {
        type: 'http',
        name: VOLTZ_ID,
        description: 'Authentication Token',
        scheme: 'bearer',
      },
      VOLTZ_ID,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  Logger.log('Open API initialized', 'Configuration');
  return app;
};
