import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { tokenizeAndPay, goToStep, setInstallments } from '../../store/slices/checkoutSlice';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import { Button } from '../../components/shared/Button';
import { formatCOP } from '../../utils/currency.utils';
import type { CardData, DeliveryData } from '../../types';

const INSTALLMENTS = [1, 2, 3, 6, 12, 24, 36];

// ✅ Fuera del componente — evita la recreación en cada render
interface RowProps { label: string; value: number; bold?: boolean }
const Row: React.FC<RowProps> = ({ label, value, bold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--color-border)', fontWeight: bold ? 700 : 400 }}>
    <span style={{ color: bold ? 'inherit' : 'var(--color-on-surface-secondary)' }}>{label}</span>
    <span style={{ color: bold ? 'var(--color-primary)' : 'inherit' }}>{formatCOP(value)}</span>
  </div>
);

export const SummaryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transaction, selectedProduct, cardData, deliveryData, customer, installments } = useAppSelector(s => s.checkout);
  const { loading, error } = useAppSelector(s => s.ui);
  const [open, setOpen] = useState(true);

  if (!transaction || !selectedProduct) return null;

  const handlePay = () => {
    if (!cardData.number || !deliveryData.address || !customer) return;
    dispatch(tokenizeAndPay({ cardData: cardData as CardData, transactionId: transaction.id, deliveryData: deliveryData as DeliveryData, installments, customerEmail: customer.email }));
  };

  return (
    <div style={{ padding: 16 }}>
      <div style={{ padding: '16px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Resumen del pedido</h1>
        <p style={{ fontSize: 14, color: 'var(--color-on-surface-secondary)', marginTop: 4 }}>Ref: {transaction.reference}</p>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '16px 0', alignItems: 'center' }}>
        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
        <div>
          <div style={{ fontWeight: 600 }}>{selectedProduct.name}</div>
          <div style={{ fontSize: 13, color: 'var(--color-on-surface-secondary)' }}>{customer?.fullName}</div>
        </div>
      </div>
      <Backdrop isOpen={open} title="Detalle del pago" onClose={() => setOpen(false)}>
        <Row label="Producto" value={transaction.amountInCents} />
        <Row label="Tarifa base" value={transaction.baseFeeInCents} />
        <Row label="Envio" value={transaction.deliveryFeeInCents} />
        <Row label="Total a pagar" value={transaction.totalInCents} bold />
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface-secondary)', marginBottom: 8 }}>Cuotas</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
            {INSTALLMENTS.map(n => (
              <button key={n} onClick={() => dispatch(setInstallments(n))}
                style={{ padding: '8px 4px', borderRadius: 8, border: '2px solid ' + (installments === n ? 'var(--color-primary)' : 'var(--color-border)'), background: installments === n ? 'var(--color-primary)' : 'transparent', color: installments === n ? 'white' : 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                {n === 1 ? '1 cuota' : n + 'x'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--color-bg)', borderRadius: 8, fontSize: 13 }}>
          <div style={{ fontWeight: 500, marginBottom: 4 }}>Metodo de pago</div>
          <div style={{ color: 'var(--color-on-surface-secondary)' }}>{(cardData.brand ?? '').toUpperCase()} **** {(cardData.number ?? '').replace(/\s/g, '').slice(-4)}</div>
        </div>
        {error && <div style={{ padding: 12, background: '#fff3f3', borderRadius: 8, border: '1px solid #fecaca', color: 'var(--color-error)', fontSize: 13, marginTop: 12 }}>{error}</div>}
        <Button fullWidth loading={loading} onClick={handlePay} style={{ marginTop: 20 }}>Confirmar pago - {formatCOP(transaction.totalInCents)}</Button>
        <button onClick={() => { setOpen(false); dispatch(goToStep(2)); }} style={{ width: '100%', marginTop: 12, background: 'none', border: 'none', fontSize: 14, color: 'var(--color-on-surface-secondary)', cursor: 'pointer', padding: 8 }}>
          Editar datos
        </button>
      </Backdrop>
      {!open && <Button fullWidth onClick={() => setOpen(true)}>Ver detalle de pago</Button>}
    </div>
  );
};