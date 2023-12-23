import React, { useState } from 'react';
import Canvas from './Canvas';
import { Button, Box, Header, Heading, Grid, RangeInput } from 'grommet';


import '../styles/editor.scss'

function Editor() {
    const [canvasWidth, setCanvasWidth] = useState(35);
    const [canvasHeight, setCanvasHeight] = useState(25);
    const [canvasArr, setCanvasArr] = useState(() => {
        return Array.from({ length: canvasHeight }, () => Array.from({ length: canvasWidth }, () => 0));
    })

    const updateGridValue = (x, y, value) => {
        setCanvasArr(prevGrid => {
            return prevGrid.map((row, rowIndex) => {
                if (rowIndex === x) {
                    return row.map((col, colIndex) => {
                        return colIndex === y ? value : col;
                    });
                } else {
                    return row;
                }
            });
        });
    };

    const animateCanvas = (keyframes) => {
        for (let i = 0; i < keyframes.length; i++) {
            setTimeout(() => {
                setCanvasArr(keyframes[i]);
            }, i * 10)

        }
    }

    const generateMaze = () => {
        fetch('http://localhost:7801/maze?' + new URLSearchParams({
                width: canvasWidth,
                height: canvasHeight
            }))
            .then(response => response.json())
            .then(data => animateCanvas(data.keyframes))
            .catch(error => console.error('Error:', error))
    }

    return (
        <Box 
            id="editor-main" 
            direction='row' 
            pad="medium"
            align='center'
            justify='center' 
            height="90%"
        >
            <Box 
                id="editor-box" 
                direction='row' 
                align='center'
                height="90%"
                background="#11262D"
                pad="small"
                margin="xsmall"
                round="small"
            >

                <Canvas
                    gridArea="main"
                    width={canvasWidth}
                    height={canvasHeight}
                    updfunc={updateGridValue}
                    mainArr={canvasArr}
                />
            </Box>

            <Box 
                gridArea="settings" 
                id="options" 
                direction='column' 
                gap='xxsmall'
                margin="xsmall"
                background="#11262D"
                pad="small"
                height="90%"
                round="small"
            >
                    {/*
                    <Heading gridArea='settings' level="3" margin="xxsmall">Canvas Size:</Heading>
                    <Box direction='column' alignContent='center' align='center'>
                        <Box direction='row' alignContent='center' align='center' gap='medium'>
                            <Heading level="6" margin="small">Width</Heading>
                            <Heading level="6" margin="small">Height</Heading>
                        </Box>
                        <Box direction='row' alignContent='center' align='center' gap='medium'>
                            <RangeInput
                                value={canvasWidth} 
                                min={1}
                                max={40}
                                onChange={event => setCanvasWidth(event.target.value)}
                            ></RangeInput>
                            <RangeInput
                                value={canvasHeight} 
                                min={1}
                                max={40}
                                onChange={event => setCanvasHeight(event.target.value)}
                            ></RangeInput>
                        </Box>
            </Box>*/}
                <Button 
                    default
                    label="Generate maze"
                    color="#16BAC5"
                    onClick={() => {generateMaze()}}
                />
            </Box>
        </Box>
    )
}

export default Editor;