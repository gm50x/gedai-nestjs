import { AsyncLocalStorage } from 'async_hooks';

export class TracingContext extends AsyncLocalStorage<Map<string, any>> {
  static getContext() {
    return tracingContext;
  }
}

const tracingContext = new TracingContext();
