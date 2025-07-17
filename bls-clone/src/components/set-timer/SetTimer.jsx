// SetTimer.jsx
import React from 'react';
import PropTypes from 'prop-types';

function SetTimer({ duration, pause, sets, onChange, onStart }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
        backgroundColor: '#f8f8f8'
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>
        Configuración de Sets
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Duración del set (s):
          <input
            type="number"
            value={duration}
            onChange={(e) => onChange('duration', parseInt(e.target.value))}
            min={1}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Pausa entre sets (s):
          <input
            type="number"
            value={pause}
            onChange={(e) => onChange('pause', parseInt(e.target.value))}
            min={0}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>
          Número de sets:
          <input
            type="number"
            value={sets}
            onChange={(e) => onChange('sets', parseInt(e.target.value))}
            min={1}
            style={{ marginLeft: '10px', width: '60px' }}
          />
        </label>
      </div>

      <button onClick={onStart}>
        Iniciar sesión de sets
      </button>
    </div>
  );
}

SetTimer.propTypes = {
  duration: PropTypes.number.isRequired,
  pause: PropTypes.number.isRequired,
  sets: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default SetTimer;
