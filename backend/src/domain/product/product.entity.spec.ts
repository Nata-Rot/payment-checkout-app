import { Product, ProductProps } from './product.entity';

const makeProduct = (stock: number): Product =>
  new Product({
    id: '1', name: 'iPad Pro', description: 'Tablet Apple',
    priceInCents: 500000000, stock,
    imageUrl: 'https://example.com/ipad.jpg',
    createdAt: new Date(), updatedAt: new Date(),
  });

describe('Product Entity', () => {
  it('creates a valid product', () => {
    const p = makeProduct(10);
    expect(p.id).toBe('1');
    expect(p.stock).toBe(10);
  });

  it('hasStock returns true when stock > 0', () => {
    expect(makeProduct(5).hasStock()).toBe(true);
  });

  it('hasStock returns false when stock is 0', () => {
    expect(makeProduct(0).hasStock()).toBe(false);
  });

  it('decrementStock returns new product with stock - 1', () => {
    const p = makeProduct(5);
    const updated = p.decrementStock();
    expect(updated.stock).toBe(4);
    expect(p.stock).toBe(5); // immutable
  });

  it('decrementStock throws when stock is 0', () => {
    expect(() => makeProduct(0).decrementStock()).toThrow('No stock available');
  });

  it('toProps returns correct props', () => {
    const p = makeProduct(3);
    const props = p.toProps();
    expect(props.name).toBe('iPad Pro');
    expect(props.stock).toBe(3);
  });
});