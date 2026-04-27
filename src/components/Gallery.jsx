import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IMAGES = [
  { id: 0, url: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=1200&q=80', label: 'Realistik Portrait' },
  { id: 1, url: 'https://images.unsplash.com/photo-1590246814883-57c511e84693?w=1200&q=80', label: 'Blackwork' },
  { id: 2, url: 'https://images.unsplash.com/photo-1616493478363-c3dd6c9d4ee2?w=1200&q=80', label: 'Fine Line' },
  { id: 3, url: 'https://images.unsplash.com/photo-1628955987810-45434c5b4f95?w=1200&q=80', label: 'Traditional' },
  { id: 4, url: 'https://images.unsplash.com/photo-1503097843296-e290b4f16f64?w=1200&q=80', label: 'Geometric' },
  { id: 5, url: 'https://images.unsplash.com/photo-1555685812-4b8f59697ef3?w=1200&q=80', label: 'Watercolor' },
  { id: 6, url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=80', label: 'Lettering' },
  { id: 7, url: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=1200&q=80', label: 'Portrait' },
  { id: 8, url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=1200&q=80', label: 'Cover Up' },
]

const variants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

const wipeVariants = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
  exit: { clipPath: 'inset(0 0 0 100%)' },
}

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const dragStart = useRef(null)

  const go = useCallback((newIndex) => {
    const dir = newIndex > index ? 1 : -1
    setDirection(dir)
    setIndex((newIndex + IMAGES.length) % IMAGES.length)
  }, [index])

  const next = useCallback(() => go(index + 1), [go, index])
  const prev = useCallback(() => go(index - 1), [go, index])

  const onDragStart = (e) => {
    dragStart.current = e.clientX ?? e.touches?.[0]?.clientX
  }

  const onDragEnd = (e) => {
    if (dragStart.current === null) return
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX
    const delta = dragStart.current - endX
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
    dragStart.current = null
  }

  const current = IMAGES[index]

  return (
    <div className="panel relative overflow-hidden select-none" style={{ background: '#080808' }}>
      {/* Section label */}
      <div className="absolute top-12 left-12 z-20">
        <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">03</p>
        <h2 className="font-display text-2xl text-cream mt-1">Galerie</h2>
        <div className="w-12 h-px bg-gold mt-3" />
      </div>

      {/* Fullscreen image */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          <img
            src={current.url}
            alt={current.label}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Dark overlay gradient */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 40%, rgba(8,8,8,0.3) 100%)' }}
          />

          {/* Ink wipe overlay on entrance */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'rgba(8,8,8,1)' }}
            initial={{ clipPath: 'inset(0 0% 0 0)' }}
            animate={{ clipPath: 'inset(0 100% 0 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Image label */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-display text-3xl text-cream">{current.label}</p>
            <div className="w-16 h-px bg-gold mx-auto mt-2" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 text-gold/70 hover:border-gold hover:text-gold transition-all flex items-center justify-center"
        style={{ cursor: 'none' }}
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-gold/30 text-gold/70 hover:border-gold hover:text-gold transition-all flex items-center justify-center"
        style={{ cursor: 'none' }}
      >
        →
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{ cursor: 'none' }}
            className={`transition-all duration-300 rounded-full ${
              i === index
                ? 'w-6 h-2 bg-gold'
                : 'w-2 h-2 bg-cream/20 hover:bg-cream/40'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-12 right-12 z-20 text-right">
        <span className="font-display text-4xl text-gold">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-cream/30 text-lg"> / {String(IMAGES.length).padStart(2, '0')}</span>
      </div>

      {/* Drag hint */}
      <motion.div
        className="absolute bottom-8 right-12 z-20 flex items-center gap-2 text-cream/30 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span>← Ziehen →</span>
      </motion.div>
    </div>
  )
}
