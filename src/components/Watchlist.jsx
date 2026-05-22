import '../css/Watchlist.css'

const fakeWatchlist = [
  {
    id: 1,
    name: "Project Hail Mary",
    status: "watching"
  },
  {
    id: 2,
    name: "Devil Wears Prada 2",
    status: "not watched"
  }
]

export default function Watchlist() {
  return (
    <section className="watchlist">
      <h2 className="watchlist-title">watchlist</h2>
      <div className="watchlist-list">
        {fakeWatchlist.map(entry => (
          <div className="watchlist-card" key={entry.id}>
            <h3>{entry.name}</h3>
            <p>{entry.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}