import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STEPS = [
  {
    id: 0,
    question: 'Wie heißt du?',
    field: 'name',
    type: 'text',
    placeholder: 'Dein Name ...',
    hint: 'Damit wir dich persönlich ansprechen können.',
  },
  {
    id: 1,
    question: (v) => `Schön, ${v.name}! Welchen Stil interessiert dich?`,
    field: 'style',
    type: 'choice',
    choices: ['Realistisch', 'Blackwork', 'Old School', 'Watercolor', 'Cover Up', 'Lettering'],
  },
  {
    id: 2,
    question: 'Wo soll das Tattoo platziert werden?',
    field: 'placement',
    type: 'text',
    placeholder: 'z.B. Unterarm, Rücken, Rippen ...',
  },
  {
    id: 3,
    question: 'Hast du eine Größe im Sinn?',
    field: 'size',
    type: 'choice',
    choices: ['Klein (5–8 cm)', 'Mittel (10–15 cm)', 'Groß (20+ cm)', 'Sleeve / Full Piece'],
  },
  {
    id: 4,
    question: 'Deine E-Mail für die Bestätigung?',
    field: 'email',
    type: 'email',
    placeholder: 'deine@email.de',
  },
  {
    id: 5,
    question: 'Hast du noch etwas, das wir wissen sollten?',
    field: 'message',
    type: 'textarea',
    placeholder: 'Referenzen, Ideen, Wünsche ...',
  },
]

const fieldVariants = {
  enter: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -30, filter: 'blur(4px)' },
}

export default function Booking() {
  const [step, setStep] = useState(0)
  const [values, setValues] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [splash, setSplash] = useState(false)

  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  const question = typeof current?.question === 'function'
    ? current.question(values)
    : current?.question

  const advance = () => {
    if (isLast) {
      setSplash(true)
      setTimeout(() => setSubmitted(true), 1200)
    } else {
      setStep(s => s + 1)
    }
  }

  const set = (field, val) => setValues(v => ({ ...v, [field]: val }))

  const canAdvance = values[current?.field] && String(values[current?.field]).length > 0

  return (
    <div className="panel flex items-center justify-center overflow-hidden" style={{ background: '#080808' }}>
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Ink splash animation */}
      <AnimatePresence>
        {splash && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30"
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#1a1a2e' }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="font-display text-8xl text-gold mb-4">✦</div>
              <h3 className="font-display text-4xl text-cream mb-4">Anfrage gesendet!</h3>
              <div className="w-24 h-px bg-gold mx-auto mb-6" />
              <p className="text-cream/60 font-body">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-2xl px-12">
        {/* Section label */}
        <div className="mb-12">
          <p className="text-gold/40 text-xs tracking-[4px] uppercase font-body">07</p>
          <h2 className="font-display text-2xl text-cream mt-1">Termin Buchen</h2>
          <div className="w-12 h-px bg-gold mt-3" />
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mb-12">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 transition-all duration-500 ${
                i <= step ? 'bg-gold' : 'bg-cream/10'
              }`}
            />
          ))}
        </div>

        {/* Step count */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-cream/30 text-xs font-body tracking-[2px] uppercase">
            Frage {step + 1} von {STEPS.length}
          </span>
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="text-cream/30 text-xs hover:text-cream/60 transition-colors"
              
            >
              ← Zurück
            </button>
          )}
        </div>

        {/* Question + input */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fieldVariants}
            initial="enter"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-display text-3xl md:text-4xl text-cream mb-8 leading-tight">
              {question}
            </h3>

            {current?.type === 'choice' ? (
              <div className="flex flex-wrap gap-3">
                {current.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => { set(current.field, choice); setTimeout(advance, 200) }}
                    
                    className={`px-6 py-3 border text-sm tracking-[2px] uppercase font-body transition-all duration-300 ${
                      values[current.field] === choice
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-cream/20 text-cream/60 hover:border-gold/50 hover:text-cream'
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : current?.type === 'textarea' ? (
              <textarea
                rows={4}
                value={values[current.field] || ''}
                onChange={(e) => set(current.field, e.target.value)}
                placeholder={current.placeholder}
                className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none text-cream font-body text-lg py-3 resize-none transition-colors placeholder-cream/20"
                
                onKeyDown={(e) => e.key === 'Tab' && canAdvance && (e.preventDefault(), advance())}
              />
            ) : (
              <input
                type={current?.type || 'text'}
                value={values[current?.field] || ''}
                onChange={(e) => set(current.field, e.target.value)}
                placeholder={current?.placeholder}
                autoFocus
                className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none text-cream font-body text-2xl py-4 transition-colors placeholder-cream/20"
                
                onKeyDown={(e) => e.key === 'Enter' && canAdvance && advance()}
              />
            )}

            {current?.hint && (
              <p className="text-cream/30 text-xs font-body mt-3">{current.hint}</p>
            )}

            {current?.type !== 'choice' && (
              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={advance}
                  disabled={!canAdvance}
                  className={`btn-gold ${!canAdvance ? 'opacity-30' : ''}`}
                  
                >
                  <span>{isLast ? 'Absenden' : 'Weiter →'}</span>
                </button>
                {!isLast && (
                  <span className="text-cream/20 text-xs font-body">oder Enter drücken</span>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
