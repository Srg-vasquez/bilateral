import PropTypes from "prop-types";

function DirectionSelector({ direction, onChange }) {
  // Agregamos los nuevos tipos de dirección
  const options = [
    { label: "Horizontal", value: "horizontal" },
    { label: "Vertical", value: "vertical" },
    { label: "Diagonal /", value: "diagonal-down" }, // ↘↖
    { label: "Diagonal \\", value: "diagonal-up" },   // ↙↗
    { label: "Infinito", value: "infinito" },
  ];

  return (
    <fieldset>
      <legend>Dirección del Estímulo</legend>
      {options.map((option) => (
        <label key={option.value} style={{ marginRight: '10px' }}>
          <input
            type="radio"
            name="direction"
            value={option.value}
            checked={direction === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  );
}

DirectionSelector.propTypes = {
  direction: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DirectionSelector;
