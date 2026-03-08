import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<Props> = ({ label, error, rightElement, id, ...rest }) => {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <label htmlFor={inputId} style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-on-surface-secondary)' }}>
        {label}
      </label>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input id={inputId}
          style={{ width: '100%', padding: '12px 16px', paddingRight: rightElement ? 48 : 16,
            borderRadius: 'var(--radius-sm)', border: '1.5px solid ' + (error ? 'var(--color-error)' : 'var(--color-border)'),
            fontSize: 15, outline: 'none', background: 'var(--color-surface)', transition: 'border-color .15s' }}
          {...rest} />
        {rightElement && <span style={{ position: 'absolute', right: 12 }}>{rightElement}</span>}
      </div>
      {error && <span style={{ fontSize: 12, color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
};