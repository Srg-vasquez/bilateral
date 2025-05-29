
import PropTypes from "prop-types";


function DirectionSelector ({direction, onChange}){

    const options = ['horizontal','vertical', 'diagonal', 'infinito'];

    return(
        <fieldset>
            <legend>Dirección del Estímulo  </legend>
            {options.map((dir)=>(
                <label key={dir} style={{marginRight: '10px'}}>
                    <input 
                     type="radio"
                     name="direction"
                     value="{dir}"
                     checked={direction === dir}
                     onChange={()=> onChange(dir)}
                     />
                     {dir.charAt(0).toUpperCase() + dir.slice(1)}
                     </label>
            ))}
        </fieldset>
    );
}

DirectionSelector.propTypes =  {
    direction: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default DirectionSelector;