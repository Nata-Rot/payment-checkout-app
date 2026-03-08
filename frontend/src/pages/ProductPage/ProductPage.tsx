import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchProducts } from '../../store/slices/productSlice';
import { selectProduct } from '../../store/slices/checkoutSlice';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Spinner } from '../../components/shared/Spinner';

export const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(s => s.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div style={{ padding: 16, animation: 'fadeIn .3s ease' }}>
      <div style={{ padding: '20px 0 24px', borderBottom: '1px solid var(--color-border)', marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: 'var(--color-primary)', fontWeight: 600, letterSpacing: .5 }}>NUESTRA TIENDA</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>Productos</h1>
        <p style={{ fontSize: 14, color: 'var(--color-on-surface-secondary)', marginTop: 4 }}>Selecciona el producto que deseas comprar</p>
      </div>
      {loading && <Spinner />}
      {error && <div style={{ padding: 16, background: '#fff3f3', borderRadius: 8, border: '1px solid #fecaca', color: 'var(--color-error)', fontSize: 14 }}>{error}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map(product => (
          <ProductCard key={product.id} product={product} onSelect={() => dispatch(selectProduct(product))} />
        ))}
      </div>
    </div>
  );
};