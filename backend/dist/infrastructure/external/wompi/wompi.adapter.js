"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var WompiAdapter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WompiAdapter = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const crypto = __importStar(require("crypto"));
const domain_errors_1 = require("../../../shared/errors/domain.errors");
let WompiAdapter = WompiAdapter_1 = class WompiAdapter {
    config;
    logger = new common_1.Logger(WompiAdapter_1.name);
    http;
    publicKey;
    privateKey;
    integrityKey;
    constructor(config) {
        this.config = config;
        this.publicKey = this.config.get('WOMPI_PUBLIC_KEY', '');
        this.privateKey = this.config.get('WOMPI_PRIVATE_KEY', '');
        this.integrityKey = this.config.get('WOMPI_INTEGRITY_KEY', '');
        this.http = axios_1.default.create({ baseURL: this.config.get('WOMPI_BASE_URL'), timeout: 30000 });
    }
    async tokenizeCard(card) {
        try {
            const { data } = await this.http.post('/tokens/cards', { number: card.number, cvc: card.cvc, exp_month: card.expMonth, exp_year: card.expYear, card_holder: card.cardHolder }, { headers: { Authorization: 'Bearer ' + this.publicKey } });
            return { token: data.data.id, brand: data.data.brand,
                lastFour: data.data.last_four, expiresAt: data.data.exp_month + '/' + data.data.exp_year };
        }
        catch (error) {
            this.logger.error('Wompi tokenize error', error?.response?.data);
            throw new domain_errors_1.PaymentGatewayError(error?.response?.data?.error?.messages?.[0] ?? 'Tokenization failed');
        }
    }
    async createTransaction(payment) {
        try {
            const acceptanceToken = await this.getAcceptanceToken();
            const signature = this.buildSignature(payment.reference, payment.amountInCents, 'COP');
            const { data } = await this.http.post('/transactions', { acceptance_token: acceptanceToken, amount_in_cents: payment.amountInCents,
                currency: 'COP', signature, customer_email: payment.customerEmail,
                reference: payment.reference,
                payment_method: { type: 'CARD', installments: payment.installments, token: payment.cardToken } }, { headers: { Authorization: 'Bearer ' + this.privateKey } });
            return { id: data.data.id, status: data.data.status,
                reference: data.data.reference, amountInCents: data.data.amount_in_cents };
        }
        catch (error) {
            this.logger.error('Wompi transaction error', error?.response?.data);
            throw new domain_errors_1.PaymentGatewayError(error?.response?.data?.error?.messages?.[0] ?? 'Transaction failed');
        }
    }
    async getTransaction(id) {
        const { data } = await this.http.get('/transactions/' + id, { headers: { Authorization: 'Bearer ' + this.privateKey } });
        return { id: data.data.id, status: data.data.status,
            reference: data.data.reference, amountInCents: data.data.amount_in_cents };
    }
    async getAcceptanceToken() {
        const { data } = await this.http.get('/merchants/' + this.publicKey);
        return data.data.presigned_acceptance.acceptance_token;
    }
    buildSignature(reference, amountInCents, currency) {
        const raw = reference + amountInCents + currency + this.integrityKey;
        return crypto.createHash('sha256').update(raw).digest('hex');
    }
};
exports.WompiAdapter = WompiAdapter;
exports.WompiAdapter = WompiAdapter = WompiAdapter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], WompiAdapter);
//# sourceMappingURL=wompi.adapter.js.map