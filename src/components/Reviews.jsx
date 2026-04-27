import { motion } from 'framer-motion'

const reviews = [
  { name: 'Sarah K.',   initials: 'SK', role: 'Realistik Portrait',   text: 'Absolut beeindruckend! Das Team hat meine Vision perfekt umgesetzt. Das Realistik-Portrait meiner Katze sieht atemberaubend aus.' },
  { name: 'Marcus T.',  initials: 'MT', role: 'Blackwork',             text: 'Professioneller geht es nicht. Von der Beratung bis zum fertigen Tattoo war alles perfekt. Das Studio ist unglaublich sauber.' },
  { name: 'Lena M.',    initials: 'LM', role: 'Fine Line',             text: 'Mein erstes Tattoo und ich hätte keinen besseren Ort wählen können. So viel Geduld und Sorgfalt. Das Ergebnis übertrifft alle Erwartungen.' },
  { name: 'Jonas R.',   initials: 'JR', role: 'Cover Up',              text: 'Ich hatte ein altes Tattoo, das ich hasste. Das Cover Up ist ein Wunder — ich kann gar nicht glauben, was sie daraus gemacht haben.' },
  { name: 'Anna B.',    initials: 'AB', role: 'Watercolor',            text: 'Das Watercolor-Tattoo ist ein echtes Kunstwerk. Jeder fragt mich danach und ich verweise jeden direkt zu Harlekin Tattoo.' },
  { name: 'Tobias F.',  initials: 'TF', role: 'Traditional',           text: 'Unglaubliche Atmosphäre im Studio. Das Team nimmt sich wirklich Zeit für jedes Detail. Das Ergebnis ist schlicht perfekt.' },
]

const reviewsRow2 = [
  { name: 'Mia L.',     initials: 'ML', role: 'Lettering',             text: 'Schon mein drittes Tattoo hier und jedes Mal bin ich aufs Neue begeistert. Die Qualität ist konstant auf höchstem Niveau.' },
  { name: 'Keanu S.',   initials: 'KS', role: 'Geometric',             text: 'Endlich ein Studio, das wirklich zuhört. Meine Idee wurde verstanden und in ein absolutes Meisterwerk verwandelt.' },
  { name: 'Clara W.',   initials: 'CW', role: 'Portrait',              text: 'Beste Erfahrung meines Lebens. Das Team ist talentiert, freundlich und sehr professionell. Absolute Empfehlung!' },
  { name: 'Felix P.',   initials: 'FP', role: 'Neo Traditional',       text: 'Ich war nervös vor meinem ersten großen Piece, aber das Team hat mich so entspannt — das Ergebnis ist traumhaft.' },
  { name: 'Nina G.',    initials: 'NG', role: 'Dotwork',               text: 'Die Liebe zum Detail ist unglaublich. Jeder Punkt sitzt perfekt. Dieses Studio lebt für seine Kunst, das spürt man.' },
  { name: 'Ben K.',     initials: 'BK', role: 'Japanese',              text: 'Von der ersten Skizze bis zum fertigen Tattoo war jeder Schritt ein Erlebnis. Hier wird echte Kunst erschaffen.' },
]

