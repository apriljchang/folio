import { useNavigate } from 'react-router-dom'

import "/Users/aprilchang/Desktop/movie journal/my-film-journal/src/css/Hero.css"

export default function Hero() {

  const navigate = useNavigate() 

  return (
    <div className="hero">
      <h1 className="hero-title">folio</h1>
      <p className="hero-tagline">your personality through film</p>
      <button className="hero-btn" onClick = {() => navigate('/add')}>start watching</button>
    </div>
  )
}