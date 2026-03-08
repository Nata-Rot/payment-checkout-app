import React from 'react';
export const Spinner: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
    <div style={{ width: size, height: size, border: '3px solid var(--color-border)',
      borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
  </div>
);