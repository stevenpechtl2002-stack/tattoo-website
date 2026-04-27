import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Reviews />
        <Booking />
        <Contact />
      </main>

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
