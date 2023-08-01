import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { TracingContext } from './tracing.context';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  constructor(private readonly context: TracingContext) {}

  use(req: Request, _res: Response, next: NextFunction) {
    /**
     * @TODO @GG
     * In the future, allow passing these as a config
     */
    const traceId =
      req.get('x-trace-id') ??
      req.body?.message?.attributes?.traceId ??
      randomUUID();

    const { clientId, clientName } = this.getClient(req);

    req['traceId'] = traceId;

    const context = new Map();
    context.set('traceId', traceId);
    context.set('clientId', clientId);
    context.set('clientName', clientName);

    this.context.run(context, async () => next());
  }

  private getClient(req: Request) {
    const authorization =
      req.get('X-Forwarded-Authorization') ?? req.get('Authorization');

    if (!authorization) {
      return {};
    }

    const tryParse = () => {
      try {
        const tokenBody = authorization.split('.').at(1);
        return JSON.parse(Buffer.from(tokenBody, 'base64').toString('utf8'));
      } catch {
        return authorization;
      }
    };

    req['auth'] = tryParse();
    return req['auth'];
  }
}
