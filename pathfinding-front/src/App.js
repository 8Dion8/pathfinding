import logo from './logo.svg';
import './App.css';
import Editor from './components/Editor';
import Canvas from './components/Canvas';
import { Grommet, Box, RadioButtonGroup } from 'grommet';
import React, { useState } from 'react';


function App() {

  const [canvasWidth, setCanvasWidth] = useState(25);
  const [canvasHeight, setCanvasHeight] = useState(15);
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

  fetch('http://localhost:7801/ping')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));



  return (
    <Grommet full>
      <Box 
        id="editor-box" 
        direction='column' 
        align='center'
        height="90%"
        width="55%"
        background="#3B4252"
        pad="small"
        margin="xsmall"
        round="small" >
          <Canvas gridArea="main"
            width={canvasWidth}
            height={canvasHeight}
            updfunc={updateGridValue}
            mainArr={canvasArr}
            selectedType={selectedType} />
          <RadioButtonGroup
            direction='row'
            name="selectType"
            options={["Wall", "Start", "Finish"]}
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
            margin="small" />
        </Box>
    </Grommet>
  );
}

export default App;
