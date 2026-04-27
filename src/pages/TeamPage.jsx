import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const TEAM = [
  {
    name: 'Max Weber',
    role: 'Realistisch & Portrait',
    tag: 'REALISTIK',
    years: '8 Jahre',
    img: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&q=80',
    bio: 'Max ist spezialisiert auf hyperrealistische Portraits und Black & Grey Tattoos. Sein Auge für Details macht jeden Stich zu einem Kunstwerk.',
    album: [
      { src: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=600&q=80', label: 'Portrait — Arm' },
      { src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&q=80', label: 'Realistik — Rücken' },
      { src: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80', label: 'Black & Grey — Brust' },
      { src: 'https://images.unsplash.com/photo-1590246815117-9e5d00fa3b3e?w=600&q=80', label: 'Portrait — Schulter' },
      { src: 'https://images.unsplash.com/photo-1604881990409-b9f246db39da?w=600&q=80', label: 'Realistik — Unterarm' },
      { src: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&q=80', label: 'Black & Grey — Bein' },
    ],
  },
  {
    name: 'Sarah Klein',
    role: 'Watercolor & Fine Art',
    tag: 'WATERCOLOR',
    years: '6 Jahre',
    img: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=400&q=80',
    bio: 'Sarah bringt mit ihrem einzigartigen Watercolor-Stil lebendige Farben auf die Haut. Ihre Motive wirken wie gemalte Kunstwerke.',
    album: [
      { src: 'https://images.unsplash.com/photo-1595167151695-dfb675cbf3f5?w=600&q=80', label: 'Watercolor — Arm' },
      { src: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=600&q=80', label: 'Fine Line — Handgelenk' },
      { src: 'https://images.unsplash.com/photo-1570294646112-47b0a8a41e08?w=600&q=80', label: 'Watercolor — Schulter' },
      { src: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=600&q=80', label: 'Fine Art — Rücken' },
      { src: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80', label: 'Watercolor — Bein' },
      { src: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=80', label: 'Fine Line — Rippen' },
    ],
  },
  {
    name: 'Tom Fischer',
    role: 'Blackwork & Linework',
    tag: 'BLACKWORK',
    years: '10 Jahre',
    img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&q=80',
    bio: 'Tom ist Meister des Blackwork. Präzise Linien, mutige Flächen und geometrische Muster sind seine Stärke.',
    album: [
      { src: 'https://images.unsplash.com/photo-1567327613485-fbc7bf196198?w=600&q=80', label: 'Blackwork — Arm' },
      { src: 'https://images.unsplash.com/photo-1608138404239-d2f6bf1a4665?w=600&q=80', label: 'Geometric — Brust' },
      { src: 'https://images.unsplash.com/photo-1598369114806-733c1b8b65e1?w=600&q=80', label: 'Linework — Rücken' },
      { src: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=600&q=80', label: 'Blackwork — Unterarm' },
      { src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&q=80', label: 'Geometric — Schulter' },
      { src: 'https://images.unsplash.com/photo-1559558406-0b80b8e94b8b?w=600&q=80', label: 'Linework — Bein' },
    ],
  },
  {
    name: 'Lisa Braun',
    role: 'Old School & Piercing',
    tag: 'TRADITIONAL',
    years: '5 Jahre',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
    bio: 'Lisa liebt klassische Traditional und Old School Motive. Kräftige Linien und satte Farben sind ihr Markenzeichen. Außerdem ist sie unsere Piercing-Spezialistin.',
    album: [
      { src: 'https://images.unsplash.com/photo-1605367520975-b4d078bc3e23?w=600&q=80', label: 'Traditional — Arm' },
      { src: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600&q=80', label: 'Old School — Brust' },
      { src: 'https://images.unsplash.com/photo-1576073719676-aa95325b19ab?w=600&q=80', label: 'Traditional — Bein' },
      { src: 'https://images.unsplash.com/photo-1587502537147-b4f7f25d1e1a?w=600&q=80', label: 'Piercing — Ohr' },
      { src: 'https://images.unsplash.com/photo-1562184552-997c461abbe1?w=600&q=80', label: 'Old School — Unterarm' },
      { src: 'https://images.unsplash.com/photo-1543857182-f71e7c0af56c?w=600&q=80', label: 'Traditional — Hand' },
    ],
  },
]

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
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: 800, width: '100%' }}
      >
        <img
          src={images[idx].src}
          alt={images[idx].label}
          style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', display: 'block' }}
        />
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', letterSpacing: '2px' }}>
            {images[idx].label}
          </p>
          <p style={{ color: 'rgba(245,245,245,0.3)', fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', marginTop: 4 }}>
            {idx + 1} / {images.length}
          </p>
        </div>

        {/* Prev */}
        <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{
          position: 'absolute', left: -56, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c',
          width: 44, height: 44, cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>‹</button>
        {/* Next */}
        <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{
          position: 'absolute', right: -56, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c',
          width: 44, height: 44, cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>›</button>
        {/* Close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: -48, right: 0,
          background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#c9a84c',
          width: 36, height: 36, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✕</button>
      </motion.div>
    </motion.div>
  )
}

import { useEffect } from 'react'

function MemberCard({ member, index }) {
  const [albumOpen, setAlbumOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <GlowCard glowColor="gold" customSize className="w-full flex flex-col overflow-hidden">
        {/* Portrait */}
        <div className="relative w-full overflow-hidden" style={{ height: 280 }}>
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          <span className="absolute top-3 right-3 text-gold/60 text-[9px] tracking-[2px] font-body border border-gold/20 px-2 py-0.5 bg-[#080808]/70">
            {member.tag}
          </span>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
          <div className="w-6 h-px bg-gold/40 mb-3" />
          <h3 className="font-display text-xl text-cream">{member.name}</h3>
          <p className="text-cream/50 text-xs font-body mt-1">{member.role}</p>
          <p className="text-gold/40 text-[10px] tracking-[2px] uppercase font-body mt-1 mb-3">{member.years} Erfahrung</p>
          <p className="text-cream/40 text-sm font-body leading-relaxed mb-5">{member.bio}</p>

          {/* Album toggle */}
          <button
            onClick={() => setAlbumOpen(v => !v)}
            className="btn-gold mt-auto"
            style={{ background: albumOpen ? undefined : 'transparent' }}
          >
            <span>{albumOpen ? 'Album schließen' : 'Fotoalbum ansehen'}</span>
          </button>
        </div>

        {/* Photo album grid */}
        <AnimatePresence initial={false}>
          {albumOpen && (
            <motion.div
              key="album"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-5 pb-5">
                <div className="w-full h-px bg-gold/10 mb-4" />
                <p className="text-gold/40 text-[9px] tracking-[3px] uppercase font-body mb-3">Arbeiten</p>
                <div className="grid grid-cols-3 gap-2">
                  {member.album.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(i)}
                      className="relative overflow-hidden group"
                      style={{ aspectRatio: '1', borderRadius: 4 }}
                    >
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlowCard>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={member.album} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#080808' }}>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-24">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Unser Team</p>
          <h1 className="font-display text-5xl md:text-6xl text-cream mt-2">Die Künstler</h1>
          <div className="w-12 h-px bg-gold mt-4" />
          <p className="text-cream/50 font-body mt-4 max-w-xl">
            Lerne unser Team kennen und entdecke ihre Arbeiten. Klicke auf „Fotoalbum ansehen" um die Werke eines Künstlers zu sehen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
