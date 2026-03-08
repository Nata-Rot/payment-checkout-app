export class Ok<T> {
  readonly _tag = 'Ok' as const;
  constructor(readonly value: T) {}
  isOk(): this is Ok<T> { return true; }
  isErr(): this is Err<never> { return false; }
  map<U>(fn: (v: T) => U): Ok<U> { return new Ok(fn(this.value)); }
  flatMap<U, E extends Error>(fn: (v: T) => Result<U, E>): Result<U, E> { return fn(this.value); }
  getOrElse(_fallback: T): T { return this.value; }
}
export class Err<E extends Error = Error> {
  readonly _tag = 'Err' as const;
  constructor(readonly error: E) {}
  isOk(): this is Ok<never> { return false; }
  isErr(): this is Err<E> { return true; }
  map<U>(_fn: (v: never) => U): Err<E> { return this; }
  flatMap<U>(_fn: (v: never) => Result<U, E>): Err<E> { return this; }
  getOrElse<T>(fallback: T): T { return fallback; }
}
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>;
export const ok = <T>(value: T): Ok<T> => new Ok(value);
export const err = <E extends Error>(error: E): Err<E> => new Err(error);
