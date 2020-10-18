import React from 'react';

function Button(props) {
    
    return (
        <div>
            <button className={props.bootstrap} id={props.id} onClick={ props.onClick }>{props.name}</button>    
        </div>
    );

}

export default Button;
