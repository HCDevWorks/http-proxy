import { PrepareRequestFunctionOpts, PrepareRequestFunctionResult } from 'proxy-chain';

export type ProxyMiddleware = (
  ctx: PrepareRequestFunctionOpts,
  next: () => Promise<PrepareRequestFunctionResult | undefined>
) => Promise<PrepareRequestFunctionResult | undefined>;

export function compose(middlewares: ProxyMiddleware[]) {
  return function (ctx: PrepareRequestFunctionOpts) {
    let index = -1;
    function dispatch(i: number): Promise<PrepareRequestFunctionResult | undefined> {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middlewares[i];
      if (!fn) return Promise.resolve({});
      return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
    }
    return dispatch(0);
  };
}