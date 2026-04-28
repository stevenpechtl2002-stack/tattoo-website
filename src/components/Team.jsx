import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

const TEAM = [
  {
    name: 'Max Weber',
    role: 'Realistisch & Portrait',
    tag: 'REALISTIK',
    years: '8 Jahre',
    img: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&q=80',
  },
  {
    name: 'Sarah Klein',
    role: 'Watercolor & Fine Art',
    tag: 'WATERCOLOR',
    years: '6 Jahre',
    img: 'https://images.unsplash.com/photo-1542596594-649edbc13630?w=400&q=80',
  },
  {
    name: 'Tom Fischer',
    role: 'Blackwork & Linework',
    tag: 'BLACKWORK',
    years: '10 Jahre',
    img: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?w=400&q=80',
  },
  {
    name: 'Lisa Braun',
    role: 'Old School & Piercing',
    tag: 'TRADITIONAL',
    years: '5 Jahre',
    img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
  },
]

export default function Team() {
  return (
    <div id="team" className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}> 

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Unser Team</p>
          <h2 className="font-display text-5xl text-cream mt-2">Die Künstler</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlowCard glowColor="gold" customSize className="w-full flex flex-col overflow-hidden">
                <div className="relative w-full h-56 overflow-hidden rounded-t-lg -mx-0">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 text-gold/60 text-[9px] tracking-[2px] font-body border border-gold/20 px-2 py-0.5 bg-[#080808]/70">
                    {member.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="w-6 h-px bg-gold/40 mb-3" />
                  <h3 className="font-display text-lg text-cream leading-snug">{member.name}</h3>
                  <p className="text-cream/50 text-xs font-body mt-1">{member.role}</p>
                  <p className="text-gold/40 text-[10px] tracking-[2px] uppercase font-body mt-2">{member.years} Erfahrung</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
