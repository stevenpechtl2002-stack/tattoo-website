import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const PRODUCTS = [
  {
    name: 'Pflegecreme',
    desc: 'Intensive Feuchtigkeit für frisch gestochene Tattoos. Dermatologisch getestet, ohne Parfüm.',
    price: '14,99 €',
    icon: '◈',
  },
  {
    name: 'Reinigungsschaum',
    desc: 'Sanfter pH-neutraler Schaum für die tägliche Tattoo-Reinigung in der Heilungsphase.',
    price: '12,99 €',
    icon: '◇',
  },
  {
    name: 'Sonnenschutz SPF 50',
    desc: 'Hochwertiger Lichtschutz um die Farben deines Tattoos langfristig leuchtend zu erhalten.',
    price: '16,99 €',
    icon: '○',
  },
  {
    name: 'Auffrischungsöl',
    desc: 'Natürliches Pflegeöl für ältere Tattoos — bringt Farben zum Strahlen und pflegt die Haut.',
    price: '19,99 €',
    icon: '◉',
  },
]

export default function Products() {
  return (
    <div id="products" className="panel flex flex-col justify-center py-20" style={{ background: '#0a0a0a' }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
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
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Aftercare</p>
          <h2 className="font-display text-5xl text-cream mt-2">Pflege & Produkte</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard glowColor="gold" customSize className="w-full h-full flex flex-col">
                <div className="p-6 flex flex-col h-full">
                  <div className="text-gold/40 text-3xl mb-4">{product.icon}</div>
                  <div className="w-6 h-px bg-gold/30 mb-4" />
                  <h3 className="font-display text-xl text-cream mb-2">{product.name}</h3>
                  <p className="text-cream/50 text-sm font-body leading-relaxed flex-1 mb-6">{product.desc}</p>

                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl gold-shimmer">{product.price}</span>
                    <span className="text-[9px] tracking-[2px] uppercase font-body text-gold/50 border border-gold/20 px-2 py-0.5">
                      Im Studio
                    </span>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-cream/30 text-xs font-body mt-10 tracking-[2px] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Alle Produkte exklusiv im Studio Pforzheim erhältlich
        </motion.p>
      </div>
    </div>
  )
}
