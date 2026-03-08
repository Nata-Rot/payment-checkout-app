import { Ok, Err, ok, err, Result } from './result';

describe('Result (ROP)', () => {
  it('creates a success result', () => {
    const r = ok(42);
    expect(r.isOk()).toBe(true);
    expect(r.value).toBe(42);
  });

  it('creates a failure result', () => {
    const r = err(new Error('fail'));
    expect(r.isOk()).toBe(false);
    expect(r.error).toBeInstanceOf(Error);
  });

  it('map transforms value on success', () => {
    const r = ok(2).map(v => v * 3);
    expect(r.isOk()).toBe(true);
    expect((r as Ok).value).toBe(6);
  });

  it('map skips transformation on failure', () => {
    const r = err(new Error('err')).map(v => v);
    expect(r.isOk()).toBe(false);
  });

  it('flatMap chains results', () => {
    const r = ok(5).flatMap(v => ok(v + 1));
    expect((r as Ok).value).toBe(6);
  });

  it('flatMap short-circuits on failure', () => {
    const r = err(new Error('err')).flatMap(v => ok(v));
    expect(r.isOk()).toBe(false);
  });

  it('getOrElse returns value on Ok', () => {
    expect(ok(10).getOrElse(0)).toBe(10);
  });

  it('getOrElse returns fallback on Err', () => {
    expect(err(new Error('x')).getOrElse(99)).toBe(99);
  });
});