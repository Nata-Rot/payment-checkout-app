import React from 'react';
import { useAppSelector } from './store';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage/CheckoutPage';
import { SummaryPage } from './pages/SummaryPage/SummaryPage';
import { StatusPage } from './pages/StatusPage/StatusPage';

const STEPS = ['Producto', 'Pago', 'Resumen', 'Estado'];

const ProgressBar: React.FC<{ step: number }> = ({ step }) => (
  <div style={{ padding: '12px 16px', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 50 }}>
    <div style={{ display: 'flex', gap: 4 }}>
      {STEPS.map((label, i) => {
        const s = i + 1; const active = s === step; const done = s < step;
        return (
          <div key={label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: 3, borderRadius: 2, marginBottom: 4, background: done || active ? 'var(--color-primary)' : 'var(--color-border)', transition: 'background .3s' }} />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, color: active ? 'var(--color-primary)' : done ? 'var(--color-on-surface)' : 'var(--color-on-surface-secondary)' }}>{label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

export const App: React.FC = () => {
  const step = useAppSelector(s => s.checkout.step);
  return (
    <>
      <ProgressBar step={step} />
      {step === 1 && <ProductPage />}
      {step === 2 && <CheckoutPage />}
      {step === 3 && <SummaryPage />}
      {step === 4 && <StatusPage />}
    </>
  );
};