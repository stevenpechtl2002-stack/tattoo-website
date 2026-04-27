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

const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
  gold:   { base: 45,  spread: 60  },
};

const sizeMap = {
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
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => (customSize ? '' : sizeMap[size]);

  const getInlineStyles = (): React.CSSProperties & Record<string, string | number> => {
    const s: React.CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '2',
      '--backdrop': 'rgba(13, 13, 26, 0.75)',
      '--backup-border': 'rgba(201,168,76,0.18)',
      '--size': '240',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 45) calc(var(--saturation, 85) * 1%) calc(var(--lightness, 65) * 1%) / var(--bg-spot-opacity, 0.12)), transparent
      )`,
      backgroundColor: 'var(--backdrop)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
    };
    if (width !== undefined) s['width'] = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) s['height'] = typeof height === 'number' ? `${height}px` : height;
    return s;
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={getInlineStyles()}
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-2xl relative grid grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-5 gap-4 backdrop-blur-[6px]
        ${className}
      `}
    >
      <div ref={innerRef} data-glow />
      {children}
    </div>
  );
};

export { GlowCard };
