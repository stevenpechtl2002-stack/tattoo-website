import { createBrowserRouter, RouterProvider } from 'react-router-dom'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LeistungenPage from './pages/LeistungenPage'
import GalleriePage from './pages/GalleriePage'
import UeberUnsPage from './pages/UeberUnsPage'
import TeamPage from './pages/TeamPage'
import PreisePage from './pages/PreisePage'
import FAQPage from './pages/FAQPage'
import KontaktPage from './pages/KontaktPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'leistungen', element: <LeistungenPage /> },
      { path: 'galerie', element: <GalleriePage /> },
      { path: 'ueber-uns', element: <UeberUnsPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'preise', element: <PreisePage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'kontakt', element: <KontaktPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
