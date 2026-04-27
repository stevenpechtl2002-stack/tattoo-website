import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children?: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
  /** Use card-local pointer coords — fixes "all glow at once" in dense grids */
  local?: boolean;
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
  local = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (local) {
      // Local mode: coordinates relative to THIS card only
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const lx = e.clientX - rect.left;
        const ly = e.clientY - rect.top;
        card.style.setProperty('--x', lx.toFixed(2));
        card.style.setProperty('--y', ly.toFixed(2));
        card.style.setProperty('--xp', (lx / rect.width).toFixed(4));
      };
      const onLeave = () => {
        // Push coords far off-card so glow disappears
        card.style.setProperty('--x', '-999');
        card.style.setProperty('--y', '-999');
      };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      return () => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
      };
    } else {
      // Global mode: viewport coordinates (original behaviour)
      const onMove = (e: PointerEvent) => {
        card.style.setProperty('--x', e.clientX.toFixed(2));
        card.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(4));
        card.style.setProperty('--y', e.clientY.toFixed(2));
        card.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(4));
      };
      document.addEventListener('pointermove', onMove);
      return () => document.removeEventListener('pointermove', onMove);
    }
  }, [local]);

  const { base, spread } = glowColorMap[glowColor];
  const getSizeClasses = () => (customSize ? '' : sizeMap[size]);

  const styles: React.CSSProperties & Record<string, string | number> = {
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
      calc(var(--x, -999) * 1px)
      calc(var(--y, -999) * 1px),
      hsl(var(--hue, 45) calc(var(--saturation, 85) * 1%) calc(var(--lightness, 65) * 1%) / var(--bg-spot-opacity, 0.12)), transparent
    )`,
    backgroundColor: 'var(--backdrop)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    // local mode: scroll so gradient is relative to element, not viewport
    backgroundAttachment: local ? 'local' : 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    touchAction: 'none',
  };

  if (width !== undefined) styles['width'] = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) styles['height'] = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={cardRef}
      data-glow={local ? 'local' : ''}
      data-glow-global={!local ? '' : undefined}
      style={styles}
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-2xl relative grid grid-rows-[1fr_auto]
        shadow-[0_1rem_2rem_-1rem_black]
        p-5 gap-4 backdrop-blur-[6px]
        ${className}
      `}
    >
      <div ref={innerRef} data-glow={local ? 'local' : ''} />
      {children}
    </div>
  );
};

export { GlowCard };
