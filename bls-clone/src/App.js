import { useState, useEffect } from 'react';
import './App.css';
import Stimulus from './stimulus';
import ColorPicker from './components/color-picker/colorpicker';
import DirectionSelector from './components/direction-selector/DirectionSelector';
import SpeedControl from './components/speed-control/Speed-Control';
import SetTimer from './components/set-timer/SetTimer';
import HorizontalPositionSelector from './components/horizontal-position-selector/HorizontalPositionSelector';

function App() {
  const [color, setColor] = useState('#3498db');
  const [direction, setDirection] = useState('horizontal');
  const [speed, setSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const [sessionTime, setSessionTime] = useState(0);
  const [seriesCount, setSeriesCount] = useState(0);
  const [tandaCount, setTandaCount] = useState(0);
  const [prevRunning, setPrevRunning] = useState(false);
  const [horizontalPosition, setHorizontalPosition] = useState('middle');

  // 🕒 Formatear tiempo en mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // ▶️ Iniciar/detener estímulo
  const handleToggleStimulus = () => {
    setIsRunning(prev => {
      const next = !prev;
      if (next) {
        setSessionTime(0);
        if (tandaCount === 0) {
          setSeriesCount(0);
        }
      }
      return next;
    });
  };

  // 🔁 Reiniciar todo sin iniciar el estímulo
  const handleReset = () => {
    setIsRunning(false);
    setSessionTime(0);
    setSeriesCount(0);
    setTandaCount(0);
  };

  // ⏱️ Temporizador de sesión
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // ➕ Contador de series
  const incrementSeriesCount = () => {
    setSeriesCount(prev => prev + 1);
  };

  // 🟢 Contador de tandas
  useEffect(() => {
    if (prevRunning && !isRunning) {
      setTandaCount(prev => prev + 1);
    }
    setPrevRunning(isRunning);
  }, [isRunning]);

  return (
    <div>
      <h1>BLS Visual - Vista del Terapeuta</h1>

      <ColorPicker color={color} onChange={setColor} />
      <DirectionSelector direction={direction} onChange={setDirection} />

      {direction === 'horizontal' && (
        <HorizontalPositionSelector
          position={horizontalPosition}
          onChange={setHorizontalPosition}
        />
      )}

      <SpeedControl speed={speed} onChange={setSpeed} />

      <button onClick={handleToggleStimulus}>
        {isRunning ? 'Detener estímulo' : 'Iniciar estímulo'}
      </button>

      <button onClick={handleReset} style={{ marginLeft: '10px' }}>
        Reiniciar
      </button>

      <p><strong>Tiempo total de sesión:</strong> {formatTime(sessionTime)}</p>
      <p><strong>Series completadas:</strong> {seriesCount}</p>
      <p><strong>Tandas completadas:</strong> {tandaCount}</p>

      <Stimulus
        color={color}
        direction={direction}
        speed={speed}
        isRunning={isRunning}
        onSeriesIncrement={incrementSeriesCount}
        horizontalPosition={horizontalPosition} 
      />
    </div>
  );
}

export default App;
