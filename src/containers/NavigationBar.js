
import '../css/NavigationBar.css'
import React from 'react';
import FilterBar from '../components/FilterBar';
import TextField from '../components/TextField';

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { textFieldValue: "" };
    }

    //on select of filterbar - funtion
    handleResource = (res) => {
        //sends resource name to the parent
        this.props.selectedResource(res, "");
    }

    //on change - function
    textFieldSubmit = (term) => {
        //change state
        this.setState({ textFieldValue: term })
    }

    //on sumbit of searchbar - function
    onTextFieldSubmit = (event) => {
        event.preventDefault();
        //sends search value to the parent
        this.props.selectedResource("", this.state.textFieldValue);
    }

    //render function
    render() {
        return (
            <div className="navigation-bar">
                <FilterBar resource={this.handleResource} />
                <form onSubmit={this.onTextFieldSubmit}>
                    <TextField onChange={this.textFieldSubmit} placeholder="fuzzy search..." />
                </form>
            </div>
        )

    }
}

export default NavigationBar;