import React, { useState } from 'react';
import '../styles/pixel.css'

function Pixel() {
    const [pixelColor, setPixelColor] = useState("#0f0")

    return (
        <div
            className='pixel'
            style={{backgroundColor: pixelColor}}
        ></div>
    )
}

export default Pixel;