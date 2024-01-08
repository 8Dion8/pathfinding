import React, { useDebugValue, useEffect, useState } from 'react';
import '../styles/pixel.scss'

function Pixel({ rkey, ckey, updfunc, mainArr }) {
    const [pixelColor, setPixelColor] = useState("#434C5E")

    const handleDragStart = (event) => {
        event.preventDefault()
    }

    const colorPixel = () => {
        let state = mainArr[rkey][ckey]
        if (state == 1) {
            setPixelColor("#D8DEE9")
        } else if (state == 0) {
            setPixelColor("#434C5E")
        } else if (state == 2) {
            setPixelColor("#BF616A")
        } else if (state == 3) {
            setPixelColor("#A3BE8C")
        } else if (state == 4) {
            setPixelColor("#D08770")
        } else if (state == 5) {
            setPixelColor("#A3BE8C")
        } else if (state == 6) {
            setPixelColor("#BF616A")
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