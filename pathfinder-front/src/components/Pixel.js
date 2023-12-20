import React, { useState } from 'react';
import '../styles/pixel.scss'

function Pixel() {
    const [pixelColor, setPixelColor] = useState("#071013")
    const [state, setState] = useState(0)

    const handleDragStart = (event) => {
        event.preventDefault()
    }

    const toggleState = () => {
        if (state == 0) {
            setState(1)
            setPixelColor("#D6C299")
        } else {
            setState(0)
            setPixelColor("#071013")
        }
        
    }

    return (
        <div
            className='pixel'
            style={{backgroundColor: pixelColor}}
            onClick={toggleState}
            onDragStart={handleDragStart}
        ></div>
    )
}

export default Pixel;