import { ConfigService } from '@nestjs/config';
import { PaymentPort, CardTokenRequest, CardTokenResponse, PaymentRequest, PaymentResponse } from '../../../domain/payment/payment.port';
export declare class WompiAdapter implements PaymentPort {
    private readonly config;
    private readonly logger;
    private readonly http;
    private readonly publicKey;
    private readonly privateKey;
    private readonly integrityKey;
    constructor(config: ConfigService);
    tokenizeCard(card: CardTokenRequest): Promise<CardTokenResponse>;
    createTransaction(payment: PaymentRequest): Promise<PaymentResponse>;
    getTransaction(id: string): Promise<PaymentResponse>;
    private getAcceptanceToken;
    private buildSignature;
}
