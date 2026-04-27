import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Leistungen', id: 'services' },
  { label: 'Galerie', id: 'gallery' },
  { label: 'Über Uns', id: 'about' },
  { label: 'Team', id: 'team' },
  { label: 'Preise', id: 'prices' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Kontakt', id: 'contact' },
]

const SERVICES = [
  'Black & Grey', 'Maori / Tribal', 'Asia / Japanese',
  'Mehrfarbige Tattoos', 'Cover Up', 'Piercing',
]

const LEGAL = [
  { label: 'AGB', id: 'agb' },
  { label: 'Datenschutz', id: 'datenschutz' },
  { label: 'Impressum', id: 'impressum' },
]

export default function Footer({ onOpenModal }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="w-full max-w-6xl mx-auto px-8 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Col 1: Navigation */}
          <div>
            <p className="text-gold/50 text-[9px] tracking-[4px] uppercase font-body mb-5">Navigation</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-cream/50 hover:text-cream font-body text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Leistungen */}
          <div>
            <p className="text-gold/50 text-[9px] tracking-[4px] uppercase font-body mb-5">Leistungen</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('services')}
                    className="text-cream/50 hover:text-cream font-body text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Kontakt */}
          <div>
            <p className="text-gold/50 text-[9px] tracking-[4px] uppercase font-body mb-5">Kontakt</p>
            <div className="space-y-3">
              <div>
                <p className="text-cream/30 text-[10px] font-body uppercase tracking-[2px]">Adresse</p>
                <p className="text-cream/60 font-body text-sm mt-0.5">Wilhelm-Becker-Str. 15</p>
                <p className="text-cream/60 font-body text-sm">75179 Pforzheim</p>
              </div>
              <div>
                <p className="text-cream/30 text-[10px] font-body uppercase tracking-[2px]">Telefon</p>
                <a href="tel:072318000652" className="text-cream/60 hover:text-gold font-body text-sm transition-colors mt-0.5 block">
                  07231 / 8000652
                </a>
              </div>
              <div>
                <p className="text-cream/30 text-[10px] font-body uppercase tracking-[2px]">E-Mail</p>
                <a href="mailto:info@harlekin-tattoo.de" className="text-cream/60 hover:text-gold font-body text-sm transition-colors mt-0.5 block">
                  info@harlekin-tattoo.de
                </a>
              </div>
              <div>
                <p className="text-cream/30 text-[10px] font-body uppercase tracking-[2px] mb-2">Social Media</p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/harlekin_tattoo_pforzheim" target="_blank" rel="noopener noreferrer"
                    className="text-cream/40 hover:text-gold font-body text-xs tracking-[2px] uppercase transition-colors">
                    Instagram
                  </a>
                  <a href="https://www.facebook.com/HarlekinTattooPforzheim/" target="_blank" rel="noopener noreferrer"
                    className="text-cream/40 hover:text-gold font-body text-xs tracking-[2px] uppercase transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-cream/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/25 font-body text-xs">
              © 2025 Harlekin Tattoo & Piercing · Pforzheim · Alle Rechte vorbehalten
            </p>
            <div className="flex gap-6">
              {LEGAL.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onOpenModal?.(link.id)}
                  className="text-cream/25 hover:text-cream/50 font-body text-xs tracking-[2px] uppercase transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
