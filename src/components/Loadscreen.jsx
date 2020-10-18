import React from 'react';
import Button from './Button'

const LoadScreen = (props) => {
    return (
        <div className='loadScreen col-xl-6 offset-xl-3  col-md-8 offset-md-2 col-10 offset-1'>
            <Button onClick={props.backToGame} bootstrap={'btn-danger rounded my-4 offset-11'} name={'X'} />
            {props.loads.length === 0 ?
                <h1 className='text-warning my-5'>No Saved Games To Display</h1> :
                props.loads.map(save =>
                    <div key={save} className='btn-group'>
                        <Button onClick={props.specificGameLoad} bootstrap={'btn-primary rounded mb-5'} id={save} name={save}></Button>
                        <Button onClick={props.deleteSave} bootstrap={'btn-danger rounded mr-5 X'} id={save} name='X'></Button>
                    </div>
                )
            }
        </div>
    );
}

export default LoadScreen;