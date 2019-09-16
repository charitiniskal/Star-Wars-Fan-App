import '../css/LoginName.css'
import React from 'react';

class LoginName extends React.Component {

    //on click of signout icon - function
    onIconClick = (event) => {
        event.preventDefault();
        //sends to parent true boolean when it is clicked
        this.props.clicked(true);
    }

    //render method
    render() {
        return (
            <div>
                <label className="login-name">Hi {this.props.username}</label>
                <i onClick={this.onIconClick} className="large inverted sign out alternate icon icon-padding"></i>
            </div>
        )
    }
}

export default LoginName;