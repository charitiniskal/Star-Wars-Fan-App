import '../css/Logo.css'
import React from 'react';

//logo component
const Logo = () => {
    return (
        <div className="logo">
            <img src={require('../images/star-wars-logo.png')} alt="logo"></img>
        </div>

    )
}

export default Logo;