import { useParams } from 'react-router-dom'

export default function EntryDetails() {
    const { id } = useParams()

    return (
        <div>
            <h1>Entry Details Page</h1>
            <p>Viewing ID: {id}</p>
        </div>
    )
}