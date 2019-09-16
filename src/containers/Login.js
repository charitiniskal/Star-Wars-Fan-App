import '../css/Login.css';
import React from 'react';
import TextField from '../components/TextField'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { textFieldValue: "" };
    }

    //on change - function
    textFieldSubmit = (term) => {
        //change the state
        this.setState({ textFieldValue: term })
    }

    //on click of login - funtion
    onTextFieldSubmit = (event) => {
        event.preventDefault();
        //sends username value to the parent
        this.props.loginName(this.state.textFieldValue);
    }


    //render function
    render() {
        return (
            <div className="login">
                <label>Login Screen</label>
                <TextField onChange={this.textFieldSubmit} placeholder="username..." />
                <button onClick={this.onTextFieldSubmit} className="button">Login!</button>
            </div>
        )
    }

}

export default Login;

