import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<Props> = ({ children, variant = 'primary', loading, fullWidth, disabled, style, ...rest }) => (
  <button
    disabled={disabled || loading}
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: '14px 24px', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: 15,
      transition: 'all .2s', cursor: disabled || loading ? 'not-allowed' : 'pointer',
      width: fullWidth ? '100%' : undefined, border: 'none',
      background: variant === 'primary' ? (disabled || loading ? '#ccc' : 'var(--color-primary)') : 'transparent',
      color: variant === 'primary' ? 'white' : 'var(--color-primary)',
      opacity: disabled || loading ? 0.7 : 1,
      ...style,
    }}
    {...rest}
  >
    {loading
      ? <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
      : children}
  </button>
);