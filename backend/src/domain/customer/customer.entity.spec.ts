import { Customer } from './customer.entity';

describe('Customer Entity', () => {
  const makeCustomer = () => new Customer({
    id: 'cust-1', fullName: 'John Doe',
    email: 'john@example.com', phone: '3001234567',
    createdAt: new Date(),
  });

  it('creates a valid customer', () => {
    const c = makeCustomer();
    expect(c.id).toBe('cust-1');
    expect(c.email).toBe('john@example.com');
  });

  it('has correct fullName', () => {
    expect(makeCustomer().fullName).toBe('John Doe');
  });

  it('has correct phone', () => {
    expect(makeCustomer().phone).toBe('3001234567');
  });

  it('toProps returns correct shape', () => {
    const props = makeCustomer().toProps();
    expect(props.fullName).toBe('John Doe');
    expect(props.email).toBe('john@example.com');
  });
});