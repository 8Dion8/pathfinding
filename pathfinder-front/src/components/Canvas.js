import React, { useState } from 'react';
import Row from './Row';

import '../styles/canvas.scss'

function Canvas({ width, height }) {


    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} width={width} />)
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