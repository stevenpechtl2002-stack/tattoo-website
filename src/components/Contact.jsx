import { useState } from 'react'
import { motion } from 'framer-motion'

const HOURS = [
  { days: 'Montag – Samstag', time: '10:00 – 19:00' },
  { days: 'Sonntag', time: 'Geschlossen' },
]

function isOpen() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  return day >= 1 && day <= 6 && hour >= 10 && hour < 19
}

export default function Contact() {
  const open = isOpen()
  const [form, setForm] = useState({ name: '', email: '', tel: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const canSend = form.name && form.email && form.message

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSend) return
    setSent(true)
  }

  return (
    <div id="contact" className="panel flex items-center overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-20">

        {/* LEFT — Contact info */}
        <div>
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Kontakt</p>
            <h2 className="font-display text-5xl text-cream mt-2">Schreib uns</h2>
            <div className="w-12 h-px bg-gold mt-4" />
          </motion.div>

          <motion.div
            className="space-y-5 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { label: 'Telefon', value: '07231 / 8000652', href: 'tel:072318000652' },
              { label: 'E-Mail', value: 'info@harlekin-tattoo.de', href: 'mailto:info@harlekin-tattoo.de' },
              { label: 'Adresse', value: 'Wilhelm-Becker-Str. 15, 75179 Pforzheim', href: null },
              { label: 'Instagram', value: '@harlekin_tattoo_pforzheim', href: 'https://www.instagram.com/harlekin_tattoo_pforzheim' },
            ].map(({ label, value, href }) => (
              <div key={label} className="border-b border-cream/8 pb-4">
                <p className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body mb-1">{label}</p>
                {href ? (
                  <a href={href} className="text-cream/70 hover:text-cream font-body transition-colors" target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {value}
                  </a>
                ) : (
                  <p className="text-cream/70 font-body">{value}</p>
                )}
              </div>
            ))}
          </motion.div>

          {/* Öffnungszeiten */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <p className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body">Öffnungszeiten</p>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400' : 'bg-red-400/60'}`}
                  animate={open ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className={`text-[10px] font-body ${open ? 'text-green-400' : 'text-cream/30'}`}>
                  {open ? 'Jetzt geöffnet' : 'Geschlossen'}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {HOURS.map(({ days, time }) => (
                <div key={days} className="flex justify-between">
                  <span className="text-cream/50 font-body text-sm">{days}</span>
                  <span className={`font-body text-sm ${time === 'Geschlossen' ? 'text-cream/25' : 'text-cream'}`}>{time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="font-display text-6xl text-gold mb-4">✦</div>
              <h3 className="font-display text-3xl text-cream mb-3">Nachricht gesendet!</h3>
              <div className="w-16 h-px bg-gold mx-auto mb-4" />
              <p className="text-cream/50 font-body">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { key: 'name', label: 'Name', placeholder: 'Dein Name', type: 'text', required: true },
                { key: 'email', label: 'E-Mail', placeholder: 'deine@email.de', type: 'email', required: true },
                { key: 'tel', label: 'Telefon (optional)', placeholder: '07231 / …', type: 'tel', required: false },
              ].map(({ key, label, placeholder, type, required }) => (
                <div key={key}>
                  <label className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body block mb-2">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none text-cream font-body py-3 transition-colors placeholder-cream/20"
                  />
                </div>
              ))}

              <div>
                <label className="text-gold/40 text-[10px] tracking-[3px] uppercase font-body block mb-2">Nachricht</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Beschreibe dein Wunsch-Tattoo, Stil, Größe, Fragen …"
                  required
                  className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none text-cream font-body py-3 resize-none transition-colors placeholder-cream/20"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={!canSend}
                  className={`btn-gold ${!canSend ? 'opacity-30' : ''}`}
                >
                  <span>Nachricht senden</span>
                </button>
                <span className="text-cream/20 text-xs font-body">kostenlos & unverbindlich</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
