import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONTENT = {
  agb: {
    title: 'Allgemeine Geschäftsbedingungen',
    body: `
**§ 1 Geltungsbereich**
Diese AGB gelten für alle Leistungen von Harlekin Tattoo & Piercing, Wilhelm-Becker-Str. 15, 75179 Pforzheim (nachfolgend „Studio").

**§ 2 Terminvereinbarung & Anzahlung**
Termine können telefonisch, per E-Mail oder persönlich vereinbart werden. Bei Neukunden oder aufwändigen Projekten wird eine Anzahlung von 20–50 % des geschätzten Gesamtpreises fällig. Die Anzahlung wird auf den Endpreis angerechnet und ist bei kurzfristiger Absage (< 48 h) nicht erstattungsfähig.

**§ 3 Mindestalter**
Tattoos werden ausschließlich an Personen ab 18 Jahren durchgeführt. Piercings ab 16 Jahren mit schriftlichem Einverständnis der Erziehungsberechtigten.

**§ 4 Gesundheitliche Eignung**
Die Kunden versichern, dass keine Gegenanzeigen (z. B. Blutgerinnungsstörungen, Schwangerschaft, Infektionskrankheiten, aktive Hautentzündungen) vorliegen. Das Studio behält sich vor, Leistungen abzulehnen.

**§ 5 Preise & Zahlung**
Alle Preise verstehen sich inklusive Mehrwertsteuer. Zahlung bar oder per EC-Karte. Kreditkarten werden nicht akzeptiert. Preise für individuelle Motive werden nach Aufwand berechnet.

**§ 6 Haftung**
Das Studio haftet nicht für Komplikationen, die auf Nichtbeachtung der Pflegehinweise, gesundheitliche Vorerkrankungen oder individuelle Körperreaktionen zurückzuführen sind. Die Pflegehinweise werden vor Ort ausgehändigt.

**§ 7 Urheberrecht**
Entwürfe und Designs, die durch das Studio erstellt werden, unterliegen dem Urheberrecht. Eine Weitergabe oder Verbreitung bedarf der ausdrücklichen Zustimmung des Studios.

**§ 8 Fotos & Social Media**
Das Studio behält sich das Recht vor, Fotos der ausgeführten Tattoos (ohne erkennbares Gesicht) für Marketingzwecke zu verwenden, sofern nicht schriftlich widersprochen wurde.

**§ 9 Salvatorische Klausel**
Sollte eine Bestimmung dieser AGB unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.

Stand: Januar 2025 · Harlekin Tattoo & Piercing, Pforzheim
    `,
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    body: `
**Verantwortlicher**
Harlekin Tattoo & Piercing
Wilhelm-Becker-Str. 15, 75179 Pforzheim
E-Mail: info@harlekin-tattoo.de
Tel: 07231 / 8000652

**Erhobene Daten**
Wir erheben personenbezogene Daten (Name, E-Mail, Telefon) ausschließlich, wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren. Diese Daten werden für die Terminkoordination verwendet.

**Rechtsgrundlage**
Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung / vorvertragliche Maßnahmen).

**Speicherdauer**
Ihre Daten werden gelöscht, sobald der Zweck der Verarbeitung entfallen ist, spätestens jedoch nach 3 Jahren.

**Weitergabe an Dritte**
Eine Weitergabe Ihrer Daten an Dritte erfolgt nicht, außer es besteht eine gesetzliche Verpflichtung.

**Google Maps**
Diese Website nutzt Google Maps (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). Bei der Nutzung von Google Maps werden Daten an Google übermittelt. Datenschutzerklärung von Google: https://policies.google.com/privacy

**Ihre Rechte**
Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Zur Ausübung Ihrer Rechte wenden Sie sich an: info@harlekin-tattoo.de

**Beschwerderecht**
Sie haben das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren (Landesbeauftragter für den Datenschutz und die Informationsfreiheit Baden-Württemberg).

Stand: Januar 2025
    `,
  },
  impressum: {
    title: 'Impressum',
    body: `
**Angaben gemäß § 5 TMG**

Harlekin Tattoo & Piercing
Wilhelm-Becker-Str. 15
75179 Pforzheim

**Kontakt**
Telefon: 07231 / 8000652
E-Mail: info@harlekin-tattoo.de
Web: www.harlekin-tattoo.de

**Öffnungszeiten**
Montag – Samstag: 10:00 – 19:00 Uhr
Sonntag: Geschlossen

**Social Media**
Instagram: @harlekin_tattoo_pforzheim
Facebook: /HarlekinTattooPforzheim

**Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV**
Harlekin Tattoo & Piercing
Wilhelm-Becker-Str. 15, 75179 Pforzheim

**Haftungsausschluss**
Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.

**Urheberrecht**
Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.

**Streitschlichtung**
Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
    `,
  },
}

function renderBody(text) {
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    if (!trimmed) return <div key={i} className="h-3" />
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return (
        <p key={i} className="text-gold font-body text-sm tracking-[1px] uppercase mt-6 mb-2">
          {trimmed.slice(2, -2)}
        </p>
      )
    }
    return (
      <p key={i} className="text-cream/60 font-body text-sm leading-relaxed">
        {trimmed}
      </p>
    )
  })
}

export default function Modal({ id, onClose }) {
  const content = CONTENT[id]

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!content) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(8,8,8,0.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
        }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: '100%', maxWidth: 720,
            maxHeight: '85vh',
            border: '1px solid rgba(201,168,76,0.25)',
            background: '#0d0d0d',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '2rem 2.5rem 1.5rem',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem',
          }}>
            <div>
              <p style={{ color: 'rgba(201,168,76,0.4)', fontSize: '0.65rem', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>
                Harlekin Tattoo & Piercing
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#f5f5f5', fontWeight: 700, margin: 0 }}>
                {content.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none', border: '1px solid rgba(201,168,76,0.3)', cursor: 'pointer',
                color: 'rgba(201,168,76,0.6)', fontSize: '1.2rem', lineHeight: 1,
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 4, transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c9a84c'; e.currentTarget.style.color = '#c9a84c' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.color = 'rgba(201,168,76,0.6)' }}
              aria-label="Schließen"
            >
              ✕
            </button>
          </div>

          {/* Gold accent line */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)', opacity: 0.4 }} />

          {/* Body */}
          <div style={{ overflowY: 'auto', padding: '2rem 2.5rem', flex: 1 }}>
            {renderBody(content.body)}
          </div>

          {/* Footer */}
          <div style={{
            padding: '1rem 2.5rem',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            display: 'flex', justifyContent: 'flex-end',
          }}>
            <button
              onClick={onClose}
              className="btn-gold"
            >
              <span>Schließen</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
