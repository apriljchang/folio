import '../css/Watchlist.css'
import {useState, useEffect} from 'react'

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

  const [watchlist, setWatchlist] = useState([])
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [title, setTitle] = useState('')
  const [posterURL, setPosterURL] = useState('')


  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist')
    if (savedWatchlist) {
      const all = JSON.parse(savedWatchlist)
      setWatchlist(all)
    }   
  }, [])

  const searchMovies = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`)
    const data = await res.json()
      setSearchResults(data.results)  
}

  useEffect(() => {
    if (query.length > 1){
      searchMovies()
    }
  }, [query])

  const handleRemove = (idToRemove) => {
    const updatedWatchlist = watchlist.filter(movie => movie.id !== idToRemove)
    setWatchlist(updatedWatchlist)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
  }

  return (
    <section className="watchlist">
      <h2 className="watchlist-title">watchlist</h2> 

      <form className = "addWatchlistForm">
        <label HTMLfor = "query">search a movie: </label>
        <input
          type = "text"
          id = "query"
          value = {query}
          onChange = {(e) => {
            setQuery(e.target.value)
            setSelectedMovie(null)
          }}
        />

        {selectedMovie ? (
                <div className = "selected-movie" onClick ={() => setSelectedMovie(null)}>
                    <img src = {`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}/>
                </div>
            ) : (
            <div className = "search-results">
                {searchResults.map(movie => (
                    <div className = "search-result-item" key = {movie.id} onClick = {() => {
                        const newWatchlistItem = {
                          id: movie.id,
                          name: movie.title,
                          poster_path: movie.poster_path,
                          status: "not watched"
                        }

                        const updatedWatchlist = [...watchlist, newWatchlistItem]
                        setWatchlist(updatedWatchlist)

                        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))

                        setQuery('')
                        setSearchResults([])
                    }}>
                        <img src = {`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                        <p>{movie.title}</p>
                        <p>{movie.release_date?.slice(0,4)}</p>
                    </div>
                ))}
            </div>
            )}
      </form>

      <div className="watchlist-list">
  {watchlist.map(entry => (
    <div className="watchlist-card" key={entry.id}>
      <div className="film-poster">
        {entry.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w200${entry.poster_path}`} 
            alt={entry.name} 
          />
        ) : (
          <div className="no-poster">No Poster Available</div>
        )}
      </div>
      <h3>{entry.name ? entry.name: "no title"}</h3>
      <p>{entry.status}</p>

      <button
        type = "button"
        className = "remove-btn"
        onClick = {() => handleRemove(entry.id)}
      >
        Remove
      </button>
    </div>
  ))}
</div>
    </section>
  )
}