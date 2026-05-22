import { useParams } from 'react-router-dom'
import '../css/EntryDetails.css'

export default function EntryDetails() {
    const { id } = useParams()

    return (
        <div>
            <h1>Entry Details Page</h1>
            <p>Viewing ID: {id}</p>
        </div>
    )
}