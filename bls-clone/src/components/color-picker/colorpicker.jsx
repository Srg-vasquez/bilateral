import PropTypes from 'prop-types';

function ColorPicker({ color, onChange }) {
  // 🎨 Lista de 10 colores predefinidos para elegir fácilmente
  const predefinedColors = [
    '#3498db', // Azul
    '#e74c3c', // Rojo
    '#2ecc71', // Verde
    '#f1c40f', // Amarillo
    '#00bfff', // Celeste claro (reemplazo del púrpura)
    '#1abc9c', // Turquesa
    '#e67e22', // Naranja
    '#34495e', // Azul oscuro
    '#dc5bd1', // Blanco
    '#000000'  // Negro
  ];

  return (
    <div>
      <label htmlFor="colorInput">Color del estímulo:</label>

      {/* 🟩 Paleta de colores rápidos (botones de selección) */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
        {predefinedColors.map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)} // 🔁 Cambia el color al hacer clic
            style={{
              backgroundColor: preset,
              width: '30px',
              height: '30px',
              border: preset === color ? '3px solid #000' : '1px solid #ccc',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            aria-label={`Elegir color ${preset}`} // ♿ Accesibilidad
          />
        ))}
      </div>

      {/* 🎨 Input personalizado de color */}
      <div style={{ marginTop: '10px' }}>
        <input
          id="colorInput"
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)} // ✅ Permite elegir un color personalizado
        />
        <span style={{ marginLeft: '10px' }}>{color}</span> {/* Muestra el código del color actual */}
      </div>
    </div>
  );
}

// 🧾 Validación de props: buena práctica para detectar errores
ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
