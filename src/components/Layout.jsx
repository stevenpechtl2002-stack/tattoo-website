import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Modal from './Modal'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Layout() {
  const [modal, setModal] = useState(null)
  return (
    <>
      <ScrollToTop />
      <Nav onOpenModal={setModal} />
      <Outlet />
      <Footer onOpenModal={setModal} />
      {modal && <Modal id={modal} onClose={() => setModal(null)} />}
    </>
  )
}
