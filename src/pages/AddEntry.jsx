import '../css/AddEntry.css'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Stars from '../components/Stars'
import {useLocation} from 'react-router-dom'
import {supabase} from '../supabase'

export default function AddEntry() {
const [title, setTitle] = useState('')
const [date, setDate] = useState(new Date().toISOString().split('T')[0])
const [rating, setRating] = useState(3)
const [notes, setNotes] = useState('')
const [query, setQuery] = useState('')
const [searchResults, setSearchResults] = useState([])
const [posterURL, setPosterURL] = useState('')
const [selectedMovie, setSelectedMovie] = useState(null)

const navigate = useNavigate() 
const location = useLocation()

  useEffect(() => {
    if (location.state?.movie) {
      const movie = location.state.movie
      setTitle(movie.name || movie.title)
      setPosterURL(movie.poster_path)
      setSelectedMovie(movie)
    }
  }, [])

const handleSubmit = async () => {
  const entry = {
    title: title,
    date: date,
    rating: rating,
    notes: notes,
    poster_url: posterURL
  }

    console.log('sending:', entry)  // ← add this


  const { error } = await supabase
    .from('entries')
    .insert(entry)

  if (error) {
    console.log('error saving:', error)
  } else {
    navigate('/profile')
  }
}

const searchMovies = async () => {
const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`)  
const data = await res.json()
  setSearchResults(data.results)  
}

useEffect(() => {
  if (query.length > 1) {
    searchMovies()
  }
}, [query])

return (
    <section className = "addEntryPage">
        <h1 className = "addEntryHeader">add entry page</h1>
        <form className = "addEntryForm">
            <div className = "search-wrapper">
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
                        setTitle(movie.title || movie.name)
                        setPosterURL(movie.poster_path)
                        setSelectedMovie(movie)
                        setSearchResults([])
                    }}>
                        <img src = {`https://image.tmdb.org/t/p/w200${movie.poster_path}`}/>
                        <p>{movie.title}</p>
                        <p>{movie.release_date?.slice(0,4)}</p>
                    </div>
                ))}
            </div>
            )}
            </div>

            <label HTMLfor="title">title:</label>
            <input 
                type="text" 
                id="title"
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}
            />

            <label HTMLfor="date">date: </label>
            <input 
                type = "date" 
                id = "date"
                value = {date}
                onChange = {(e) => setDate(e.target.value)}
            />

            <label htmlFor = "rating">rating: </label>
            <Stars 
                count = {5}
                defaultRating = {rating}
                onRatingChange = {setRating}
            />

            <label HTMLfor = "notes">notes: </label>
            <input 
                type = "text" 
                id = "notes"
                value = {notes}
                onChange = {(e) => setNotes(e.target.value)}
            />

            <button type = "button" className = "submitButton" onClick={handleSubmit}>save entry</button>

        </form>

    </section>
  )
}