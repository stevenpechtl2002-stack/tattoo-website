import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: 'Wie bereite ich mich auf ein Tattoo vor?',
    a: 'Ausreichend schlafen, gut essen und trinken vor dem Termin. Keine Alkohol 24 Stunden vorher. Feuchtigkeitspflege der Haut in den Tagen zuvor hilft. Trage bequeme Kleidung, die die Stelle gut freigibt.',
  },
  {
    q: 'Was kostet ein Tattoo bei euch?',
    a: 'Kleine Tattoos beginnen ab 80 €, mittlere Motive ab 200 € und große Werke ab 400 €. Der genaue Preis hängt von Größe, Komplexität und Stil ab — wir erstellen dir gerne ein persönliches Angebot.',
  },
  {
    q: 'Wie lange dauert die Heilung?',
    a: 'Die Oberhaut heilt in ca. 2–3 Wochen. Die tieferen Schichten brauchen bis zu 3 Monate. In dieser Zeit: täglich reinigen, pflegen, Sonne & Chlor meiden und keinesfalls kratzen.',
  },
  {
    q: 'Könnt ihr eigene Motive umsetzen?',
    a: 'Ja, wir setzen deine eigenen Ideen und Referenzbilder gerne um. Bring Skizzen, Fotos oder eine Beschreibung — unsere Künstler entwickeln gemeinsam mit dir das perfekte Motiv.',
  },
  {
    q: 'Ab welchem Alter bekomme ich ein Tattoo?',
    a: 'Tattoos und Piercings vergeben wir ab 18 Jahren. Jugendliche ab 16 können mit schriftlichem Einverständnis der Erziehungsberechtigten ein Piercing bekommen — Tattoos sind erst ab 18 möglich.',
  },
  {
    q: 'Wie pflege ich mein frisches Tattoo?',
    a: 'Die ersten Stunden Folie drauflassen, danach sanft mit klarem Wasser reinigen. Spezialpflegecreme dünn auftragen (erhältlich im Studio). Sonne, Salzwasser und Chlor für 4 Wochen meiden.',
  },
  {
    q: 'Macht ihr auch Überdeckungen?',
    a: 'Ja! Cover-Ups sind eine unserer Spezialitäten. Bring dein altes Tattoo gerne mit — wir beraten dich ehrlich, was möglich ist und entwickeln ein Konzept, das du lieben wirst.',
  },
  {
    q: 'Kann ich tätowiert werden wenn ich krank bin?',
    a: 'Nein, wir empfehlen das nicht. Ein geschwächtes Immunsystem verlängert die Heilung und erhöht das Infektionsrisiko. Bitte sag den Termin ab und komm gesund wieder — wir finden einen neuen Termin.',
  },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-cream/10"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-body text-cream/80 group-hover:text-cream transition-colors pr-8 text-base">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-6 h-6 border border-gold/40 group-hover:border-gold flex items-center justify-center transition-colors"
          style={{ borderRadius: 2 }}
        >
          <span className="text-gold text-lg leading-none" style={{ marginTop: -2 }}>+</span>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-6 pr-10">
              <div className="w-8 h-px bg-gold mb-4" />
              <p className="text-cream/55 font-body leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <div id="faq" className="panel flex flex-col justify-center py-20" style={{ background: '#0a0a0a' }}>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-8">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">FAQ</p>
          <h2 className="font-display text-5xl text-cream mt-2">Häufige Fragen</h2>
          <div className="w-12 h-px bg-gold mt-4" />
        </motion.div>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-12 p-6 border border-gold/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-cream/50 font-body mb-4">Noch weitere Fragen? Wir sind für dich da.</p>
          <a
            href="tel:072318000652"
            className="btn-gold inline-block"
          >
            <span>Jetzt anrufen</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
