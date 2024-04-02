import React, { useState } from 'react';
import Canvas from './Canvas';
import { Button, Box, Header, Heading, Grid, RangeInput, RadioButtonGroup } from 'grommet';


import '../styles/editor.scss'

function Editor() {
    const [canvasWidth, setCanvasWidth] = useState(35);
    const [canvasHeight, setCanvasHeight] = useState(25);
    const [canvasArr, setCanvasArr] = useState(() => {
        return Array.from({ length: canvasHeight }, () => Array.from({ length: canvasWidth }, () => 0));
    })
    const [selectedType, setSelectedType] = useState("Wall");

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

    const animateCanvas = (keyframes, timeout) => {
        for (let i = 0; i < keyframes.length; i++) {
            setTimeout(() => {
                setCanvasArr(keyframes[i]);
            }, i * timeout)

        }
    }

    const generateMaze = () => {
        clear_canvas_before_solve()
        fetch('http://localhost:7801/maze?' + new URLSearchParams({
                width: canvasWidth,
                height: canvasHeight
            }))
            .then(response => response.json())
            .then(data => animateCanvas(data.keyframes, 10))
            .catch(error => console.error('Error:', error))
    }

    const solveMaze = () => {
        clear_canvas_before_solve()
        fetch('http://localhost:7801/solve/breadth_first?' + new URLSearchParams({
                grid: JSON.stringify(canvasArr)
            }))
            .then(response => response.json())
            .then(data => animateCanvas(data.keyframes, 30))
            .catch(error => console.error('Error:', error))
    }

    const clear_canvas_before_solve = () => {
        let allowed_values = [0, 1, 2, 3]
        for (let i = 0; i++; i < canvasHeight) {
            for (let j = 0; j++; j < canvasWidth) {
                if (!allowed_values.includes(canvasArr[i][j])) {
                    updateGridValue(i, j, 0)
                } 
            }
        }
    }

    return (
        <Box 
            id="editor-main" 
            direction='row' 
            pad="medium"
            align='center'
            justify='center'
            height="100%"
        >
            <Box 
                id="editor-box" 
                direction='row' 
                align='center'
                height="90%"
                background="#3B4252"
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
                    selectedType={selectedType}
                />
            </Box>

            <Box 
                gridArea="settings" 
                id="options" 
                direction='column' 
                gap='xxsmall'
                margin="xsmall"
                background="#3B4252"
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
                <RadioButtonGroup
                    name="selectType"
                    options={["Wall", "Start", "Finish"]}
                    value={selectedType}
                    onChange={(event) => setSelectedType(event.target.value)}
                    margin="small"
                />

                <Button 
                    default
                    label="Generate maze"
                    color="#8FBCBB"
                    onClick={() => {generateMaze()}}
                    margin="xxsmall"
                />
                <Button 
                    default
                    label="Solve (Breadth)"
                    color="#8FBCBB"
                    onClick={() => {solveMaze()}}
                    margin="xxsmall"
                />
            </Box>
        </Box>
    )
}

export default Editor;