import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Modal from './Modal'

export default function Layout() {
  const [modal, setModal] = useState(null)
  return (
    <>
      <Nav onOpenModal={setModal} />
      <Outlet />
      <Footer onOpenModal={setModal} />
      {modal && <Modal id={modal} onClose={() => setModal(null)} />}
    </>
  )
}
