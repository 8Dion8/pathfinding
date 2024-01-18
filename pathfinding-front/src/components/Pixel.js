import React, { useDebugValue, useEffect, useState } from 'react';
import '../styles/pixel.scss'

function Pixel({ rkey, ckey, updfunc, mainArr, selectedType }) {
    const [pixelColor, setPixelColor] = useState("#434C5E")

    const handleDragStart = (event) => {
        event.preventDefault()
    }

    const nameToKey = (name) => {
        switch (name) {
            case "Wall":
                return 1
            case "Start":
                return 2
            case "Finish":
                return 3
        }
    }

    const colorPixel = () => {
        let state = mainArr[rkey][ckey]

        switch (state) {
            case 0:
                setPixelColor("#434C5E")
                break
            case 1:
                setPixelColor("#D8DEE9")
                break
            case 2:
                setPixelColor("#BF616A")
                break
            case 3:
                setPixelColor("#A3BE8C")
                break
            case 4:
                setPixelColor("#D08770")
                break
            case 5:
                setPixelColor("#EBCB8B")
                break
            case 6:
                setPixelColor("#B48EAD")
                break
            case 7:
                setPixelColor("#8FBCBB")
                break
        }
        
    }

    const toggleState = () => {
        if (rkey < mainArr.length && ckey < mainArr[0].length) {
            let state = mainArr[rkey][ckey]
            if (state == 0) {
                updfunc(rkey, ckey, nameToKey(selectedType))
            } else {
                updfunc(rkey, ckey, 0)
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