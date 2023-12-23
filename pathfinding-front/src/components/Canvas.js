import React, { useState } from 'react';
import Row from './Row';

import '../styles/canvas.scss'

function Canvas({ width, height, updfunc, mainArr }) {


    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} rkey={i} width={width} updfunc={updfunc} mainArr={mainArr} />)
    }

    return (
        <div id='canvas'>
            <div id='pixels'>
                {rows}
            </div>
        </div>
    )
}

export default Canvas;