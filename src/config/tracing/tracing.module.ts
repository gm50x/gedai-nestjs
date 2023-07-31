import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { TracingContext } from './tracing.context';
import { TracingMiddleware } from './tracing.middleware';

@Global()
@Module({
  providers: [
    TracingService,
    {
      provide: TracingContext,
      useValue: TracingContext.getContext(),
    },
  ],
  exports: [TracingService],
})
export class TracingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TracingMiddleware).forRoutes('*');
  }
}
