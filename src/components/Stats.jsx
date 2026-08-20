import '../css/Stats.css'
import {useState, useEffect} from 'react'
import {supabase} from '../supabase'


export default function Stats() {
  const [entries, setEntries] = useState([])

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

  const totalWatched = entries.length
  const avgRating = entries.length > 0
    ? (entries.reduce((sum, e) => sum + Number(e.rating), 0) / entries.length).toFixed(1)
    : 0

  return (
    <section className="stats">
      <h2 className="stats-header">stats</h2>
      <div className="stats-display">
        <div className="stats-card">
          <p className="stats-number">{totalWatched}</p>
          <p className="stats-label">films watched</p>
        </div>
        <div className="stats-card">
          <p className="stats-number">{avgRating}</p>
          <p className="stats-label">avg rating</p>
        </div>
      </div>
    </section>
  )
}