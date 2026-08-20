import { useParams } from 'react-router-dom'
import '../css/EntryDetails.css'
import { useState, useEffect } from 'react'
import {supabase} from '../supabase'

export default function EntryDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    

useEffect(() => {
  const fetchEntry = async () => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .eq('id', id)
      .single()

    if (data) setMovie(data)
  }

  fetchEntry()
}, [id])

    if (!movie)
    {
        return <div className = "loading">Loading movie details...</div>
    }
    console.log(movie.date)
    return (
        <div className = " entry-details-container">
            <div className = "entry-main-details-container">
                <h1 className = "movie-title">{movie.title}</h1>
                <p className="movie-date">Watched on: {movie.date ? movie.date : "no date found"}</p>
                <p className = "movie-notes">{movie.notes}</p>
            </div>
            <img 
            className="movie-image" 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`} 
            />
        </div>
    )
}