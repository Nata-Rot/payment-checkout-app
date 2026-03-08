import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { resetCheckout } from '../../store/slices/checkoutSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { Button } from '../../components/shared/Button';
import { formatCOP } from '../../utils/currency.utils';

export const StatusPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { transaction, selectedProduct, deliveryData } = useAppSelector(s => s.checkout);
  const isApproved = transaction?.status === 'APPROVED';

  const handleContinue = () => { dispatch(resetCheckout()); dispatch(fetchProducts()); };

  if (!transaction) return null;

  const total = Number(transaction.totalInCents ?? transaction.amountInCents ?? 0);

  return (
    <div style={{ padding: 24, animation: 'fadeIn .4s ease', textAlign: 'center' }}>
      <div style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '0 auto 20px', background: isApproved ? 'var(--color-success)' : 'var(--color-error)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'white', boxShadow: '0 4px 20px ' + (isApproved ? 'rgba(0,200,83,.3)' : 'rgba(244,67,54,.3)') }}>
          {isApproved ? '✓' : '✗'}
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{isApproved ? 'Pago exitoso!' : 'Pago no procesado'}</h1>
        <p style={{ fontSize: 15, color: 'var(--color-on-surface-secondary)', lineHeight: 1.5 }}>
          {isApproved ? 'Tu compra ha sido confirmada. Recibiras tu pedido pronto.' : 'No pudimos procesar tu pago. Intenta de nuevo o usa otra tarjeta.'}
        </p>
      </div>
      <div style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', padding: 20, textAlign: 'left', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-on-surface-secondary)', letterSpacing: .5, marginBottom: 12, textTransform: 'uppercase' }}>Detalle de la transaccion</div>
        {[
          { label: 'Referencia', value: transaction.reference },
          { label: 'Estado', value: transaction.status },
          { label: 'Producto', value: selectedProduct?.name },
          { label: 'Total cobrado', value: total > 0 ? formatCOP(total) : 'N/A' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--color-border)', fontSize: 14 }}>
            <span style={{ color: 'var(--color-on-surface-secondary)' }}>{row.label}</span>
            <span style={{ fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}
      </div>
      {isApproved && deliveryData?.address && (
        <div style={{ background: '#f0fff4', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'left', marginBottom: 24, border: '1px solid #bbf7d0' }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Direccion de entrega</div>
          <p style={{ fontSize: 13, color: 'var(--color-on-surface-secondary)', lineHeight: 1.5 }}>
            {deliveryData.address}, {deliveryData.city}<br />{deliveryData.department} - CP {deliveryData.postalCode}
          </p>
        </div>
      )}
      <Button fullWidth onClick={handleContinue}>{isApproved ? 'Seguir comprando' : 'Volver a la tienda'}</Button>
    </div>
  );
};