import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const PACKAGES = [
  {
    name: 'Small',
    tag: 'KLEIN',
    price: 'ab 80 €',
    size: '5 – 8 cm',
    features: ['Einfache Motive', 'Schrift & Symbole', 'Schnelle Umsetzung', 'Ideal als erstes Tattoo'],
    highlight: false,
  },
  {
    name: 'Medium',
    tag: 'MITTEL',
    price: 'ab 200 €',
    size: '10 – 15 cm',
    features: ['Detaillierte Designs', 'Alle Stile möglich', 'Farbgebung inklusive', 'Persönliche Beratung'],
    highlight: true,
  },
  {
    name: 'Large',
    tag: 'GROSS',
    price: 'ab 400 €',
    size: '20+ cm / Sleeve',
    features: ['Großformatige Werke', 'Half- & Full Sleeve', 'Mehrtägige Sessions', 'Individuelle Planung'],
    highlight: false,
  },
]

const PIERCING = [
  { type: 'Ohrpiercing (Helix, Tragus …)', price: 'ab 25 €' },
  { type: 'Nasenpiercing', price: 'ab 30 €' },
  { type: 'Lippenpiercing', price: 'ab 30 €' },
  { type: 'Bauchnabelpiercing', price: 'ab 35 €' },
  { type: 'Septum', price: 'ab 35 €' },
  { type: 'Intimschmuck', price: 'auf Anfrage' },
]

export default function Prices() {
  return (
    <div id="prices" className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}>
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Preise</p>
          <h2 className="font-display text-5xl text-cream mt-2">Unsere Pakete</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlowCard
                glowColor="gold"
                customSize
                className={`w-full h-full flex flex-col ${pkg.highlight ? 'ring-1 ring-gold/40' : ''}`}
              >
                <div className="p-8 flex flex-col h-full">
                  {pkg.highlight && (
                    <div className="mb-4">
                      <span className="text-[9px] tracking-[3px] uppercase font-body bg-gold text-ink px-3 py-1">
                        Beliebteste Wahl
                      </span>
                    </div>
                  )}
                  <span className="text-gold/50 text-[9px] tracking-[3px] uppercase font-body">{pkg.tag}</span>
                  <h3 className="font-display text-3xl text-cream mt-2 mb-1">{pkg.name}</h3>
                  <p className="text-cream/40 text-xs font-body mb-6">{pkg.size}</p>

                  <div className={`font-display text-5xl mb-8 ${pkg.highlight ? 'gold-shimmer' : 'text-cream'}`}>
                    {pkg.price}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-cream/60 font-body text-sm">
                        <span className="text-gold mt-0.5">—</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn-gold w-full justify-center"
                    style={!pkg.highlight ? { background: 'transparent' } : {}}
                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <span>Termin buchen</span>
                  </button>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Piercing table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-6">
            <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Piercing</p>
            <h3 className="font-display text-3xl text-cream mt-2">Piercingpreise</h3>
            <div className="w-8 h-px bg-gold mt-3" />
          </div>

          <div className="border border-cream/10 overflow-hidden">
            {PIERCING.map((row, i) => (
              <div
                key={row.type}
                className={`flex justify-between items-center px-6 py-4 font-body text-sm ${
                  i % 2 === 0 ? 'bg-cream/[0.02]' : ''
                } border-b border-cream/5 last:border-b-0`}
              >
                <span className="text-cream/70">{row.type}</span>
                <span className="text-gold font-medium">{row.price}</span>
              </div>
            ))}
          </div>

          <p className="text-cream/30 text-xs font-body mt-4 text-center tracking-[1px]">
            Alle Preise inklusive Schmuck · Erstberatung kostenlos · Preise können je nach Aufwand variieren
          </p>
        </motion.div>
      </div>
    </div>
  )
}
