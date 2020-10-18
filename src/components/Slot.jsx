import React from 'react';

const Slot = (props) => {
    let color = props.columns[props.location.column][props.location.row]
    return (
        <td
          className={color}
          onClick={() => props.clickHandler()}
          value={props.value} 
        >
        </td >
      );
}

export default Slot;

