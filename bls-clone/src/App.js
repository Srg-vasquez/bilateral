

import { useState } from 'react';
import './App.css';
import Stimulus from './stimulus';
import ColorPicker from './components/color-picker/colorpicker';
import DirectionSelector from './components/direction-selector/DirectionSelector';




function App() {
  const [color, setColor] = useState('#3498db'); // color inicial
  const [direction, setDirection] = useState('horizontal');
  const [speed, setSpeed] = useState(1);


  return (
    <div>
      <h1>BLS Visual - Vista del Terapeuta</h1>
      <ColorPicker color={color} onChange={setColor} />
      <DirectionSelector direction={direction} onChange={setDirection} />
      <Stimulus color={color} direction={direction} speed={speed} />
    </div>
  );
}

export default App;