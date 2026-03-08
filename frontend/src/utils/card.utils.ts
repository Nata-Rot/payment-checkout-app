import type { CardBrand, CardData } from '../types';

export function detectCardBrand(number: string): CardBrand {
  const d = number.replace(/\D/g, '');
  if (/^4/.test(d)) return 'visa';
  if (/^5[1-5]|^2[2-7]/.test(d)) return 'mastercard';
  return 'unknown';
}
export function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}
export function isCardExpired(expMonth: string, expYear: string): boolean {
  const now = new Date();
  return new Date(parseInt('20' + expYear, 10), parseInt(expMonth, 10) - 1) < new Date(now.getFullYear(), now.getMonth());
}
export function validateCard(card: Partial<CardData>): Record<string, string> {
  const errors: Record<string, string> = {};
  const digits = (card.number ?? '').replace(/\s/g, '');
  if (digits.length < 16) errors.number = 'El numero debe tener 16 digitos';
  if (!card.cardHolder || card.cardHolder.trim().length < 3) errors.cardHolder = 'Ingresa el nombre como aparece en la tarjeta';
  if (!card.expMonth || !card.expYear) errors.expiry = 'Fecha de vencimiento invalida';
  if (card.expMonth && card.expYear && isCardExpired(card.expMonth, card.expYear)) errors.expiry = 'La tarjeta esta vencida';
  if (!card.cvc || card.cvc.length < 3) errors.cvc = 'CVC debe tener 3-4 digitos';
  return errors;
}