import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TITLE = 'HARLEKIN'
const SUBTITLE = "We don't follow standards... WE SET THEM!"

const InkParticle = ({ style }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
      ...style,
    }}
    animate={{
      y: [0, -30, 0],
      opacity: [0.2, 0.6, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration: style.duration || 4,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: style.delay || 0,
    }}
  />
)

export default function Hero() {
  const [phase, setPhase] = useState('black') // black → inkReveal → title → subtitle → done
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('inkReveal'), 400)
    const timer2 = setTimeout(() => setPhase('title'), 1600)
    const timer3 = setTimeout(() => setPhase('subtitle'), 3200)
    const timer4 = setTimeout(() => setPhase('done'), 4200)
    return () => [timer1, timer2, timer3, timer4].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const particles = [
    { width: 300, height: 300, top: '10%', left: '5%', duration: 6, delay: 0 },
    { width: 200, height: 200, top: '60%', left: '80%', duration: 5, delay: 1 },
    { width: 150, height: 150, top: '30%', left: '70%', duration: 7, delay: 2 },
    { width: 400, height: 400, top: '70%', left: '20%', duration: 8, delay: 0.5 },
    { width: 100, height: 100, top: '15%', left: '50%', duration: 4, delay: 3 },
  ]

  return (
    <div
      ref={heroRef}
      className="panel relative flex items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* Parallax BG image */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1920&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
          willChange: 'transform',
        }}
        animate={{
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      {/* Ink radial overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #080808 70%)',
        }}
      />

      {/* Floating ink particles */}
      {particles.map((p, i) => (
        <InkParticle key={i} style={p} />
      ))}

      {/* Ink reveal blob from center */}
      <AnimatePresence>
        {phase !== 'black' && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(26,26,46,0.6) 0%, rgba(8,8,8,0.95) 60%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* Thin gold line top */}
        <motion.div
          className="w-24 h-px bg-gold mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'title' || phase === 'subtitle' || phase === 'done' ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Overline */}
        <motion.p
          className="text-gold tracking-[6px] text-xs uppercase font-body mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'title' || phase === 'subtitle' || phase === 'done' ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          Pforzheim · Tattoo & Piercing
        </motion.p>

        {/* Logo */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
          animate={
            phase === 'title' || phase === 'subtitle' || phase === 'done'
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.8, filter: 'blur(12px)' }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/harlekin-logo.png"
            alt="Harlekin Logo"
            className="w-40 h-40 md:w-52 md:h-52 object-contain"
            style={{ mixBlendMode: 'screen', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.3))' }}
          />
        </motion.div>

        {/* Title letters */}
        <div className="flex justify-center gap-1 mb-6 overflow-hidden">
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-black text-cream leading-none"
              style={{
                textShadow: '0 0 60px rgba(201,168,76,0.3)',
              }}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              animate={
                phase === 'title' || phase === 'subtitle' || phase === 'done'
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 60, filter: 'blur(12px)' }
              }
              transition={{
                duration: 0.7,
                delay: char === ' ' ? 0 : i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </div>

        {/* Gold shimmer line under title */}
        <motion.div
          className="gold-shimmer font-display text-xl md:text-2xl italic mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'subtitle' || phase === 'done' ? 1 : 0, y: phase === 'subtitle' || phase === 'done' ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {SUBTITLE}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button className="btn-gold" onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Termin Buchen</span>
          </button>
          <button className="btn-gold" style={{ background: 'transparent' }} onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>Galerie ansehen</span>
          </button>
        </motion.div>

        {/* Thin gold line bottom */}
        <motion.div
          className="w-24 h-px bg-gold mx-auto mt-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: phase === 'done' ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'done' ? 1 : 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-gold/50 text-xs tracking-[4px] uppercase">Scroll</p>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </div>
  )
}
