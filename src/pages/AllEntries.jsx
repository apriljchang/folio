import {useEffect, useState} from 'react'
import '../css/AllEntries.css'
import Stars from '../components/Stars'
import {useNavigate} from 'react-router-dom'
import {supabase} from '../supabase'

export default function AllEntries() {
    const [entries, setEntries] = useState([])
    const navigate = useNavigate() 

    useEffect(() => {
        const fetchEntries = async () => {
            const {data, error} = await supabase
                .from("entries")
                .select("*")
                .order('id', {ascending: false})

            if (data) setEntries(data)
        }

        fetchEntries()
    }, [])

    return (
        <div className = "allEntries">
                <h1 className = "all-entries-title">all entries</h1>
                <div className = "all-entries-grid">
                    {entries.map(entry => (
                        <div className="film-card" 
                        key={entry.id}
                        onClick = {() => {navigate(`/entry/${entry.id}`)}}
                        >
                            <div className = "film-poster">
                                {entry.poster_url ? (
                                    <img src={`https://image.tmdb.org/t/p/w500${entry.poster_url}`} />
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