import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STATS = [
  { value: 12, suffix: '+', label: 'Jahre Erfahrung' },
  { value: 4800, suffix: '+', label: 'Tattoos gestochen' },
  { value: 6, suffix: '', label: 'Künstler im Team' },
  { value: 100, suffix: '%', label: 'Kundenzufriedenheit' },
]

function StatCounter({ value, suffix, label }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="font-display text-5xl gold-shimmer font-black">
        {value}{suffix}
      </div>
      <div className="text-cream/50 text-xs tracking-[3px] uppercase mt-2 font-body">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const midY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const fgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  return (
    <div ref={ref} className="panel relative flex items-center overflow-hidden" style={{ background: '#080808' }}>
      {/* Layer 1: Deep background — abstract ink shapes */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(ellipse 600px 400px at 80% 30%, rgba(26,26,46,0.9) 0%, transparent 70%),
              radial-gradient(ellipse 400px 600px at 20% 70%, rgba(201,168,76,0.08) 0%, transparent 70%)
            `,
          }}
        />
        {/* Ink blob shapes */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <ellipse cx="900" cy="200" rx="300" ry="200" fill="#c9a84c" />
          <ellipse cx="200" cy="600" rx="250" ry="180" fill="#1a1a2e" />
          <ellipse cx="600" cy="400" rx="200" ry="300" fill="#c9a84c" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Layer 2: Mid — artist photo */}
      <motion.div
        className="absolute right-0 top-0 h-full w-1/2"
        style={{ y: midY, willChange: 'transform' }}
      >
        <img
          src="https://images.unsplash.com/photo-1590246814883-57c511e84693?w=800&q=80"
          alt="Tattoo Artist"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #080808 0%, transparent 40%, rgba(8,8,8,0.4) 100%)',
          }}
        />
      </motion.div>

      {/* Layer 3: Foreground — text content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl px-12 md:pl-16"
        style={{ y: fgY, willChange: 'transform' }}
      >
        <div className="max-w-lg">
          {/* Section label */}
          <div className="mb-8">
            <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">04</p>
            <h2 className="font-display text-2xl text-cream mt-1">Über Uns</h2>
            <div className="w-12 h-px bg-gold mt-3" />
          </div>

          <motion.h3
            className="font-display text-5xl md:text-6xl text-cream leading-tight mb-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Kunst die
            <br />
            <span className="gold-shimmer">bleibt.</span>
          </motion.h3>

          <motion.div
            className="w-16 h-px bg-gold mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <motion.p
            className="text-cream/65 font-body leading-relaxed text-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Harlekin Tattoo & Piercing ist dein Studio in Pforzheim und dem Enzkreis — mit zeitnahen Terminen und fairen Preisen. Mehrfarbige und schwarz-weiße Tattoos, professionelles Piercing, Maori, Asia-Designs und mehr.
          </motion.p>

          <motion.p
            className="text-cream/50 font-body leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            We don't follow standards — WE SET THEM.
          </motion.p>

          <motion.button
            className="btn-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span>Unser Team</span>
          </motion.button>
        </div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-4 gap-8 mt-16 pt-12 border-t border-gold/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {STATS.map((stat, i) => (
            <StatCounter key={i} {...stat} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
