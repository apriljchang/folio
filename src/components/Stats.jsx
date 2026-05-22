import '../css/Stats.css'

const fakeStats = {
  totalWatched: 47,
  totalWatchlist: 56,
  avgRating: 4.2,
  favGenre: "romance",
}

export default function Stats() {
  return (
    <section className="stats">
      <h2 className="stats-header">stats</h2>
      <div className="stats-display">
        <div className="stats-card">
          <p className="stats-number">{fakeStats.totalWatched}</p>
          <p className="stats-label">films watched</p>
        </div>
        <div className="stats-card">
          <p className="stats-number">{fakeStats.totalWatchlist}</p>
          <p className="stats-label">on watchlist</p>
        </div>
        <div className="stats-card">
          <p className="stats-number">{fakeStats.avgRating}</p>
          <p className="stats-label">avg rating</p>
        </div>
        <div className="stats-card">
          <p className="stats-number">{fakeStats.favGenre}</p>
          <p className="stats-label">fav genre</p>
        </div>
      </div>
    </section>
  )
}