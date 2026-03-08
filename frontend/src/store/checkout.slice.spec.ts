import checkoutReducer, {
  goToStep,
  setCardData,
  setDeliveryData,
  resetCheckout,
} from './slices/checkoutSlice';

describe('checkoutSlice', () => {
  const initial = checkoutReducer(undefined, { type: '@@INIT' });

  it('has step 1 as initial state', () => {
    expect(initial.step).toBe(1);
  });

  it('goToStep updates the current step', () => {
    const state = checkoutReducer(initial, goToStep(3));
    expect(state.step).toBe(3);
  });

  it('setCardData stores card info', () => {
    const card = { cardNumber: '4242424242424242', cardHolder: 'John', cardExpMonth: '12', cardExpYear: '29', cardCvc: '123', installments: 1 };
    const state = checkoutReducer(initial, setCardData(card));
    expect(state.cardData?.cardNumber).toBe('4242424242424242');
  });

  it('setDeliveryData stores delivery info', () => {
    const delivery = { address: 'Calle 1', city: 'Bogota', phone: '3001234567', email: 'a@b.com', name: 'John' };
    const state = checkoutReducer(initial, setDeliveryData(delivery));
    expect(state.deliveryData?.city).toBe('Bogota');
  });

  it('resetCheckout returns to step 1', () => {
    const withData = checkoutReducer(initial, goToStep(4));
    const reset = checkoutReducer(withData, resetCheckout());
    expect(reset.step).toBe(1);
    expect(reset.product).toBeUndefined();
  });
});