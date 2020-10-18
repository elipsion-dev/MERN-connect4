import React from 'react';
import Button from './Button'
import Input from './Input'

const SaveScreen = (props) => {

    const inputProps = {
        type: 'text',
        name: 'saveGameName',
        placeholder: 'Save Game Name',
        bootstrap: 'rounded form-control my-5',
        saved: props.saved,
        backToGame: props.backToGame,
        stateCopy: props.stateCopy
    }

    return (
        <div className='loadScreen col-xl-6 offset-xl-3 col-md-8 offset-md-2 col-10 offset-1 text-white text-center py-3'>
            <Button onClick={props.backToGame} bootstrap={'btn-danger rounded mt-2 offset-11'} name={'X'} />
            <Input {...inputProps} />
            {props.warning && <p className='bg-danger text-white col-10 mb-5 offset-1'>This Name Already Taken! <br></br>Please choose another name for your save. </p>}
        </div>
    );
}

export default SaveScreen;