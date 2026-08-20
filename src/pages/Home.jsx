import '../css/Home.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <main className="home">
      <div className="home-shelves" onClick={() => navigate('/shelves')}>
        <h1 className="home-label">shelves</h1>
      </div>

      <div className="home-center">
        <h1 className="hero-title">folio</h1>
        <p className="hero-tagline">your journal through media</p>
      </div>

      <div className="home-journal" onClick={() => navigate('/journal')}>
        <h1 className="home-label">journal</h1>
      </div>
    </main>
  )
}