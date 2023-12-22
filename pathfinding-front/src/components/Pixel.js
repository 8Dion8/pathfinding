import React, { useState } from 'react';
import '../styles/pixel.scss'

function Pixel({ rkey, ckey, updfunc }) {
    const [pixelColor, setPixelColor] = useState("#071013")
    const [state, setState] = useState(0)

    const handleDragStart = (event) => {
        event.preventDefault()
    }

    const toggleState = () => {

        //console.log(rkey, ckey)
        

        if (state == 0) {
            setState(1)
            setPixelColor("#D6C299")
            updfunc(rkey, ckey, 1)
        } else {
            setState(0)
            setPixelColor("#071013")
            updfunc(rkey, ckey, 0)
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