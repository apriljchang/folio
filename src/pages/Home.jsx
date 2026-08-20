import Hero from '../components/Hero'
import shelves from '../components/shelves'
import journal from '../components/journal'


export default function Home() {
  return (
    <main>
      <div className = "home">
          <Hero />
          <div className = "home-shelves">
            <h1>shelves</h1>
            <shelves />
          </div>
          <div className = "home-journal">
            <h1>journal</h1>
            <journal />
          </div>
      </div>
    </main>
  )
}