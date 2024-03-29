import React from 'react';
import Pixel from './Pixel';

import '../styles/row.scss'

function Row({ rkey, width, updfunc, mainArr, selectedType }) {
    let pixels = [];

    for (let i = 0; i < width; i++) {
        pixels.push(<Pixel key={i} rkey={rkey} ckey={i} updfunc={updfunc} mainArr={mainArr} selectedType={selectedType} /> )
    }

    return (
        <div className='row'>{pixels}</div>
    )
}

export default Row;