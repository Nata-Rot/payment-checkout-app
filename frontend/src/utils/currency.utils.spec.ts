import { formatCOP } from './currency.utils';

describe('formatCOP', () => {
  it('formatea centavos a pesos colombianos', () => {
    expect(formatCOP(100000)).toContain('1.000');
  });
  it('formatea cero correctamente', () => {
    expect(formatCOP(0)).toContain('0');
  });
  it('incluye simbolo de moneda', () => {
    expect(formatCOP(500000)).toMatch(/COP|\$/);
  });
});