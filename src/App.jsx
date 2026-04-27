import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import InkCursor from './components/InkCursor'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { id: 'hero', Component: Hero },
  { id: 'services', Component: Services },
  { id: 'gallery', Component: Gallery },
  { id: 'about', Component: About },
  { id: 'reviews', Component: Reviews },
  { id: 'booking', Component: Booking },
  { id: 'contact', Component: Contact },
]

export default function App() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const panels = track.querySelectorAll('.panel')
    const totalWidth = panels.length * window.innerWidth

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(totalWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          end: () => '+=' + (totalWidth - window.innerWidth),
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Ink wipe entrance per panel (except first)
      panels.forEach((panel, i) => {
        if (i === 0) return
        const wipe = panel.querySelector('.ink-wipe-enter')
        if (!wipe) return
        gsap.from(wipe, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: ScrollTrigger.getAll()[0],
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <InkCursor />

      {/* Horizontal scroll wrapper */}
      <div ref={containerRef} style={{ height: '100vh', overflow: 'hidden' }}>
        <div
          ref={trackRef}
          className="horizontal-track"
          style={{ width: `${PANELS.length * 100}vw`, willChange: 'transform' }}
        >
          {PANELS.map(({ id, Component }) => (
            <Component key={id} />
          ))}
        </div>
      </div>

      {/* Floating ink particles (global) */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3,
              height: 3,
              background: '#c9a84c',
              opacity: 0.15,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}
