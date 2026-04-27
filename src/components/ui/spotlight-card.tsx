import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap: Record<string, { h: number; s: number }> = {
  blue:   { h: 220, s: 90 },
  purple: { h: 280, s: 90 },
  green:  { h: 120, s: 80 },
  red:    { h: 0,   s: 90 },
  orange: { h: 30,  s: 90 },
  gold:   { h: 45,  s: 85 },
};

const sizeMap: Record<string, string> = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
};

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'gold',
  size = 'md',
  width,
  height,
  customSize = false,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      wrap.style.setProperty('--mx', `${x.toFixed(2)}%`);
      wrap.style.setProperty('--my', `${y.toFixed(2)}%`);
      wrap.style.setProperty('--opacity', '1');
    };

    const onLeave = () => {
      wrap.style.setProperty('--opacity', '0');
    };

    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const { h, s } = glowColorMap[glowColor];
  const sizeClass = customSize ? '' : sizeMap[size];

  const wrapStyle: React.CSSProperties & Record<string, string> = {
    '--mx': '50%',
    '--my': '50%',
    '--opacity': '0',
    background: `radial-gradient(
      180px circle at var(--mx) var(--my),
      hsl(${h} ${s}% 65% / calc(var(--opacity) * 0.9)) 0%,
      hsl(${h} ${s}% 50% / calc(var(--opacity) * 0.5)) 30%,
      transparent 70%
    )`,
    padding: '1.5px',
    borderRadius: '16px',
    position: 'relative',
    transition: 'background 0.05s',
  };

  if (width !== undefined) wrapStyle['width'] = typeof width === 'number' ? `${width}px` : String(width);
  if (height !== undefined) wrapStyle['height'] = typeof height === 'number' ? `${height}px` : String(height);

  const innerStyle: React.CSSProperties = {
    background: 'rgba(13, 13, 26, 0.85)',
    borderRadius: '14.5px',
    height: '100%',
    backdropFilter: 'blur(8px)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
  };

  return (
    <div
      ref={wrapRef}
      style={wrapStyle}
      className={`${sizeClass} ${customSize ? '' : 'aspect-[3/4]'} shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div style={innerStyle} className="relative flex flex-col p-6 gap-4">
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
