import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  INestApplication,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';

@Catch()
class AllExceptionsFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  private readonly logger = new Logger(this.constructor.name);

  constructor(protected readonly httpAdapterHost: HttpAdapterHost) {
    super();
  }

  private log(exception: any) {
    this.logger.error({
      message: 'Internal Server Error',
      error: exception,
    });
  }

  private treat(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const context = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: 'Internal Server Error',
    };

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
  }

  catch(exception: any, host: ArgumentsHost) {
    try {
      this.log(exception);
      this.treat(exception, host);
    } catch {
      super.catch(exception, host);
    }
  }
}

export const configureExceptionsHandler = (app: INestApplication) => {
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  return app;
};
