import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import { PaymentPort, CardTokenRequest, CardTokenResponse, PaymentRequest, PaymentResponse } from '../../../domain/payment/payment.port';
import { WompiTokenizeResponse, WompiTransactionResponse, WompiMerchantResponse } from './wompi.types';
import { PaymentGatewayError } from '../../../shared/errors/domain.errors';

@Injectable()
export class WompiAdapter implements PaymentPort {
  private readonly logger = new Logger(WompiAdapter.name);
  private readonly http: AxiosInstance;
  private readonly publicKey: string;
  private readonly privateKey: string;
  private readonly integrityKey: string;

  constructor(private readonly config: ConfigService) {
    this.publicKey = this.config.get<string>('WOMPI_PUBLIC_KEY', '');
    this.privateKey = this.config.get<string>('WOMPI_PRIVATE_KEY', '');
    this.integrityKey = this.config.get<string>('WOMPI_INTEGRITY_KEY', '');
    this.http = axios.create({ baseURL: this.config.get<string>('WOMPI_BASE_URL'), timeout: 30000 });
  }

  async tokenizeCard(card: CardTokenRequest): Promise<CardTokenResponse> {
    try {
      const { data } = await this.http.post<WompiTokenizeResponse>('/tokens/cards',
        { number: card.number, cvc: card.cvc, exp_month: card.expMonth, exp_year: card.expYear, card_holder: card.cardHolder },
        { headers: { Authorization: 'Bearer ' + this.publicKey } });
      return { token: data.data.id, brand: data.data.brand,
        lastFour: data.data.last_four, expiresAt: data.data.exp_month + '/' + data.data.exp_year };
    } catch (error: any) {
      this.logger.error('Wompi tokenize error', error?.response?.data);
      throw new PaymentGatewayError(error?.response?.data?.error?.messages?.[0] ?? 'Tokenization failed');
    }
  }

  async createTransaction(payment: PaymentRequest): Promise<PaymentResponse> {
    try {
      const acceptanceToken = await this.getAcceptanceToken();
      const signature = this.buildSignature(payment.reference, payment.amountInCents, 'COP');
      const { data } = await this.http.post<WompiTransactionResponse>('/transactions',
        { acceptance_token: acceptanceToken, amount_in_cents: payment.amountInCents,
          currency: 'COP', signature, customer_email: payment.customerEmail,
          reference: payment.reference,
          payment_method: { type: 'CARD', installments: payment.installments, token: payment.cardToken } },
        { headers: { Authorization: 'Bearer ' + this.privateKey } });
      return { id: data.data.id, status: data.data.status as PaymentResponse['status'],
        reference: data.data.reference, amountInCents: data.data.amount_in_cents };
    } catch (error: any) {
      this.logger.error('Wompi transaction error', error?.response?.data);
      throw new PaymentGatewayError(error?.response?.data?.error?.messages?.[0] ?? 'Transaction failed');
    }
  }

  async getTransaction(id: string): Promise<PaymentResponse> {
    const { data } = await this.http.get<WompiTransactionResponse>('/transactions/' + id,
      { headers: { Authorization: 'Bearer ' + this.privateKey } });
    return { id: data.data.id, status: data.data.status as PaymentResponse['status'],
      reference: data.data.reference, amountInCents: data.data.amount_in_cents };
  }

  private async getAcceptanceToken(): Promise<string> {
    const { data } = await this.http.get<WompiMerchantResponse>('/merchants/' + this.publicKey);
    return data.data.presigned_acceptance.acceptance_token;
  }

  private buildSignature(reference: string, amountInCents: number, currency: string): string {
    const raw = reference + amountInCents + currency + this.integrityKey;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }
}
