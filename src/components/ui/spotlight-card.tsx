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
  gold:   { base: 45,  spread: 120 },
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

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;
      const xp = (lx / rect.width).toFixed(4);
      card.style.setProperty('--lx', lx.toFixed(2));
      card.style.setProperty('--ly', ly.toFixed(2));
      card.style.setProperty('--xp', xp);
    };

    const handleLeave = () => {
      card.style.setProperty('--lx', '-999');
      card.style.setProperty('--ly', '-999');
    };

    card.addEventListener('pointermove', handleMove);
    card.addEventListener('pointerleave', handleLeave);
    return () => {
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const getInlineStyles = (): React.CSSProperties & Record<string, string | number> => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--backdrop': 'hsl(0 0% 10% / 0.6)',
      '--backup-border': 'rgba(201,168,76,0.15)',
      '--size': '280',
      '--border-size': '1px',
      '--spotlight-size': 'calc(var(--size, 280) * 1px)',
      '--hue': `calc(${base} + (var(--xp, 0) * ${spread}))`,
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--lx, -999) * 1px)
        calc(var(--ly, -999) * 1px),
        hsl(var(--hue) 80% 65% / 0.10), transparent
      )`,
      backgroundColor: 'var(--backdrop)',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative',
      touchAction: 'none',
      overflow: 'hidden',
    };

    if (width !== undefined) {
      baseStyles['width'] = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles['height'] = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  return (
    <div
      ref={cardRef}
      style={getInlineStyles()}
      className={`${getSizeClasses()} rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px] ${className}`}
    >
      {children}
    </div>
  );
};

export { GlowCard };
