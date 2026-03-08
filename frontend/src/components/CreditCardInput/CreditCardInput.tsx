import React, { useState, useRef } from 'react';
import { Input } from '../shared/Input';
import { detectCardBrand } from '../../utils/card.utils';
import type { CardData } from '../../types';

interface Props { value: Partial<CardData>; errors: Record<string, string>; onChange: (field: keyof CardData, value: string) => void; }

const VisaLogo = () => <svg viewBox="0 0 60 20" width="38" height="14"><text x="0" y="16" fontFamily="Arial" fontSize="18" fontWeight="700" fill="#1434CB">VISA</text></svg>;
const MastercardLogo = () => <svg viewBox="0 0 38 24" width="38" height="24"><circle cx="13" cy="12" r="12" fill="#EB001B"/><circle cx="25" cy="12" r="12" fill="#F79E1B" opacity=".85"/></svg>;

export const CreditCardInput: React.FC<Props> = ({ value, errors, onChange }) => {
  const [showCvc, setShowCvc] = useState(false);
  const [cardNumber, setCardNumber] = useState(value.number ?? '');
  const [expiry, setExpiry] = useState(
    value.expMonth && value.expYear ? value.expMonth + '/' + value.expYear : ''
  );
  const cardRef = useRef<HTMLInputElement>(null);

  const brand = detectCardBrand(cardNumber);
  const BrandLogo = brand === 'visa' ? VisaLogo : brand === 'mastercard' ? MastercardLogo : null;

  const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const fmt = raw.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(fmt);
    onChange('number', fmt);
    onChange('brand', detectCardBrand(fmt));
  };

  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    const fmt = raw.length >= 3 ? raw.slice(0, 2) + '/' + raw.slice(2) : raw;
    setExpiry(fmt);
    const [month = '', year = ''] = fmt.split('/');
    onChange('expMonth', month.padStart(2, '0'));
    onChange('expYear', year);
  };

  const digits = cardNumber.replace(/\s/g, '').padEnd(16, '\u2022');
  const displayNum = digits.slice(0,4) + ' ' + digits.slice(4,8) + ' ' + digits.slice(8,12) + ' ' + digits.slice(12);
  const cardBg = brand === 'visa'
    ? 'linear-gradient(135deg,#1434CB,#0064B4)'
    : brand === 'mastercard'
    ? 'linear-gradient(135deg,#1a1a2e,#0f3460)'
    : 'linear-gradient(135deg,#667eea,#764ba2)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ borderRadius: 'var(--radius-md)', padding: 20, background: cardBg, boxShadow: '0 8px 20px rgba(0,0,0,.25)', minHeight: 160, transition: 'background .4s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,.7)', letterSpacing: 1 }}>TARJETA DE CREDITO</span>
          {BrandLogo && <BrandLogo />}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: 20, letterSpacing: 4, color: 'white', marginTop: 20 }}>{displayNum}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase' }}>Titular</div>
            <div style={{ fontSize: 13, color: 'white', fontWeight: 500 }}>{value.cardHolder || 'NOMBRE APELLIDO'}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', textTransform: 'uppercase' }}>Vence</div>
            <div style={{ fontSize: 13, color: 'white' }}>{expiry || 'MM/AA'}</div>
          </div>
        </div>
      </div>

      <input
        ref={cardRef}
        placeholder="0000 0000 0000 0000"
        value={cardNumber}
        onChange={handleNumber}
        inputMode="numeric"
        maxLength={19}
        style={{
          width: '100%', padding: '12px 16px', borderRadius: 'var(--radius-sm)',
          border: '1.5px solid ' + (errors.number ? 'var(--color-error)' : 'var(--color-border)'),
          fontSize: 15, outline: 'none', background: 'var(--color-surface)',
          fontFamily: 'monospace', letterSpacing: 2,
        }}
      />
      {errors.number && <span style={{ fontSize: 12, color: 'var(--color-error)', marginTop: -10 }}>{errors.number}</span>}

      <Input label="Titular de la tarjeta" placeholder="Como aparece en la tarjeta"
        value={value.cardHolder ?? ''} onChange={e => onChange('cardHolder', e.target.value.toUpperCase())}
        error={errors.cardHolder} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Input label="Vencimiento" placeholder="MM/AA"
          value={expiry} onChange={handleExpiry}
          inputMode="numeric" maxLength={5} error={errors.expiry} />
        <Input label="CVC" placeholder="000"
          value={value.cvc ?? ''}
          onChange={e => onChange('cvc', e.target.value.replace(/\D/g,'').slice(0,4))}
          type={showCvc ? 'text' : 'password'} inputMode="numeric" maxLength={4} error={errors.cvc}
          rightElement={
            <button type="button" onClick={() => setShowCvc(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--color-on-surface-secondary)' }}>
              {showCvc ? 'Ocultar' : 'Ver'}
            </button>
          } />
      </div>
    </div>
  );
};