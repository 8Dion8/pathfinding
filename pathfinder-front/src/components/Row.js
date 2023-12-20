import React from 'react';
import Pixel from './Pixel';

import '../styles/row.scss'

function Row({ width }) {
    let pixels = [];

    for (let i = 0; i < width; i++) {
        pixels.push(<Pixel key={i} /> )
    }

    return (
        <div className='row'>{pixels}</div>
    )
}

export default Row;