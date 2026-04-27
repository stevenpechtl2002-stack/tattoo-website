import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Team from './components/Team'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Prices from './components/Prices'
import Products from './components/Products'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Map from './components/Map'
import Footer from './components/Footer'
import Modal from './components/Modal'

export default function App() {
  const [modal, setModal] = useState(null)

  return (
    <>
      <Nav onOpenModal={setModal} />

      <main>
        <Hero />
        <Services />
        <Gallery />
        <About />
        <Team />
        <Reviews />
        <Prices />
        <FAQ />
        <Products />
        <Booking />
        <Contact />
        <Map />
      </main>

      <Footer onOpenModal={setModal} />

      {modal && <Modal id={modal} onClose={() => setModal(null)} />}
    </>
  )
}
