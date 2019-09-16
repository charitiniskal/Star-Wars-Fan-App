import '../css/FilterBar.css';
import React from 'react';
import axios from 'axios';

class FilterBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { filterBarResources: [] };
    }

    //api call 
    componentDidMount = async () => {
        const allResources = await axios.get("https://swapi.co/api/");
        //change state
        this.setState({ filterBarResources: Object.keys(allResources.data) });
    }

    //on change of select - function
    handleChange = (event) =>{
        //sends back select value
        this.props.resource(event.target.value);

    }

    //rendering the options - fuction called from render function
    renderFilterBar(){
        //maps the resources to options
        return this.state.filterBarResources.map((res) => {
            return <option key={res} value={res}>{res}</option>
        })
    }

    //render function
    render() {
        return (
            <div className="select-style">
                <select onChange={this.handleChange} defaultValue={"DEFAULT"}>
                <option value="DEFAULT" disabled>Select Resource</option>
                    {this.renderFilterBar()}                   
                </select>
            </div >
        )

    }
}

export default FilterBar;