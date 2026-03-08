import React from 'react';
import type { Product } from '../../types';
import { formatCOP } from '../../utils/currency.utils';
import { Button } from '../shared/Button';

interface Props { product: Product; onSelect: () => void; }

export const ProductCard: React.FC<Props> = ({ product, onSelect }) => (
  <article style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--color-border)', animation: 'fadeIn .3s ease' }}>
    <div style={{ position: 'relative', paddingTop: '56%', background: '#f0f0f0' }}>
      <img src={product.imageUrl} alt={product.name} loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      {product.stock > 0 && product.stock <= 5 && (
        <span style={{ position: 'absolute', top: 10, right: 10, background: 'var(--color-warning)', color: 'white', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 'var(--radius-full)' }}>
          Ultimas {product.stock}!
        </span>
      )}
      {product.stock === 0 && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontSize: 16, fontWeight: 700 }}>Agotado</span>
        </div>
      )}
    </div>
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, flex: 1, marginRight: 12 }}>{product.name}</h2>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>{formatCOP(product.priceInCents)}</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--color-on-surface-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{product.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--color-on-surface-secondary)' }}>{product.stock > 0 ? product.stock + ' en stock' : 'Sin stock'}</span>
        <Button onClick={onSelect} disabled={product.stock === 0} style={{ padding: '10px 20px', fontSize: 14 }}>Pagar con tarjeta</Button>
      </div>
    </div>
  </article>
);