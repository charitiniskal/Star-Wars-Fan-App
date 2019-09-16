import '../css/TextField.css'
import React from 'react';

class TextField extends React.Component {
    state = { term: "" };

    //on change input - function
    handleChange = (e) => {
        //set its value to the event target value
        this.setState({ term: e.target.value }); 
        //sends to parent the value
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div className="text-field">
                    <input onChange={this.handleChange} value={this.state.term} type="text" placeholder={this.props.placeholder}/>
            </div>
        )
    }
}

export default TextField;