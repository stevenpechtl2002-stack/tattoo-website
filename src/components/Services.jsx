import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const ICONS = {
  blackgrey: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Tattoo needle / machine tip */}
      <line x1="8" y1="8" x2="24" y2="24" />
      <polyline points="24,24 28,32 20,28 24,24" fill="currentColor" strokeWidth="1" />
      {/* Shading dots */}
      <circle cx="6" cy="20" r="1" fill="currentColor" stroke="none" opacity="0.6"/>
      <circle cx="10" cy="24" r="1" fill="currentColor" stroke="none" opacity="0.5"/>
      <circle cx="6" cy="28" r="1" fill="currentColor" stroke="none" opacity="0.4"/>
      <circle cx="14" cy="26" r="1" fill="currentColor" stroke="none" opacity="0.3"/>
    </svg>
  ),
  maori: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {/* Maori koru spiral */}
      <path d="M18 6 C10 6, 4 11, 4 18 C4 25, 9 30, 18 30 C27 30, 32 24, 28 18 C25 13, 19 12, 18 18 C17 22, 20 24, 22 22" />
      <line x1="22" y1="22" x2="26" y2="18" />
    </svg>
  ),
  asia: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      {/* Cherry blossom / sakura */}
      <circle cx="18" cy="18" r="2.5" fill="currentColor" stroke="none" />
      <ellipse cx="18" cy="10" rx="3" ry="5" transform="rotate(0 18 18)" />
      <ellipse cx="18" cy="10" rx="3" ry="5" transform="rotate(72 18 18)" />
      <ellipse cx="18" cy="10" rx="3" ry="5" transform="rotate(144 18 18)" />
      <ellipse cx="18" cy="10" rx="3" ry="5" transform="rotate(216 18 18)" />
      <ellipse cx="18" cy="10" rx="3" ry="5" transform="rotate(288 18 18)" />
    </svg>
  ),
  color: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Paint drops / watercolor */}
      <path d="M18 4 C18 4, 10 14, 10 20 C10 24.4 13.6 28 18 28 C22.4 28 26 24.4 26 20 C26 14 18 4 18 4Z" />
      <path d="M18 28 C18 28, 18 30, 20 32" strokeOpacity="0.5" />
      <line x1="13" y1="20" x2="15" y2="18" strokeOpacity="0.4" />
    </svg>
  ),
  coverup: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Overlapping / refresh */}
      <path d="M10 18 C10 12.5, 13.5 8, 20 8" />
      <polyline points="17,5 20,8 17,11" fill="none" />
      <path d="M26 18 C26 23.5, 22.5 28, 16 28" />
      <polyline points="19,31 16,28 19,25" fill="none" />
      {/* old faded X */}
      <line x1="14" y1="22" x2="22" y2="14" strokeOpacity="0.3" strokeDasharray="2 2" />
      <line x1="14" y1="14" x2="22" y2="22" strokeOpacity="0.3" strokeDasharray="2 2" />
    </svg>
  ),
  piercing: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      {/* Captive bead ring */}
      <path d="M18 6 A12 12 0 1 1 17.9 6" strokeDasharray="62 8" strokeDashoffset="-4" />
      {/* Bead / ball */}
      <circle cx="18" cy="6" r="3" fill="currentColor" stroke="none" />
      {/* Ear silhouette hint */}
      <path d="M26 14 C30 14, 32 18, 30 22 C29 25, 26 26, 26 28" strokeOpacity="0.3" />
    </svg>
  ),
}

const SERVICES = [
  {
    id: 0,
    icon: ICONS.blackgrey,
    name: 'Black & Grey',
    desc: 'Fotorealistische und abstrakte Motive in feinen Graustufen. Zeitlos, ausdrucksstark und mit höchster Präzision gestochen.',
    tag: 'BLACK & GREY',
  },
  {
    id: 1,
    icon: ICONS.maori,
    name: 'Maori & Tribal',
    desc: 'Traditionelle polynesische Muster und Stammesmotive — kraftvoll, bedeutungsvoll und mit tiefer kultureller Wurzel.',
    tag: 'MAORI',
  },
  {
    id: 2,
    icon: ICONS.asia,
    name: 'Asia & Japanese',
    desc: 'Klassische Asia-Designs: Drachen, Koi, Blüten und Wellen in satten Farben und traditioneller japanischer Ästhetik.',
    tag: 'ASIA',
  },
  {
    id: 3,
    icon: ICONS.color,
    name: 'Mehrfarbige Tattoos',
    desc: 'Lebendige Farb-Tattoos in allen Stilen — von Watercolor bis Old School. Farben, die leuchten und dauerhaft strahlen.',
    tag: 'COLOR',
  },
  {
    id: 4,
    icon: ICONS.coverup,
    name: 'Cover Up & Rework',
    desc: 'Altes Tattoo — neues Leben. Wir verwandeln Tattoos, die du bereust, in Kunstwerke, die du liebst.',
    tag: 'COVER UP',
  },
  {
    id: 5,
    icon: ICONS.piercing,
    name: 'Piercing',
    desc: 'Professionelles Piercing mit sterilen Einweginstrumenten. Beratung zu Platzierung, Schmuck und Pflege inklusive.',
    tag: 'PIERCING',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}>
      {/* BG grid */} 

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
                  <motion.div
                    className="text-gold"
                    animate={{ scale: hovered === service.id ? 1.15 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.icon}
                  </motion.div>
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
