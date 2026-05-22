import '../css/Stars.css'
import {useState} from 'react'

const DEFAULT_COUNT = 5
const DEFAULT_ICON = "★"
const DEFAULT_UNSELECTED_COLOR = "gray"
const DEFAULT_COLOR = "yellow"

export default function Stars({count, defaultRating, icon, color, iconSize, onRatingChange}) {
    const [rating, setRating] = useState(defaultRating)
    const [temporaryRating, setTemporaryRating] = useState(0)

    let stars = Array(count || DEFAULT_COUNT).fill(icon || DEFAULT_ICON);

    const handleClick = (newRating) => {
        setRating(newRating);
        localStorage.setItem("starRating", newRating)

        if (onRatingChange) {
            onRatingChange(newRating)
        }
    }

    return <div className = "starsContainer">
        {stars.map((item, index) => {
            const isActiveColor = (rating || temporaryRating) && (index < rating || index < temporaryRating)

            let elementColor = "";

            if (isActiveColor)
            {
                elementColor = color || DEFAULT_COLOR;
            } else {
                elementColor = DEFAULT_UNSELECTED_COLOR;
            }
            return (
                <div className = "star" 
                key = {index} 
                style = {{fontSize: iconSize ? `${iconSize}px` : "14px",
                color: elementColor,
                filter : `${isActiveColor ? "grayscale(0%)" : "grayScale(100%)"}`
                }}
                onMouseEnter={() => setTemporaryRating(index + 1)}
                onMouseLeave = {() => setTemporaryRating(0)}
                onClick={() => handleClick(index + 1)}
                >
                    {icon ? icon : DEFAULT_ICON}
                </div>
            )
        })}
    </div>

}