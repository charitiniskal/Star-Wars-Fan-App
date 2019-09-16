import '../css/Info.css';
import React from 'react';
import axios from 'axios';
import KeyValue from '../components/KeyValue';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {},
            headerTitle: "",
            category: "",
            picNum: null
        };
    }

    componentDidMount = async () => {
        //info to be used in the imp source
        const categoryName = this.props.url.split('/')[4];
        const num = this.props.url.split('/')[5];
        //api call
        const response = await axios.get(this.props.url);
        //object
        const obj = response.data;
        //handle object in order to map the array values from urls info to names or titles
        Object.entries(obj).map(([key, value]) => {
            //capitalize key 
            let stateKey = key[0].toUpperCase() + key.slice(1);
            if (value instanceof Array) {
                //promise that you resolve the the request
                Promise.all(
                    //map the url values
                    value.map(async (url) => {
                        //api call
                        let response = await axios.get(url);
                        let name = response.data.hasOwnProperty("name") ? response.data.name : response.data.title;
                        //return title of name
                        return name;
                    })
                ).then((value) => {
                    //change state of object, create a copy
                    let newObj = Object.assign({}, this.state.object);
                    //structure a new one
                    let assignedObj = { [stateKey]: value.join(', ') };
                    //merge
                    let merged = { ...newObj, ...assignedObj };
                    //final set state
                    this.setState({ object: merged });
                })
            }
            //change state of object, create a copy
            let newObj = Object.assign({}, this.state.object);
            //structure a new one
            let assignedObj = { [stateKey]: value };
            //merge
            let merged = { ...newObj, ...assignedObj };
            //final set state
            this.setState({ object: merged });
            return merged;
        });
        const header = obj.hasOwnProperty("name") ? obj.name : obj.title;
        //chage state
        this.setState({ headerTitle: header, category: categoryName, picNum: num });
    }

    //on click close icon - function
    handleClick = (event) => {
        //sends boolean of false to parent
        this.props.hideElement(false);
    }
    //function which is call from the render function
    renderContext() {
        //try and catch method. The api has more elements than the existing images so without try and catch the app would stop
        try {
            return (
                <div className="info-element">
                    <i className={`close icon icon-close`} onClick={this.handleClick}></i>
                    <div className="info-page">
                        <div className="img-wrapper">
                            <img src={require(`../images/img/${this.state.category}/${this.state.picNum}.jpg`)} alt="" />
                        </div>
                        <div className="info-data">
                            <h3>{this.state.headerTitle}</h3>
                            <div>{
                                Object.entries(this.state.object).map(([key, value]) => {
                                    return <KeyValue key={key} keyProp={key[0].toUpperCase() + key.slice(1)} value={value} />
                                })
                            }</div>
                        </div>
                    </div>
                </div>
            )
        }
        catch (error) {
            return (
                <div className="info-element">
                    <i className={`close icon icon-close`} onClick={this.handleClick}></i>
                    <div className="info-page">
                        <div>
                        </div>
                        <div className="info-data">
                            <h3>{this.state.headerTitle}</h3>
                            <div>{
                                Object.entries(this.state.object).map(([key, value]) => {
                                    return <KeyValue key={key} keyProp={key[0].toUpperCase() + key.slice(1)} value={value} />
                                })
                            }</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    //render function
    render() {
        return this.renderContext()
    }
}

export default Info;