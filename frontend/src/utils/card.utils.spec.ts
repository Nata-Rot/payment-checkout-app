import { detectCardBrand, formatCardNumber, formatExpiry, isCardExpired, validateCard } from './card.utils';

describe('detectCardBrand', () => {
  it('detecta Visa', () => expect(detectCardBrand('4111111111111111')).toBe('visa'));
  it('detecta Mastercard', () => expect(detectCardBrand('5500000000000004')).toBe('mastercard'));
  it('retorna unknown para tarjeta desconocida', () => expect(detectCardBrand('9999999999999999')).toBe('unknown'));
});

describe('formatCardNumber', () => {
  it('formatea en grupos de 4', () => expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111'));
  it('elimina caracteres no numericos', () => expect(formatCardNumber('4111-1111-1111-1111')).toBe('4111 1111 1111 1111'));
  it('limita a 16 digitos', () => expect(formatCardNumber('41111111111111119999')).toBe('4111 1111 1111 1111'));
});

describe('formatExpiry', () => {
  it('agrega slash al mes y anio', () => expect(formatExpiry('1229')).toBe('12/29'));
  it('no agrega slash si hay menos de 3 digitos', () => expect(formatExpiry('12')).toBe('12'));
});

describe('isCardExpired', () => {
  it('retorna false para tarjeta vigente', () => expect(isCardExpired('12', '99')).toBe(false));
  it('retorna true para tarjeta vencida', () => expect(isCardExpired('01', '20')).toBe(true));
});

describe('validateCard', () => {
  it('retorna errores para tarjeta vacia', () => {
    const errors = validateCard({});
    expect(errors.number).toBeDefined();
    expect(errors.cardHolder).toBeDefined();
    expect(errors.expiry).toBeDefined();
    expect(errors.cvc).toBeDefined();
  });
  it('retorna objeto vacio para tarjeta valida', () => {
    const errors = validateCard({ number: '4111 1111 1111 1111', cardHolder: 'Juan Perez', expMonth: '12', expYear: '99', cvc: '123' });
    expect(Object.keys(errors)).toHaveLength(0);
  });
});