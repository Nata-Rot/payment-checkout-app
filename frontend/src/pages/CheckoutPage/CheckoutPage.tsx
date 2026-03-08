import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCardData, setDeliveryData, upsertCustomer, createTransaction, goToStep } from '../../store/slices/checkoutSlice';
import type { RootState } from '../../store';
import { CreditCardInput } from '../../components/CreditCardInput/CreditCardInput';
import { DeliveryForm } from '../../components/DeliveryForm/DeliveryForm';
import { Input } from '../../components/shared/Input';
import { Button } from '../../components/shared/Button';
import { validateCard } from '../../utils/card.utils';
import { formatCOP } from '../../utils/currency.utils';

type CardData = NonNullable<RootState['checkout']['cardData']>;
type DeliveryData = NonNullable<RootState['checkout']['deliveryData']>;

const sectionTitle: React.CSSProperties = { fontSize: 15, fontWeight: 600, marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--color-border)' };

export const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProduct, cardData, deliveryData, customer } = useAppSelector(s => s.checkout);
  const { loading, error } = useAppSelector(s => s.ui);
  const [form, setForm] = useState({ fullName: customer?.fullName ?? '', email: customer?.email ?? '', phone: customer?.phone ?? '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = { ...validateCard(cardData) };
    if (!form.fullName.trim()) e.fullName = 'Nombre requerido';
    if (!form.email.includes('@')) e.email = 'Email invalido';
    if (!form.phone) e.phone = 'Telefono requerido';
    if (!deliveryData.address) e.address = 'Direccion requerida';
    if (!deliveryData.city) e.city = 'Ciudad requerida';
    if (!deliveryData.department) e.department = 'Departamento requerido';
    if (!deliveryData.postalCode) e.postalCode = 'Codigo postal requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || !selectedProduct) return;
    const customerResult = await dispatch(upsertCustomer(form));
    if (upsertCustomer.fulfilled.match(customerResult)) {
      await dispatch(createTransaction({ productId: selectedProduct.id, customerId: customerResult.payload.id }));
    }
  };

  return (
    <div style={{ padding: 16, animation: 'fadeIn .3s ease' }}>
      <button onClick={() => dispatch(goToStep(1))} style={{ background: 'none', border: 'none', fontSize: 14, color: 'var(--color-on-surface-secondary)', marginBottom: 20, padding: 0, cursor: 'pointer' }}>
        ← Volver
      </button>
      {selectedProduct && (
        <div style={{ background: 'var(--color-bg)', borderRadius: 8, padding: 12, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{selectedProduct.name}</div>
            <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatCOP(selectedProduct.priceInCents)}</div>
          </div>
        </div>
      )}
      <section style={{ marginBottom: 28 }}>
        <h2 style={sectionTitle}>Informacion personal</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input label="Nombre completo" value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} error={errors.fullName} />
          <Input label="Correo electronico" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} error={errors.email} />
          <Input label="Telefono celular" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="3001234567" error={errors.phone} />
        </div>
      </section>
      <section style={{ marginBottom: 28 }}>
        <h2 style={sectionTitle}>Tarjeta de credito</h2>
        <CreditCardInput value={cardData} errors={errors} onChange={(field, val) => dispatch(setCardData({ [field]: val } as Partial<CardData>))} />
      </section>
      <section style={{ marginBottom: 28 }}>
        <h2 style={sectionTitle}>Datos de entrega</h2>
        <DeliveryForm value={deliveryData} errors={errors} onChange={(field, val) => dispatch(setDeliveryData({ [field]: val } as Partial<DeliveryData>))} />
      </section>
      {error && <div style={{ padding: 12, background: '#fff3f3', borderRadius: 8, border: '1px solid #fecaca', color: 'var(--color-error)', fontSize: 14, marginBottom: 16 }}>{error}</div>}
      <Button fullWidth loading={loading} onClick={handleSubmit}>Ver resumen de pago</Button>
    </div>
  );
};