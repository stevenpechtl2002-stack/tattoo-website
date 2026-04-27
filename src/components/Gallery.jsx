import { motion } from 'framer-motion'
import { ExpandableGallery } from '@/components/ui/gallery-animation'

const IMAGES = [
  { url: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=1200&q=80', label: 'Realistik Portrait' },
  { url: 'https://images.unsplash.com/photo-1590246814883-57c511e84693?w=1200&q=80', label: 'Blackwork' },
  { url: 'https://images.unsplash.com/photo-1616493478363-c3dd6c9d4ee2?w=1200&q=80', label: 'Fine Line' },
  { url: 'https://images.unsplash.com/photo-1628955987810-45434c5b4f95?w=1200&q=80', label: 'Traditional' },
  { url: 'https://images.unsplash.com/photo-1503097843296-e290b4f16f64?w=1200&q=80', label: 'Geometric' },
  { url: 'https://images.unsplash.com/photo-1555685812-4b8f59697ef3?w=1200&q=80', label: 'Watercolor' },
]

export default function Gallery() {
  return (
    <div className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">03</p>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-5xl text-cream mt-2">Galerie</h2>
              <div className="w-12 h-px bg-gold mt-4" />
            </div>
            <p className="text-cream/30 text-sm font-body">Hover zum Erweitern · Klick zum Öffnen</p>
          </div>
        </motion.div>

        {/* Expandable gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ height: '480px' }}
        >
          <ExpandableGallery images={IMAGES} className="h-full w-full" />
        </motion.div>
      </div>
    </div>
  )
}
