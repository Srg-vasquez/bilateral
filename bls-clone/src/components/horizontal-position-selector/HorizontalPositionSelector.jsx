// HorizontalPositionSelector.jsx
import React from 'react';
import PropTypes from 'prop-types';

function HorizontalPositionSelector({ position, onChange }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <div><strong>Posición horizontal:</strong></div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
        <button
          onClick={() => onChange('top')}
          style={{ backgroundColor: position === 'top' ? '#ccc' : 'white' }}
        >
          Arriba
        </button>
        <button
          onClick={() => onChange('middle')}
          style={{ backgroundColor: position === 'middle' ? '#ccc' : 'white' }}
        >
          Medio
        </button>
        <button
          onClick={() => onChange('bottom')}
          style={{ backgroundColor: position === 'bottom' ? '#ccc' : 'white' }}
        >
          Abajo
        </button>
      </div>
    </div>
  );
}

HorizontalPositionSelector.propTypes = {
  position: PropTypes.oneOf(['top', 'middle', 'bottom']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HorizontalPositionSelector;
