import React, { useState } from 'react';
import Canvas from './Canvas';

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
        <div id="editor">
            <h1>Editor</h1>
            <div id="options">
                Options lol
            </div>
            <Canvas
                width={canvasWidth}
                height={canvasHeight}
                updfunc={updateGridValue}
                //onClick={console.log(canvasArr)}
            />
        </div>
    )
}

export default Editor;