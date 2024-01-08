import React, { useDebugValue, useEffect, useState } from 'react';
import '../styles/pixel.scss'

function Pixel({ rkey, ckey, updfunc, mainArr }) {
    const [pixelColor, setPixelColor] = useState("#071013")

    const handleDragStart = (event) => {
        event.preventDefault()
    }

    const colorPixel = () => {
        let state = mainArr[rkey][ckey]
        if (state == 1) {
            setPixelColor("#D6C299")
        } else if (state == 0) {
            setPixelColor("#071013")
        } else if (state == 2) {
            setPixelColor("#16BAC5")
        } else if (state == 3) {
            setPixelColor("#FE5F55")
        } else if (state == 4) {
            setPixelColor("#F18805")
        } else if (state == 5) {
            setPixelColor("#FE5F55")
        } else if (state == 6) {
            setPixelColor("#16BAC5")
        }
        
    }

    const toggleState = () => {
        if (rkey < mainArr.length && ckey < mainArr[0].length) {
            let state = mainArr[rkey][ckey]
            if (state == 0) {
                updfunc(rkey, ckey, 1)
            } else if (state == 1) {
                updfunc(rkey, ckey, 0)
            } else if (state == 2) {
                updfunc(rkey, ckey, 2)
            }

            colorPixel()
        }    
    }

    const handleArrChange = () => {
        colorPixel()
    }

    useEffect(() => {
        handleArrChange()
    }, mainArr)

    return (
        <div
            className='pixel'
            style={{
                backgroundColor: pixelColor,
                transition: "background-color 0.2s"
            }}
            onClick={toggleState}
            onDragStart={handleDragStart}
        ></div>
    )
}

export default Pixel;