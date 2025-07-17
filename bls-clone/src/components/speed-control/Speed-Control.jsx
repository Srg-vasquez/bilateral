import PropTypes from 'prop-types';

function SpeedControl({ speed, onChange }) {
  // Límite mínimo y máximo de velocidad
  const MIN_SPEED = 1;
  const MAX_SPEED = 10;

  // Funciones para subir y bajar velocidad con límites
  const increaseSpeed = () => {
    if (speed < MAX_SPEED) onChange(speed + 1);
  };

  const decreaseSpeed = () => {
    if (speed > MIN_SPEED) onChange(speed - 1);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '10px',
      marginTop: '20px',
      backgroundColor: '#f8f8f8'
    }}>
      {/* Texto que muestra velocidad actual */}
      <div style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '16px' }}>
        Velocidad actual: x{speed}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Botón para disminuir velocidad */}
        <button onClick={decreaseSpeed} disabled={speed === MIN_SPEED}>
          −
        </button>

        {/* Barra deslizante */}
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          value={speed}
          onChange={(e) => onChange(parseInt(e.target.value))}
          style={{ flex: 1 }}
        />

        {/* Botón para aumentar velocidad */}
        <button onClick={increaseSpeed} disabled={speed === MAX_SPEED}>
          +
        </button>
      </div>
    </div>
  );
}

SpeedControl.propTypes = {
  speed: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SpeedControl;
