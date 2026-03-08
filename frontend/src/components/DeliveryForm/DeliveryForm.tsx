import React from 'react';
import { Input } from '../shared/Input';
import type { DeliveryData } from '../../types';

const DEPARTMENTS = ['Amazonas','Antioquia','Arauca','Atlantico','Bolivar','Boyaca','Caldas','Caqueta','Casanare','Cauca','Cesar','Choco','Cordoba','Cundinamarca','Guainia','Guaviare','Huila','La Guajira','Magdalena','Meta','Narino','Norte de Santander','Putumayo','Quindio','Risaralda','San Andres y Providencia','Santander','Sucre','Tolima','Valle del Cauca','Vaupes','Vichada'];

interface Props { value: Partial<DeliveryData>; errors: Record<string, string>; onChange: (field: keyof DeliveryData, value: string) => void; }

export const DeliveryForm: React.FC<Props> = ({ value, errors, onChange }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Input label="Direccion de entrega" placeholder="Calle 123 # 45-67, Apto 8" value={value.address ?? ''} onChange={e => onChange('address', e.target.value)} error={errors.address} />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <Input label="Ciudad" placeholder="Bogota" value={value.city ?? ''} onChange={e => onChange('city', e.target.value)} error={errors.city} />
      <Input label="Codigo postal" placeholder="110111" value={value.postalCode ?? ''} onChange={e => onChange('postalCode', e.target.value.replace(/\D/g,'').slice(0,7))} inputMode="numeric" error={errors.postalCode} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface-secondary)' }}>Departamento</label>
      <select value={value.department ?? ''} onChange={e => onChange('department', e.target.value)}
        style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + (errors.department ? 'var(--color-error)' : 'var(--color-border)'), fontSize: 15, background: 'var(--color-surface)', width: '100%' }}>
        <option value="">Selecciona un departamento</option>
        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      {errors.department && <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{errors.department}</span>}
    </div>
  </div>
);