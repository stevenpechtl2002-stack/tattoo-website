import { MeshGradient } from '@paper-design/shaders-react'
import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Reviews from '../components/Reviews'
import Products from '../components/Products'
import Booking from '../components/Booking'
import Map from '../components/Map'

export default function HomePage() {
  return (
    <>
      {/* Fixed full-page animated background */}
      <MeshGradient
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
        colors={['#080808', '#c9a84c', '#3d2a00', '#080808']}
        speed={0.3}
      />

      {/* Subtle overlay to keep content readable */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8,8,8,0.6)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <Services />
        <About />
        <Reviews />
        <Products />
        <Booking />
        <Map />
      </main>
    </>
  )
}
