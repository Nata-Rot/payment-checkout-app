export declare class Ok<T> {
    readonly value: T;
    readonly _tag: "Ok";
    constructor(value: T);
    isOk(): this is Ok<T>;
    isErr(): this is Err<never>;
    map<U>(fn: (v: T) => U): Ok<U>;
    flatMap<U, E extends Error>(fn: (v: T) => Result<U, E>): Result<U, E>;
    getOrElse(_fallback: T): T;
}
export declare class Err<E extends Error = Error> {
    readonly error: E;
    readonly _tag: "Err";
    constructor(error: E);
    isOk(): this is Ok<never>;
    isErr(): this is Err<E>;
    map<U>(_fn: (v: never) => U): Err<E>;
    flatMap<U>(_fn: (v: never) => Result<U, E>): Err<E>;
    getOrElse<T>(fallback: T): T;
}
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>;
export declare const ok: <T>(value: T) => Ok<T>;
export declare const err: <E extends Error>(error: E) => Err<E>;
