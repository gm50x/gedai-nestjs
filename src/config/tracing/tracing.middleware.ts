import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { TracingContext } from './tracing.context';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  constructor(private readonly context: TracingContext) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const traceId = req.get('x-trace-id') ?? randomUUID();

    req['traceId'] = traceId;

    const context = new Map();
    context.set('traceId', traceId);
    this.context.run(context, async () => next());
  }
}
