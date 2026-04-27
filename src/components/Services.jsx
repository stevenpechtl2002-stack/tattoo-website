import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    id: 0,
    name: 'Realistisch & Portrait',
    icon: '◈',
    desc: 'Atemberaubende fotorealistische Tattoos, die Gesichter, Tiere und Szenen zum Leben erwecken. Jedes Detail mit chirurgischer Präzision gestochen.',
    color: '#c9a84c',
  },
  {
    id: 1,
    name: 'Blackwork & Linework',
    icon: '◉',
    desc: 'Kraftvolle Schwarz-Tattoos mit klaren Linien und geometrischen Mustern. Zeitlos, mutig und präzise ausgeführt.',
    color: '#c9a84c',
  },
  {
    id: 2,
    name: 'Old School & Traditional',
    icon: '◆',
    desc: 'Klassische Tattoo-Kunst in satten Farben und fetten Linien. Ein Tribut an die goldene Ära des Tattooing.',
    color: '#c9a84c',
  },
  {
    id: 3,
    name: 'Watercolor & Fine Art',
    icon: '◇',
    desc: 'Fließende Aquarell-Effekte auf der Haut. Weiche Übergänge und lebendige Farben, die wie ein Gemälde wirken.',
    color: '#c9a84c',
  },
  {
    id: 4,
    name: 'Cover Up & Rework',
    icon: '◎',
    desc: 'Altes Tattoo – neues Leben. Wir verwandeln Tattoos, die du bereust, in Kunstwerke, die du liebst.',
    color: '#c9a84c',
  },
  {
    id: 5,
    name: 'Lettering & Schrift',
    icon: '◐',
    desc: 'Worte, die auf der Haut tanzen. Von klassischer Kalligraphie bis hin zu modernen Typografie-Meisterwerken.',
    color: '#c9a84c',
  },
]

function WheelSegment({ service, index, total, radius, isHovered, isSelected, onHover, onSelect }) {
  const angle = (2 * Math.PI * index) / total
  const segAngle = (2 * Math.PI) / total
  const cx = 300
  const cy = 300
  const ir = 110
  const or = radius

  // Outer arc points
  const x1o = cx + or * Math.cos(angle - Math.PI / 2)
  const y1o = cy + or * Math.sin(angle - Math.PI / 2)
  const x2o = cx + or * Math.cos(angle + segAngle - Math.PI / 2)
  const y2o = cy + or * Math.sin(angle + segAngle - Math.PI / 2)

  // Inner arc points
  const x1i = cx + ir * Math.cos(angle - Math.PI / 2)
  const y1i = cy + ir * Math.sin(angle - Math.PI / 2)
  const x2i = cx + ir * Math.cos(angle + segAngle - Math.PI / 2)
  const y2i = cy + ir * Math.sin(angle + segAngle - Math.PI / 2)

  const large = segAngle > Math.PI ? 1 : 0
  const d = [
    `M ${x1o} ${y1o}`,
    `A ${or} ${or} 0 ${large} 1 ${x2o} ${y2o}`,
    `L ${x2i} ${y2i}`,
    `A ${ir} ${ir} 0 ${large} 0 ${x1i} ${y1i}`,
    'Z',
  ].join(' ')

  // Label position (midpoint of arc)
  const midAngle = angle + segAngle / 2 - Math.PI / 2
  const labelR = (ir + or) / 2
  const lx = cx + labelR * Math.cos(midAngle)
  const ly = cy + labelR * Math.sin(midAngle)
  const labelRotate = (midAngle * 180) / Math.PI + 90

  return (
    <g
      style={{ cursor: 'none' }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(isSelected ? null : index)}
    >
      <path
        d={d}
        fill={isHovered || isSelected ? 'rgba(201,168,76,0.25)' : 'rgba(26,26,46,0.6)'}
        stroke={isHovered || isSelected ? '#c9a84c' : 'rgba(201,168,76,0.2)'}
        strokeWidth={isHovered || isSelected ? 1.5 : 0.8}
        style={{ transition: 'fill 0.3s, stroke 0.3s' }}
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(${labelRotate}, ${lx}, ${ly})`}
        fill={isHovered || isSelected ? '#c9a84c' : 'rgba(245,245,245,0.5)'}
        fontSize="11"
        fontFamily="Inter, sans-serif"
        letterSpacing="1"
        style={{ transition: 'fill 0.3s', pointerEvents: 'none', userSelect: 'none' }}
      >
        {service.name.split(' & ')[0]}
      </text>
    </g>
  )
}

export default function Services() {
  const [rotation, setRotation] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const rafRef = useRef(null)
  const rotRef = useRef(0)

  useEffect(() => {
    const animate = () => {
      if (hovered === null && selected === null) {
        rotRef.current += 0.12
        setRotation(rotRef.current)
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hovered, selected])

  const selectedService = selected !== null ? SERVICES[selected] : null

  return (
    <div className="panel flex items-center justify-center overflow-hidden" style={{ background: '#080808' }}>
      {/* BG grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex items-center gap-16 w-full max-w-6xl px-8">
        {/* Section label */}
        <div className="absolute top-12 left-12">
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">02</p>
          <h2 className="font-display text-2xl text-cream mt-1">Leistungen</h2>
          <div className="w-12 h-px bg-gold mt-3" />
        </div>

        {/* Wheel */}
        <div className="flex-shrink-0 relative">
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            style={{ filter: 'drop-shadow(0 0 40px rgba(201,168,76,0.15))' }}
          >
            <g transform={`rotate(${rotation}, 300, 300)`}>
              {SERVICES.map((service, i) => (
                <WheelSegment
                  key={service.id}
                  service={service}
                  index={i}
                  total={SERVICES.length}
                  radius={260}
                  isHovered={hovered === i}
                  isSelected={selected === i}
                  onHover={setHovered}
                  onSelect={setSelected}
                />
              ))}
            </g>

            {/* Center circle */}
            <circle cx="300" cy="300" r="90" fill="#080808" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
            <text x="300" y="295" textAnchor="middle" fill="#c9a84c" fontSize="13" fontFamily="Playfair Display, serif" fontStyle="italic">
              INK
            </text>
            <text x="300" y="314" textAnchor="middle" fill="rgba(245,245,245,0.4)" fontSize="9" fontFamily="Inter, sans-serif" letterSpacing="3">
              MASTERS
            </text>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-[280px]">
          <AnimatePresence mode="wait">
            {selectedService ? (
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gold text-4xl mb-4">{selectedService.icon}</p>
                <h3 className="font-display text-4xl text-cream mb-6">{selectedService.name}</h3>
                <div className="w-16 h-px bg-gold mb-6" />
                <p className="text-cream/70 text-lg leading-relaxed font-body">{selectedService.desc}</p>
                <button className="btn-gold mt-10">
                  <span>Beratung anfragen</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-5xl text-cream/20 italic mb-4">Klick auf</p>
                <p className="font-display text-5xl text-cream/20 italic mb-4">ein Segment</p>
                <div className="w-12 h-px bg-gold/30 mb-6" />
                <p className="text-cream/30 text-sm font-body leading-relaxed">
                  Wähle eine Tattoo-Kategorie, um mehr über unsere Leistungen zu erfahren.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
