import React, { useState } from 'react';
import Row from './Row';
import { Box } from 'grommet';

import '../styles/canvas.scss'

function Canvas({ width, height, updfunc, mainArr, selectedType }) {


    let rows = [];

    for (let i = 0; i < height; i++) {
        rows.push(<Row key={i} rkey={i} width={width} updfunc={updfunc} mainArr={mainArr} selectedType={selectedType} />)
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