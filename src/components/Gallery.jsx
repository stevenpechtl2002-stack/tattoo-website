import { motion } from 'framer-motion'

const images = [
  { url: '/bilder/IMG_2591%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2592.jpg', label: 'Blackwork' },
  { url: '/bilder/IMG_2593%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2594%202.jpg', label: 'Tribal' },
  { url: '/bilder/IMG_2595%202.jpg', label: 'Fine Line' },
  { url: '/bilder/IMG_2596%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2597%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2598%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2599%202.jpg', label: 'Blackwork' },
  { url: '/bilder/IMG_2599.jpg', label: 'Blackwork' },
  { url: '/bilder/IMG_2600%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2601%202.jpg', label: 'Lettering' },
  { url: '/bilder/IMG_2602%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2603.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2604%202.jpg', label: 'Maori' },
  { url: '/bilder/IMG_2605%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2606%202.jpg', label: 'Black & Grey' },
  { url: '/bilder/IMG_2606.jpg', label: 'Black & Grey' },
]

export default function Gallery() {
  return (
    <div
      className="panel"
      style={{ background: '#080808', overflow: 'hidden', padding: '8rem 0', position: 'relative' }}
    >
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ padding: '0 5rem', marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
            <div style={{ width: 24, height: 2, background: '#c9a84c', borderRadius: 2 }} />
            <span style={{
              color: '#c9a84c', fontSize: '.72rem', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
            }}>Portfolio</span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 4vw, 3.6rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-1.5px', color: '#f5f5f5',
          }}>
            Unsere <em style={{ color: '#c9a84c', fontStyle: 'normal' }}>Arbeiten</em>
          </h2>
        </motion.div>

        {/* Single scrolling row */}
        <div style={{
          overflow: 'hidden',
          WebkitMask: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
          mask: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        }}>
          <div className="gallery-scroll-track">
            {[...images, ...images].map((img, i) => (
              <div key={i} className="gallery-card">
                <img src={img.url} alt={img.label} />
                <div className="gallery-card-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gallery-scroll-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: galleryRight 50s linear infinite;
        }
        .gallery-scroll-track:hover {
          animation-play-state: paused;
        }
        @keyframes galleryRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .gallery-card {
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
        .gallery-card:hover {
          transform: translateY(-6px) scale(1.02);
          border-color: rgba(201,168,76,.35);
          box-shadow: 0 20px 50px rgba(0,0,0,.5);
        }
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s cubic-bezier(.4,0,.2,1);
          filter: grayscale(20%);
        }
        .gallery-card:hover img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }
        .gallery-card-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
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
        .gallery-card:hover .gallery-card-label {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 640px) {
          .gallery-card { width: 170px; height: 255px; }
        }
      `}</style>
    </div>
  )
}
