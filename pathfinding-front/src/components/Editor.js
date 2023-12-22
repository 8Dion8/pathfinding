import React, { useState } from 'react';
import Canvas from './Canvas';
import { Button, Box, Header, Heading, Grid, RangeInput } from 'grommet';


import '../styles/editor.scss'

function Editor() {
    const [canvasWidth, setCanvasWidth] = useState(30);
    const [canvasHeight, setCanvasHeight] = useState(20);
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

    return (
        <Box id="editor" direction='column' pad="medium" align='center' alignContent='center'>
            <Grid
                rows={['xsmall', 'large']}
                columns={['large', 'small']}
                gap="small"
                areas={[
                    { name: "title", start: [0, 0], end: [1, 0] },
                    { name: "main", start: [0, 1], end: [0, 1] },
                    { name: "settings", start: [1, 1], end: [1, 1] }
                ]}
            >

                <Heading gridArea='title'>Editor</Heading>


                <Canvas
                    gridArea="main"
                    width={canvasWidth}
                    height={canvasHeight}
                    updfunc={updateGridValue}
                //onClick={console.log(canvasArr)}
                />
                <Box gridArea="settings" id="options" direction='column' alignContent='start' gap='xxsmall'>
                    <Heading gridArea='settings' level="3" margin="xxsmall">Canvas Size:</Heading>
                    <Box direction='column' alignContent='center' align='center'>
                        <Box direction='row' alignContent='center' align='center' gap='medium'>
                            <Heading level="6" margin="small">Width</Heading>
                            <Heading level="6" margin="small">Height</Heading>
                        </Box>
                        <Box direction='row' alignContent='center' align='center' gap='medium'>
                            <RangeInput></RangeInput>
                            <RangeInput></RangeInput>
                        </Box>
                    </Box>
                    <Button primary label="Generate maze" margin="xsmall" />
                </Box>

            </Grid>
        </Box>
    )
}

export default Editor;