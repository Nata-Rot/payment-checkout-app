export interface Product {
  id: string; name: string; description: string;
  priceInCents: number; stock: number; imageUrl: string;
}
export interface Customer {
  id: string; email: string; fullName: string; phone: string;
}
export type CardBrand = 'visa' | 'mastercard' | 'unknown';
export interface CardData {
  number: string; cardHolder: string; expMonth: string;
  expYear: string; cvc: string; brand: CardBrand;
}
export interface DeliveryData {
  address: string; city: string; department: string; postalCode: string;
}
export interface Transaction {
  id: string; reference: string; productId: string; customerId: string;
  amountInCents: number; baseFeeInCents: number; deliveryFeeInCents: number;
  totalInCents: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
  wompiTransactionId?: string;
}
export interface CheckoutState {
  step: 1 | 2 | 3 | 4;
  selectedProduct: Product | null;
  customer: Customer | null;
  cardData: Partial<CardData>;
  deliveryData: Partial<DeliveryData>;
  transaction: Transaction | null;
  cardToken: string | null;
  installments: number;
}