import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const SERVICES = [
  {
    id: 0,
    icon: '◈',
    name: 'Realistisch & Portrait',
    desc: 'Fotorealistische Tattoos, die Gesichter, Tiere und Szenen zum Leben erwecken. Jedes Detail mit chirurgischer Präzision gestochen.',
    tag: 'REALISTIK',
  },
  {
    id: 1,
    icon: '◉',
    name: 'Blackwork & Linework',
    desc: 'Kraftvolle Schwarz-Tattoos mit klaren Linien und geometrischen Mustern. Zeitlos, mutig und präzise ausgeführt.',
    tag: 'BLACKWORK',
  },
  {
    id: 2,
    icon: '◆',
    name: 'Old School & Traditional',
    desc: 'Klassische Tattoo-Kunst in satten Farben und fetten Linien. Ein Tribut an die goldene Ära des Tattooing.',
    tag: 'TRADITIONAL',
  },
  {
    id: 3,
    icon: '◇',
    name: 'Watercolor & Fine Art',
    desc: 'Fließende Aquarell-Effekte auf der Haut. Weiche Übergänge und lebendige Farben wie ein echtes Gemälde.',
    tag: 'WATERCOLOR',
  },
  {
    id: 4,
    icon: '◎',
    name: 'Cover Up & Rework',
    desc: 'Altes Tattoo — neues Leben. Wir verwandeln Tattoos, die du bereust, in Kunstwerke, die du liebst.',
    tag: 'COVER UP',
  },
  {
    id: 5,
    icon: '◐',
    name: 'Lettering & Schrift',
    desc: 'Worte, die auf der Haut tanzen. Von klassischer Kalligraphie bis hin zu modernen Typografie-Meisterwerken.',
    tag: 'LETTERING',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}>
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="mb-14">
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">02</p>
          <h2 className="font-display text-5xl text-cream mt-2">Leistungen</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <GlowCard
                glowColor="gold"
                customSize
                className="w-full min-h-[260px] flex flex-col justify-between"
              >
                {/* Top: icon + tag */}
                <div className="flex items-start justify-between">
                  <motion.span
                    className="text-3xl text-gold"
                    animate={{ scale: hovered === service.id ? 1.2 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.span>
                  <span className="text-gold/40 text-[10px] tracking-[3px] font-body border border-gold/20 px-2 py-0.5">
                    {service.tag}
                  </span>
                </div>

                {/* Bottom: name + desc */}
                <div>
                  <div className="w-8 h-px bg-gold/40 mb-3" />
                  <h3 className="font-display text-xl text-cream mb-2 leading-snug">
                    {service.name}
                  </h3>
                  <AnimatePresence>
                    {hovered === service.id && (
                      <motion.p
                        className="text-cream/60 text-sm font-body leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {hovered !== service.id && (
                    <p className="text-cream/30 text-xs font-body">
                      Hover für Details →
                    </p>
                  )}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
