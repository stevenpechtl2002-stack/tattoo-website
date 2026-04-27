import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MeshGradient } from '@paper-design/shaders-react'

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

      {/* MeshGradient background */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#080808', '#1a1200', '#2a1a00', '#080808']}
        speed={0.4}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Ink radial overlay — darkens edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #080808 80%)',
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
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
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

    </div>
  )
}
