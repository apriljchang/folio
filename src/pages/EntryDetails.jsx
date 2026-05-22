import { useParams } from 'react-router-dom'
import '../css/EntryDetails.css'
import { useState, useEffect } from 'react'

export default function EntryDetails() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)

    useEffect(() => {
        const savedEntries = localStorage.getItem('entries')
        if (savedEntries) {
            const allEntries = (JSON.parse(savedEntries))

            const foundMovie = allEntries.find(entry => entry.id === Number(id))

            setMovie(foundMovie)
        }  
    }, [id])

    if (!movie)
    {
        return <div className = "loading">Loading movie details...</div>
    }

    return (
        <div className = " entry-details-container">
            <h1 className = "movie-title">{movie.title}</h1>
           <p className="movie-date">Watched on: {movie.date ? movie.date : "no date found"}</p>
        </div>
    )
}