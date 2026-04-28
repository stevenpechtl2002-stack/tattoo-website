import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STYLE_FILTERS = ['Alle', 'Black & Grey', 'Blackwork', 'Maori']
const BODY_FILTERS = ['Alle', 'Arm', 'Rücken', 'Bein', 'Hand']

const IMAGES = [
  { src: '/bilder/IMG_2591_2.jpg', style: 'Black & Grey', body: 'Rücken' },
  { src: '/bilder/IMG_2592.jpg', style: 'Blackwork', body: 'Bein' },
  { src: '/bilder/IMG_2593_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2594_2.jpg', style: 'Maori', body: 'Rücken' },
  { src: '/bilder/IMG_2595_2.jpg', style: 'Black & Grey', body: 'Rücken' },
  { src: '/bilder/IMG_2596_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2597_2.jpg', style: 'Black & Grey', body: 'Hand' },
  { src: '/bilder/IMG_2598_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2599_2.jpg', style: 'Blackwork', body: 'Arm' },
  { src: '/bilder/IMG_2599.jpg', style: 'Blackwork', body: 'Arm' },
  { src: '/bilder/IMG_2600_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2601_2.jpg', style: 'Blackwork', body: 'Bein' },
  { src: '/bilder/IMG_2602_2.jpg', style: 'Black & Grey', body: 'Bein' },
  { src: '/bilder/IMG_2603.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2604_2.jpg', style: 'Maori', body: 'Arm' },
  { src: '/bilder/IMG_2605_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2606_2.jpg', style: 'Black & Grey', body: 'Arm' },
  { src: '/bilder/IMG_2606.jpg', style: 'Black & Grey', body: 'Arm' },
]

function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 18px',
        border: `1px solid ${active ? '#c9a84c' : 'rgba(245,245,245,0.1)'}`,
        background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
        color: active ? '#c9a84c' : 'rgba(245,245,245,0.5)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.72rem',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderRadius: 2,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [images.length, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 3000,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: 900, width: '100%' }}
      >
        <img
          src={images[idx].src}
          alt={`${images[idx].style} – ${images[idx].body}`}
          style={{ width: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block' }}
        />
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#c9a84c', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(201,168,76,0.3)', padding: '2px 10px' }}>
              {images[idx].style}
            </span>
            <span style={{ color: 'rgba(245,245,245,0.4)', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', border: '1px solid rgba(245,245,245,0.1)', padding: '2px 10px' }}>
              {images[idx].body}
            </span>
          </div>
          <p style={{ color: 'rgba(245,245,245,0.3)', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
            {idx + 1} / {images.length}
          </p>
        </div>

        <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{ position: 'absolute', left: -60, top: '45%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', width: 46, height: 46, cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
        <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{ position: 'absolute', right: -60, top: '45%', transform: 'translateY(-50%)', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', width: 46, height: 46, cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        <button onClick={onClose} style={{ position: 'absolute', top: -50, right: 0, background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c', width: 36, height: 36, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </motion.div>
    </motion.div>
  )
}

export default function GalleriePage() {
  const [styleFilter, setStyleFilter] = useState('Alle')
  const [bodyFilter, setBodyFilter] = useState('Alle')
  const [lightbox, setLightbox] = useState(null)

  const filtered = IMAGES.filter(img =>
    (styleFilter === 'Alle' || img.style === styleFilter) &&
    (bodyFilter === 'Alle' || img.body === bodyFilter)
  )

  return (
    <main style={{ minHeight: '100vh', background: '#080808' }}> 

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mt-2">Galerie</h1>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-10 space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div>
            <p className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body mb-3">Art des Tattoos</p>
            <div className="flex flex-wrap gap-2">
              {STYLE_FILTERS.map(f => (
                <FilterBtn key={f} label={f} active={styleFilter === f} onClick={() => setStyleFilter(f)} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body mb-3">Körperteil</p>
            <div className="flex flex-wrap gap-2">
              {BODY_FILTERS.map(f => (
                <FilterBtn key={f} label={f} active={bodyFilter === f} onClick={() => setBodyFilter(f)} />
              ))}
            </div>
          </div>
          <p className="text-cream/25 text-xs font-body">{filtered.length} Bilder</p>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, i) => (
              <motion.button
                key={`${img.src}-${img.style}-${img.body}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                onClick={() => setLightbox(i)}
                className="relative overflow-hidden group"
                style={{ aspectRatio: '3/4', borderRadius: 3 }}
              >
                <img
                  src={img.src}
                  alt={`${img.style} ${img.body}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                  <p className="text-[9px] text-gold tracking-[2px] uppercase font-body">{img.style}</p>
                  <p className="text-[9px] text-cream/60 tracking-[1px] uppercase font-body">{img.body}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-cream/30 font-body">Keine Bilder für diese Kombination gefunden.</p>
            <button
              onClick={() => { setStyleFilter('Alle'); setBodyFilter('Alle') }}
              className="btn-gold mt-6"
              style={{ background: 'transparent' }}
            >
              <span>Filter zurücksetzen</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={filtered} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
