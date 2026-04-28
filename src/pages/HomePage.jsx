import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Reviews from '../components/Reviews'
import Products from '../components/Products'
import Booking from '../components/Booking'
import Map from '../components/Map'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Reviews />
      <Products />
      <Booking />
      <Map />
    </main>
  )
}
