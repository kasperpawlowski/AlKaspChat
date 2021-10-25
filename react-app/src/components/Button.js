import React from 'react';

function Button(props) {
    return (
        <button className="btn" onClick={props.clickHandler} style={props.style}>{props.text}</button>
    );
}

export default Button;