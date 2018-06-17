export type UnwrapPromise<T> = T extends Promise<infer U> ? U :
  T extends PromiseLike<infer PLU> ? PLU : T;
export type UnwrapResponseType<T extends (...args:any[]) => any> = UnwrapPromise<ReturnType<T>>