function ReviewCard({ name, initials, role, text }) {
  return (
    <div className="r-card">
      <div className="r-stars">★★★★★</div>
      <p className="r-text">{text}</p>
      <div className="r-person">
        <div className="r-av">{initials}</div>
        <div>
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  return (
    <div className="panel" id="bewertungen" style={{ background: '#080808', overflow: 'hidden', padding: '8rem 0' }}>
      {/* BG texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rev-head"
        >
          <div>
            <div className="s-eyebrow">
              <div className="s-eyebrow-line" />
              <span className="s-label">Kundenstimmen</span>
            </div>
            <h2 className="s-title">
              Was unsere <em>Kunden</em> sagen
            </h2>
          </div>
          <div className="rev-score">
            <div className="rev-big">5.0</div>
            <div>
              <div className="rev-stars-big">★★★★★</div>
              <div className="rev-count">Google-Bewertungen · Pforzheim</div>
            </div>
          </div>
        </motion.div>

        {/* Scrolling rows */}
        <div className="reviews-carousel">
          <div className="rev-track-wrap">
            <div className="rev-track">
              {[...reviews, ...reviews].map((r, i) => (
                <ReviewCard key={i} {...r} />
              ))}
            </div>
          </div>
          <div className="rev-track-wrap">
            <div className="rev-track rev-r">
              {[...reviewsRow2, ...reviewsRow2].map((r, i) => (
                <ReviewCard key={i} {...r} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rev-head {
          padding: 0 5rem;
          margin-bottom: 4rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .s-eyebrow {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: .75rem;
        }
        .s-eyebrow-line {
          width: 24px;
          height: 2px;
          background: #c9a84c;
          border-radius: 2px;
        }
        .s-label {
          color: #c9a84c;
          font-size: .72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: Inter, sans-serif;
        }
        .s-title {
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -1.5px;
          color: #f5f5f5;
          font-family: 'Playfair Display', serif;
        }
        .s-title em {
          color: #c9a84c;
          font-style: normal;
        }
        .rev-score {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .rev-big {
          font-size: 5.5rem;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -3px;
          color: #f5f5f5;
          font-family: 'Playfair Display', serif;
        }
        .rev-stars-big {
          color: #c9a84c;
          font-size: 1.2rem;
          letter-spacing: 3px;
        }
        .rev-count {
          font-size: .82rem;
          color: rgba(245,245,245,.4);
          margin-top: .2rem;
          font-family: Inter, sans-serif;
        }
        .reviews-carousel {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .rev-track-wrap {
          overflow: hidden;
          -webkit-mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .rev-track {
          display: flex;
          gap: 1.4rem;
          width: max-content;
          animation: revLeft 38s linear infinite;
        }
        .rev-track.rev-r {
          animation: revRight 44s linear infinite;
        }
        .rev-track:hover,
        .rev-track.rev-r:hover {
          animation-play-state: paused;
        }
        @keyframes revLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes revRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .r-card {
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(201,168,76,.15);
          border-radius: 20px;
          padding: 2rem;
          width: 320px;
          flex-shrink: 0;
          transition: transform .3s, border-color .3s, box-shadow .3s;
          cursor: default;
        }
        .r-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(201,168,76,.4);
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
        }
        .r-stars {
          color: #c9a84c;
          font-size: .95rem;
          letter-spacing: 2px;
          margin-bottom: .9rem;
        }
        .r-text {
          color: rgba(245,245,245,.55);
          line-height: 1.75;
          font-size: .88rem;
          margin-bottom: 1.4rem;
          font-style: italic;
          position: relative;
          padding-left: 1.2rem;
          font-family: Inter, sans-serif;
        }
        .r-text::before {
          content: '"';
          position: absolute;
          left: 0;
          top: -.2rem;
          color: #c9a84c;
          font-size: 2rem;
          font-style: normal;
          line-height: 1;
        }
        .r-person {
          display: flex;
          align-items: center;
          gap: .75rem;
        }
        .r-av {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c9a84c, #8b6914);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: .8rem;
          color: #080808;
          flex-shrink: 0;
          font-family: Inter, sans-serif;
        }
        .r-person strong {
          display: block;
          font-size: .88rem;
          color: #f5f5f5;
          font-family: Inter, sans-serif;
        }
        .r-person span {
          font-size: .75rem;
          color: rgba(245,245,245,.4);
          font-family: Inter, sans-serif;
        }
        @media (max-width: 640px) {
          .rev-head { padding: 0 1.5rem; }
          .rev-big { font-size: 3.5rem; }
        }
        @media (max-width: 1024px) {
          .rev-head { padding: 0 2.5rem; }
        }
      `}</style>
    </div>
  )
}
