import '../css/RecentEntries.css'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Stars from '../components/Stars'
import {supabase} from '../supabase'



export default function RecentEntries() {
  const [entries, setEntries] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    const fetchEntries = async () => {
      const {data, error} = await supabase
        .from('entries'
        .select('*')
        .order('id', {ascending: false})
        .limit(3)

        if (data) setEntries(data)
      }

      fetchEntries()
  }, [])

  return (
    <section className="recent-entries">
      <h2 className = "recent-title">recently watched</h2>
      <div className="entries-grid">
        {entries.map(entry => (
          <div className="entry-card" key={entry.id}
          onClick = {() => {navigate(`/entry/${entry.id}`)}}>
            <h3>{entry.title}</h3>
            <div className="disabled-stars" style={{ pointerEvents: 'none' }}>
              <Stars defaultRating={entry.rating} />
            </div>
            <p>{entry.year}</p>
            <p>{entry.notes}</p>
            <p>{entry.date}</p>
          </div>
        ))}
      </div>
      <button className = "see-all-btn" onClick = {() => navigate('/entries')}>see all</button>
      <button className = "add-btn" onClick = {() => navigate('/add')}>add entry</button>
    </section>
  )
}