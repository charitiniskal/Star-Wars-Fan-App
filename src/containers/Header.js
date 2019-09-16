import '../css/Header.css'
import React from 'react';
import Logo from '../components/Logo';
import LoginName from '../components/LoginName';

class Header extends React.Component {

    //on click -function
    onClicked = (click) => {
        //sends bool to the parent
        this.props.signout(click);
    }

    //render function
    render() {
        return (
            <div className="header">
                <Logo />
                <LoginName clicked={this.onClicked} username={this.props.name} />
            </div>
        )
    }
}

export default Header;