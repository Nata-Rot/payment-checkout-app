import React, { useEffect } from 'react';

interface Props { isOpen: boolean; onClose?: () => void; title?: string; children: React.ReactNode; }

export const Backdrop: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => { document.body.style.overflow = isOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [isOpen]);
  if (!isOpen) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'flex-end', animation: 'fadeIn .2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', width: '100%', maxWidth: 'var(--max-width)', margin: '0 auto', boxShadow: '0 -4px 20px rgba(0,0,0,.15)', animation: 'slideUp .3s ease' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-border)' }} />
        </div>
        {title && <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--color-border)' }}><h2 style={{ fontSize: 17, fontWeight: 600 }}>{title}</h2></div>}
        <div style={{ padding: '16px 20px 32px', overflowY: 'auto', maxHeight: '75dvh' }}>{children}</div>
      </div>
    </div>
  );
};