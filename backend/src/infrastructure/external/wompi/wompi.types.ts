export interface WompiTokenizeResponse {
  status: string;
  data: { id: string; brand: string; last_four: string; exp_month: string; exp_year: string; };
}
export interface WompiTransactionResponse {
  data: { id: string; status: string; reference: string; amount_in_cents: number; };
}
export interface WompiMerchantResponse {
  data: { presigned_acceptance: { acceptance_token: string; }; };
}
