import '../css/PageFlip.css'
import '../css/PageFlip.css'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'


export default function PageFlip() {
    const [flipping, setFlipping] = useState(false)
    const navigate = useNavigate() 

    const handleClick = () => {
        setFlipping(true)
        setTimeout(() => {
            navigate('/profile')
            setFlipping(false)
        }, 400)
    }

    return (
        <>
        <div className = "triangle" onClick ={handleClick}>
            <span className = "triangle-label">my folio</span>
        </div>
        {flipping && <div className = "page-flip-overlay" />}
        </>
    )
}