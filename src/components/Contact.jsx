import { motion } from 'framer-motion'

const HOURS = [
  { days: 'Montag – Samstag', time: '10:00 – 19:00' },
  { days: 'Sonntag', time: 'Geschlossen' },
]

function isOpen() {
  const now = new Date()
  const day = now.getDay() // 0=Sun, 1=Mon … 6=Sat
  const hour = now.getHours() + now.getMinutes() / 60
  if (day >= 1 && day <= 6) return hour >= 10 && hour < 19
  return false
}

function ContactCard({ icon, title, value, delay }) {
  return (
    <motion.div
      className="glass p-6 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4 }}
      
    >
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/30" />
      <div className="text-gold text-xl mb-3">{icon}</div>
      <p className="text-cream/40 text-xs tracking-[3px] uppercase font-body mb-1">{title}</p>
      <p className="text-cream font-body font-medium">{value}</p>
    </motion.div>
  )
}

export default function Contact() {
  const open = isOpen()

  return (
    <div className="panel flex items-center overflow-hidden" style={{ background: '#080808' }}>
      <div className="relative z-10 w-full max-w-6xl px-12 grid grid-cols-2 gap-16 items-center">

        {/* LEFT — Map placeholder + info */}
        <div>
          {/* Section label */}
          <div className="mb-8">
            <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">08</p>
            <h2 className="font-display text-2xl text-cream mt-1">Kontakt & Anfahrt</h2>
            <div className="w-12 h-px bg-gold mt-3" />
          </div>

          {/* Dark "map" */}
          <motion.div
            className="relative overflow-hidden mb-6"
            style={{ height: 300 }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Styled dark map grid */}
            <div
              className="absolute inset-0"
              style={{
                background: '#0d0d1a',
                backgroundImage: `
                  linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            {/* "Streets" */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(201,168,76,0.12)" strokeWidth="8" />
              <line x1="250" y1="0" x2="250" y2="300" stroke="rgba(201,168,76,0.12)" strokeWidth="6" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(201,168,76,0.06)" strokeWidth="3" />
              <line x1="0" y1="220" x2="500" y2="220" stroke="rgba(201,168,76,0.06)" strokeWidth="3" />
              <line x1="150" y1="0" x2="150" y2="300" stroke="rgba(201,168,76,0.06)" strokeWidth="3" />
              <line x1="380" y1="0" x2="380" y2="300" stroke="rgba(201,168,76,0.06)" strokeWidth="3" />
              {/* Location pin */}
              <circle cx="250" cy="150" r="12" fill="rgba(201,168,76,0.3)" />
              <circle cx="250" cy="150" r="5" fill="#c9a84c" />
              <motion.circle
                cx="250" cy="150" r="20"
                fill="none"
                stroke="#c9a84c"
                strokeWidth="1"
                initial={{ r: 12, opacity: 0.8 }}
                animate={{ r: 36, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </svg>

            {/* Address label */}
            <div className="absolute bottom-4 left-4 glass px-4 py-2">
              <p className="text-gold text-xs font-body">Harlekin Tattoo & Piercing</p>
              <p className="text-cream/60 text-xs font-body">Wilhelm-Becker-Str. 15, 75179 Pforzheim</p>
            </div>

            {/* Open/closed indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 glass px-3 py-1.5">
              <motion.div
                className={`w-2 h-2 rounded-full ${open ? 'bg-green-400' : 'bg-red-400'}`}
                animate={open ? { opacity: [1, 0.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-body text-cream/70">
                {open ? 'Jetzt geöffnet' : 'Geschlossen'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Contact cards + hours */}
        <div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <ContactCard icon="📞" title="Telefon" value="07231 / 8000652" delay={0} />
            <ContactCard icon="✉" title="E-Mail" value="info@harlekin-tattoo.de" delay={0.1} />
            <ContactCard icon="📍" title="Adresse" value="Wilhelm-Becker-Str. 15, 75179 Pforzheim" delay={0.2} />
            <ContactCard icon="◎" title="Instagram" value="@harlekin_tattoo_pforzheim" delay={0.3} />
          </div>

          {/* Opening hours */}
          <motion.div
            className="glass p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-gold/60 text-xs tracking-[3px] uppercase font-body mb-4">Öffnungszeiten</p>
            <div className="space-y-3">
              {HOURS.map(({ days, time }) => (
                <div key={days} className="flex justify-between items-center">
                  <span className="text-cream/60 font-body text-sm">{days}</span>
                  <span className={`font-body text-sm ${time === 'Geschlossen' ? 'text-cream/30' : 'text-cream'}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Footer tagline */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-display text-lg italic text-cream/30">
              "We don't follow standards... WE SET THEM!"
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <div className="w-8 h-px bg-gold/30" />
              <span className="text-gold/30 text-xs">Harlekin Tattoo & Piercing · Pforzheim</span>
              <div className="w-8 h-px bg-gold/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
