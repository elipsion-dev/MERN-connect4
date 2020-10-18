import React from 'react';

const Banner = (props) => {
  return (
    <div className={`${props.style} my-3 col-6 offset-3 rounded ${props.bg}`}>
        <h1 className='display-4'>{props.text}</h1>
    </div>
  );
}

export default Banner;