export interface CardTokenRequest {
  number: string; cvc: string; expMonth: string; expYear: string; cardHolder: string;
}
export interface CardTokenResponse {
  token: string; brand: string; lastFour: string; expiresAt: string;
}
export interface PaymentRequest {
  amountInCents: number; reference: string; cardToken: string;
  installments: number; customerEmail: string;
}
export interface PaymentResponse {
  id: string; status: 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR' | 'PENDING';
  reference: string; amountInCents: number;
}
export abstract class PaymentPort {
  abstract tokenizeCard(card: CardTokenRequest): Promise<CardTokenResponse>;
  abstract createTransaction(payment: PaymentRequest): Promise<PaymentResponse>;
  abstract getTransaction(id: string): Promise<PaymentResponse>;
}
