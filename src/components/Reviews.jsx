import { motion } from 'framer-motion'
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1'

const testimonials = [
  {
    text: 'Absolut beeindruckend! Das Team hat meine Vision perfekt umgesetzt. Das Realistik-Portrait meiner Katze sieht atemberaubend aus.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Sarah K.',
    role: 'Realistik Portrait',
  },
  {
    text: 'Professioneller geht es nicht. Von der Beratung bis zum fertigen Tattoo war alles perfekt. Das Studio ist unglaublich sauber.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Marcus T.',
    role: 'Blackwork',
  },
  {
    text: 'Mein erstes Tattoo und ich hätte keinen besseren Ort wählen können. So viel Geduld und Sorgfalt. Das Ergebnis übertrifft alle Erwartungen.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Lena M.',
    role: 'Fine Line',
  },
  {
    text: 'Ich hatte ein altes Tattoo, das ich hasste. Das Cover Up ist ein Wunder — ich kann gar nicht glauben, was sie daraus gemacht haben.',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Jonas R.',
    role: 'Cover Up',
  },
  {
    text: 'Das Watercolor-Tattoo ist ein echtes Kunstwerk. Jeder fragt mich danach und ich verweise jeden direkt zu Harlekin Tattoo.',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Anna B.',
    role: 'Watercolor',
  },
  {
    text: 'Unglaubliche Atmosphäre im Studio. Das Team nimmt sich wirklich Zeit für jedes Detail. Das Ergebnis ist schlicht perfekt.',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Tobias F.',
    role: 'Traditional',
  },
  {
    text: 'Schon mein drittes Tattoo hier und jedes Mal bin ich aufs Neue begeistert. Die Qualität ist konstant auf höchstem Niveau.',
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Mia L.',
    role: 'Lettering',
  },
  {
    text: 'Endlich ein Studio, das wirklich zuhört. Meine Idee wurde verstanden und in ein absolutes Meisterwerk verwandelt.',
    image: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Keanu S.',
    role: 'Geometric',
  },
  {
    text: 'Beste Erfahrung meines Lebens. Das Team ist talentiert, freundlich und sehr professionell. Absolute Empfehlung!',
    image: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Clara W.',
    role: 'Portrait',
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export default function Reviews() {
  return (
    <div className="panel flex flex-col justify-center py-20 overflow-hidden" style={{ background: '#080808' }}>
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-12"
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body mb-4">05</p>

          <div className="border border-gold/25 py-1 px-5 mb-6">
            <span className="text-gold/60 text-xs tracking-[3px] uppercase font-body">Bewertungen</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-cream mt-2">
            Was unsere Kunden sagen
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mt-5" />
          <p className="text-cream/40 font-body mt-4 text-sm">
            5.0 · 847 Bewertungen · Berlin
          </p>
        </motion.div>

        {/* Scrolling columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
        </div>
      </div>
    </div>
  )
}
