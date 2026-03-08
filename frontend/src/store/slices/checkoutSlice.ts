import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CheckoutState, Customer, CardData, DeliveryData, Transaction, Product } from '../../types';
import { apiService } from '../../services/api.service';
import { wompiService } from '../../services/wompi.service';
import { setLoading, setError } from './uiSlice';

const STORAGE_KEY = 'checkout_state';

const persist = (state: CheckoutState) => {
  const safe = { step: state.step, selectedProduct: state.selectedProduct,
    customer: state.customer, deliveryData: state.deliveryData,
    transaction: state.transaction, installments: state.installments };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
};

const load = (): Partial<CheckoutState> => {
  try { const r = sessionStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
};

const defaults: CheckoutState = {
  step: 1, selectedProduct: null, customer: null,
  cardData: {}, deliveryData: {}, transaction: null, cardToken: null, installments: 1,
};

const getMsg = (e: unknown, fallback: string) =>
  e instanceof Error ? e.message : typeof e === 'object' && e !== null && 'message' in e
    ? String((e as Record<string, unknown>).message)
    : fallback;

export const upsertCustomer = createAsyncThunk(
  'checkout/upsertCustomer',
  async (data: { email: string; fullName: string; phone: string }, { dispatch }) => {
    dispatch(setLoading(true)); dispatch(setError(null));
    try {
      const res = await apiService.post<{ data: Customer }>('/customers', data);
      dispatch(setLoading(false));
      return res.data.data;
    } catch (e: unknown) {
      dispatch(setLoading(false)); dispatch(setError(getMsg(e, 'Error')));
      throw e;
    }
  }
);

export const createTransaction = createAsyncThunk(
  'checkout/createTransaction',
  async (p: { productId: string; customerId: string }, { dispatch }) => {
    dispatch(setLoading(true)); dispatch(setError(null));
    try {
      const res = await apiService.post<{ data: Transaction }>('/transactions', p);
      dispatch(setLoading(false));
      return res.data.data;
    } catch (e: unknown) {
      dispatch(setLoading(false)); dispatch(setError(getMsg(e, 'Error')));
      throw e;
    }
  }
);

export const tokenizeAndPay = createAsyncThunk(
  'checkout/tokenizeAndPay',
  async (p: { cardData: CardData; transactionId: string; deliveryData: DeliveryData; installments: number; customerEmail: string }, { dispatch }) => {
    dispatch(setLoading(true)); dispatch(setError(null));
    try {
      const token = await wompiService.tokenizeCard(p.cardData);
      const res = await apiService.post<{ data: Transaction }>('/transactions/process', {
        transactionId: p.transactionId, cardToken: token, installments: p.installments,
        deliveryAddress: p.deliveryData.address, deliveryCity: p.deliveryData.city,
        deliveryDepartment: p.deliveryData.department, deliveryPostalCode: p.deliveryData.postalCode,
        customerEmail: p.customerEmail,
      });
      dispatch(setLoading(false));
      return res.data.data;
    } catch (e: unknown) {
      dispatch(setLoading(false)); dispatch(setError(getMsg(e, 'Error procesando pago')));
      throw e;
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: { ...defaults, ...load() } as CheckoutState,
  reducers: {
    selectProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload; state.step = 2; persist(state as CheckoutState);
    },
    setCardData(state, action: PayloadAction<Partial<CardData>>) {
      state.cardData = { ...state.cardData, ...action.payload };
    },
    setDeliveryData(state, action: PayloadAction<Partial<DeliveryData>>) {
      state.deliveryData = { ...state.deliveryData, ...action.payload };
    },
    setInstallments(state, action: PayloadAction<number>) { state.installments = action.payload; },
    goToStep(state, action: PayloadAction<1 | 2 | 3 | 4>) {
      state.step = action.payload; persist(state as CheckoutState);
    },
    resetCheckout(state) {
      Object.assign(state, defaults); sessionStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(upsertCustomer.fulfilled, (state, action) => {
        state.customer = action.payload; persist(state as CheckoutState);
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.transaction = action.payload; state.step = 3; persist(state as CheckoutState);
      })
      .addCase(tokenizeAndPay.fulfilled, (state, action) => {
        state.transaction = { ...state.transaction, ...action.payload } as typeof state.transaction;
        state.step = 4;
        state.cardData = {}; state.cardToken = null; persist(state as CheckoutState);
      });
  },
});

export const { selectProduct, setCardData, setDeliveryData, setInstallments, goToStep, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;