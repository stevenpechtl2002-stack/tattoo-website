import { motion } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

function isOpen() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  return day >= 1 && day <= 6 && hour >= 10 && hour < 19
}

export default function Map() {
  const open = isOpen()

  return (
    <div id="map" className="panel flex flex-col justify-center py-20" style={{ background: '#080808' }}> 

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">Anfahrt</p>
          <h2 className="font-display text-5xl text-cream mt-2">So findest du uns</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        {/* 3 info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Adresse */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <GlowCard glowColor="gold" customSize className="w-full h-full">
              <div className="p-6 flex flex-col h-full">
                <p className="text-gold/50 text-[9px] tracking-[3px] uppercase font-body mb-4">Adresse</p>
                <div className="w-6 h-px bg-gold/30 mb-4" />
                <p className="font-display text-xl text-cream mb-1">Harlekin Tattoo</p>
                <p className="text-cream/60 font-body text-sm mb-1">Wilhelm-Becker-Str. 15</p>
                <p className="text-cream/60 font-body text-sm mb-6">75179 Pforzheim</p>
                <div className="mt-auto">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Wilhelm-Becker-Str.+15,+75179+Pforzheim"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold inline-block text-sm"
                  >
                    <span>Route starten</span>
                  </a>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Öffnungszeiten */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlowCard glowColor="gold" customSize className="w-full h-full">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gold/50 text-[9px] tracking-[3px] uppercase font-body">Öffnungszeiten</p>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full ${open ? 'bg-green-400' : 'bg-red-400/60'}`}
                      animate={open ? { opacity: [1, 0.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className={`text-[10px] font-body ${open ? 'text-green-400' : 'text-cream/30'}`}>
                      {open ? 'Geöffnet' : 'Geschlossen'}
                    </span>
                  </div>
                </div>
                <div className="w-6 h-px bg-gold/30 mb-4" />
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between">
                    <span className="text-cream/60 font-body text-sm">Mo – Sa</span>
                    <span className="text-cream font-body text-sm">10:00 – 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60 font-body text-sm">Sonntag</span>
                    <span className="text-cream/30 font-body text-sm">Geschlossen</span>
                  </div>
                </div>
                <p className="text-cream/30 text-[10px] font-body mt-4">Termine auch außerhalb der Zeiten möglich</p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Kontakt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard glowColor="gold" customSize className="w-full h-full">
              <div className="p-6 flex flex-col h-full">
                <p className="text-gold/50 text-[9px] tracking-[3px] uppercase font-body mb-4">Kontakt</p>
                <div className="w-6 h-px bg-gold/30 mb-4" />
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-cream/40 text-[10px] font-body uppercase tracking-[2px]">Telefon</p>
                    <p className="text-cream font-body mt-0.5">07231 / 8000652</p>
                  </div>
                  <div>
                    <p className="text-cream/40 text-[10px] font-body uppercase tracking-[2px]">E-Mail</p>
                    <p className="text-cream font-body mt-0.5 text-sm">info@harlekin-tattoo.de</p>
                  </div>
                </div>
                <a
                  href="tel:072318000652"
                  className="btn-gold inline-block mt-4 text-sm"
                  style={{ background: 'transparent' }}
                >
                  <span>Jetzt anrufen</span>
                </a>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Google Maps iframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="overflow-hidden border border-gold/15"
          style={{ height: 380, borderRadius: 4 }}
        >
          <iframe
            title="Harlekin Tattoo Pforzheim"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.4!2d8.7057!3d48.8944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479776b08e9de489%3A0x7e4b62b4da15c4b6!2sWilhelm-Becker-Stra%C3%9Fe%2015%2C%2075179%20Pforzheim!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  )
}
