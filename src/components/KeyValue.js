import '../css/KeyValue.css'
import React from 'react';

//used for info data. takes two values from the parent component
const KeyValue = (props) => {
    return(
        <span className="key-value"><b>{`${props.keyProp}: `}</b>{props.value}</span>
    )
}

export default KeyValue;