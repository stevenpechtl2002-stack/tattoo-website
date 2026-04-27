import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const REVIEWS = [
  {
    id: 0,
    name: 'Sarah K.',
    rating: 5,
    text: 'Absolut beeindruckend! Das Team hat meine Vision perfekt umgesetzt. Das Realistik-Portrait meiner Katze sieht atemberaubend aus. Werde definitiv wiederkommen.',
    style: 'Realistik Portrait',
    delay: 0,
    initialX: -120,
    initialY: 60,
  },
  {
    id: 1,
    name: 'Marcus T.',
    rating: 5,
    text: 'Professioneller geht es nicht. Von der Beratung bis zum fertigen Tattoo war alles perfekt. Das Studio ist unglaublich sauber und das Team super freundlich.',
    style: 'Blackwork',
    delay: 0.15,
    initialX: 80,
    initialY: -80,
  },
  {
    id: 2,
    name: 'Lena M.',
    rating: 5,
    text: 'Mein erstes Tattoo und ich hätte keinen besseren Ort wählen können. So viel Geduld und Sorgfalt. Das Ergebnis übertrifft alle meine Erwartungen.',
    style: 'Fine Line',
    delay: 0.3,
    initialX: -60,
    initialY: -100,
  },
  {
    id: 3,
    name: 'Jonas R.',
    rating: 5,
    text: 'Ich hatte ein altes Tattoo, das ich hasste. Das Cover Up ist ein Wunder — ich kann gar nicht glauben, was sie daraus gemacht haben. Absolute Meisterklasse.',
    style: 'Cover Up',
    delay: 0.1,
    initialX: 130,
    initialY: 90,
  },
  {
    id: 4,
    name: 'Anna B.',
    rating: 5,
    text: 'Das Watercolor-Tattoo ist ein echtes Kunstwerk. Jeder fragt mich danach und ich verweise jeden direkt zu Harlekin Tattoo. Bestes Studio in ganz Berlin.',
    style: 'Watercolor',
    delay: 0.25,
    initialX: -90,
    initialY: 110,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="text-gold text-sm"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -12, y: dx * 12 })
  }

  const onMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: review.initialX, y: review.initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: review.delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease',
        cursor: 'none',
      }}
      className="glass rounded-none p-6 relative"
    >
      {/* Gold corner accent */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />

      <StarRating count={review.rating} />

      <p className="text-cream/80 font-body text-sm leading-relaxed mt-4 mb-6 italic">
        "{review.text}"
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-cream font-body font-semibold text-sm">{review.name}</p>
          <p className="text-gold/60 text-xs mt-0.5 tracking-[2px] uppercase">{review.style}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
          <span className="text-gold text-sm font-display">{review.name[0]}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews() {
  return (
    <div className="panel flex items-center overflow-hidden" style={{ background: '#080808' }}>
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gold/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="relative z-10 w-full max-w-6xl px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">05</p>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-cream mt-1">Bewertungen</h2>
              <div className="w-12 h-px bg-gold mt-3" />
            </div>
            <div className="text-right">
              <div className="flex justify-end gap-1 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className="text-gold text-lg">★</span>
                ))}
              </div>
              <p className="text-cream/40 text-xs tracking-[2px] uppercase">5.0 · 847 Bewertungen</p>
            </div>
          </div>
        </div>

        {/* Cards grid — floating layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Large card spans 2 columns */}
          <div className="col-span-2">
            <ReviewCard review={REVIEWS[0]} index={0} />
          </div>
          {/* Regular cards */}
          <ReviewCard review={REVIEWS[1]} index={1} />
          <ReviewCard review={REVIEWS[2]} index={2} />
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6">
              <ReviewCard review={REVIEWS[3]} index={3} />
              <ReviewCard review={REVIEWS[4]} index={4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
