import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Home',        path: '/' },
  { label: 'Leistungen',  path: '/leistungen' },
  { label: 'Galerie',     path: '/galerie' },
  { label: 'Über Uns',    path: '/ueber-uns' },
  { label: 'Team',        path: '/team' },
  { label: 'Preise',      path: '/preise' },
  { label: 'FAQ',         path: '/faq' },
  { label: 'Kontakt',     path: '/kontakt' },
  { label: 'AGB',         modal: 'agb' },
  { label: 'Datenschutz', modal: 'datenschutz' },
  { label: 'Impressum',   modal: 'impressum' },
]

export default function Nav({ onOpenModal }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  const go = (link) => {
    setOpen(false)
    if (link.modal) {
      onOpenModal?.(link.modal)
      return
    }
    navigate(link.path)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Menü"
        style={{
          position: 'fixed', top: 24, left: 24, zIndex: 1000,
          background: 'rgba(8,8,8,0.7)', border: '1px solid rgba(201,168,76,0.3)',
          backdropFilter: 'blur(12px)', borderRadius: 8,
          width: 44, height: 44, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 5,
          cursor: 'pointer', padding: 0,
        }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={open ? (
              i === 0 ? { rotate: 45, y: 7 } :
              i === 1 ? { opacity: 0, scaleX: 0 } :
              { rotate: -45, y: -7 }
            ) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'block', width: 20, height: 1.5, background: '#c9a84c', borderRadius: 2 }}
          />
        ))}
      </button>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.03,
              backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px', pointerEvents: 'none',
            }} />

            <nav style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ marginBottom: 40 }}
              >
                <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '0 auto 16px' }} />
                <span style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                  Harlekin Tattoo & Piercing
                </span>
              </motion.div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {LINKS.map((link, i) => {
                  const isModal = !!link.modal
                  const isActive = !isModal && location.pathname === link.path
                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        onClick={() => go(link)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: "'Playfair Display', serif",
                          fontSize: isModal ? '1rem' : '2.2rem',
                          fontWeight: isModal ? 400 : 700,
                          color: isActive ? '#c9a84c' : isModal ? 'rgba(201,168,76,0.4)' : '#f5f5f5',
                          letterSpacing: isModal ? '3px' : '-0.5px',
                          textTransform: isModal ? 'uppercase' : 'none',
                          padding: '4px 0',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                        onMouseLeave={e => e.currentTarget.style.color = isActive ? '#c9a84c' : isModal ? 'rgba(201,168,76,0.4)' : '#f5f5f5'}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ marginTop: 40 }}
              >
                <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '0 auto 16px' }} />
                <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
                  {['Instagram', 'Facebook'].map(s => (
                    <a key={s} href={s === 'Instagram' ? 'https://www.instagram.com/harlekin_tattoo_pforzheim' : 'https://www.facebook.com/HarlekinTattooPforzheim/'}
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: 'rgba(201,168,76,0.5)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(201,168,76,0.5)'}
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
