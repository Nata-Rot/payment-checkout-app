"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.ok = exports.Err = exports.Ok = void 0;
class Ok {
    value;
    _tag = 'Ok';
    constructor(value) {
        this.value = value;
    }
    isOk() { return true; }
    isErr() { return false; }
    map(fn) { return new Ok(fn(this.value)); }
    flatMap(fn) { return fn(this.value); }
    getOrElse(_fallback) { return this.value; }
}
exports.Ok = Ok;
class Err {
    error;
    _tag = 'Err';
    constructor(error) {
        this.error = error;
    }
    isOk() { return false; }
    isErr() { return true; }
    map(_fn) { return this; }
    flatMap(_fn) { return this; }
    getOrElse(fallback) { return fallback; }
}
exports.Err = Err;
const ok = (value) => new Ok(value);
exports.ok = ok;
const err = (error) => new Err(error);
exports.err = err;
//# sourceMappingURL=result.js.map