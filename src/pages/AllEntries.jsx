import {useEffect, useState} from 'react'
import '../css/AllEntries.css'
import Stars from '../components/Stars'

export default function AllEntries() {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        const savedEntries = localStorage.getItem('entries')
        if (savedEntries) {
            setEntries(JSON.parse(savedEntries))
        }   
    }, [])

    return (
        <div className = "allEntries">
                <h1 className = "all-entries-title">all entries</h1>
                <div className = "all-entries-grid">
                    {entries.map(entry => (
                        <div className="film-card" key={entry.id}>
                            <div className = "film-poster">
                                {entry.posterURL ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${entry.posterURL}`} />
                                ) : (
                                    <div className="no-poster"></div>
                                )}
                            </div>
                            <h3 className = "film-card-title">{entry.title}</h3>
                            <p>{entry.date}</p>
                            <div className="disabled-stars" style={{ pointerEvents: 'none' }}>
                            <Stars defaultRating={entry.rating} />
                            </div>                            
                            <p>{entry.notes}</p>
                        </div>
                ))}
                </div>
        </div>
    )
}