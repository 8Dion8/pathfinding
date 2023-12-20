import React, { useState } from 'react';
import Canvas from './Canvas';

import '../styles/editor.scss'

function Editor() {
    const [canvasWidth, setCanvasWidth] = useState(32);
    const [canvasHeight, setCanvasHeight] = useState(24);

    return (
        <div id="editor">
            <h1>Editor</h1>
            <div id="options">
                Options lol
            </div>
            <Canvas
            width={canvasWidth}
            height={canvasHeight}
            />
        </div>
    )
}

export default Editor;