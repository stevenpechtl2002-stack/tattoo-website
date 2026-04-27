import { motion } from 'framer-motion'

const row1 = [
  { url: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=80', label: 'Realistik Portrait' },
  { url: 'https://images.unsplash.com/photo-1590246814883-57c511e84693?w=800&q=80', label: 'Blackwork' },
  { url: 'https://images.unsplash.com/photo-1616493478363-c3dd6c9d4ee2?w=800&q=80', label: 'Fine Line' },
  { url: 'https://images.unsplash.com/photo-1628955987810-45434c5b4f95?w=800&q=80', label: 'Traditional' },
  { url: 'https://images.unsplash.com/photo-1503097843296-e290b4f16f64?w=800&q=80', label: 'Geometric' },
  { url: 'https://images.unsplash.com/photo-1555685812-4b8f59697ef3?w=800&q=80', label: 'Watercolor' },
  { url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80', label: 'Japanese' },
  { url: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=800&q=80', label: 'Cover Up' },
]

const row2 = [
  { url: 'https://images.unsplash.com/photo-1477747219299-60f02e818890?w=800&q=80', label: 'Dotwork' },
  { url: 'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?w=800&q=80', label: 'Neo Traditional' },
  { url: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80', label: 'Lettering' },
  { url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', label: 'Portrait' },
  { url: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=800&q=80', label: 'Tribal' },
  { url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80', label: 'Mandala' },
  { url: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&q=80', label: 'Sketch Style' },
  { url: 'https://images.unsplash.com/photo-1590246814883-57c511e84693?w=800&q=80', label: 'Minimalist' },
]

function ImageCard({ url, label }) {
  return (
    <div className="g-card">
      <img src={url} alt={label} />
      <div className="g-label">{label}</div>
    </div>
  )
}

export default function Gallery() {
  return (
    <div className="panel" style={{ background: '#080808', overflow: 'hidden', padding: '8rem 0' }}>
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
          className="g-head"
        >
          <div>
            <div className="s-eyebrow">
              <div className="s-eyebrow-line" />
              <span className="s-label">Portfolio</span>
            </div>
            <h2 className="s-title">
              Unsere <em>Arbeiten</em>
            </h2>
          </div>
        </motion.div>

        {/* Scrolling row */}
        <div className="g-carousel">
          <div className="g-track-wrap">
            <div className="g-track g-track-r">
              {[...row1, ...row2, ...row1, ...row2].map((img, i) => (
                <ImageCard key={i} {...img} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .g-head {
          padding: 0 5rem;
          margin-bottom: 4rem;
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
        .g-carousel {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .g-track-wrap {
          overflow: hidden;
          -webkit-mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .g-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: gRight 60s linear infinite;
        }
        .g-track-r {
          animation: gRight 60s linear infinite;
        }
        .g-track:hover,
        .g-track-r:hover {
          animation-play-state: paused;
        }
        @keyframes gLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes gRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .g-card {
          position: relative;
          width: 240px;
          height: 360px;
          flex-shrink: 0;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(201,168,76,.12);
          transition: transform .3s, border-color .3s, box-shadow .3s;
        }
        .g-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(201,168,76,.35);
          box-shadow: 0 20px 50px rgba(0,0,0,.5);
        }
        .g-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
          filter: grayscale(20%);
        }
        .g-card:hover img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }
        .g-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: .9rem 1rem .75rem;
          background: linear-gradient(to top, rgba(8,8,8,.85) 0%, transparent 100%);
          color: #f5f5f5;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: Inter, sans-serif;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .3s, transform .3s;
        }
        .g-card:hover .g-label {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 1024px) {
          .g-head { padding: 0 2.5rem; }
          .g-card { width: 200px; height: 300px; }
        }
        @media (max-width: 640px) {
          .g-head { padding: 0 1.5rem; }
          .g-card { width: 160px; height: 240px; }
        }
      `}</style>
    </div>
  )
}
