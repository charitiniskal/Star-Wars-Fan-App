import '../css/Elements.css'
import React from 'react';
import Info from './Info';

class Elements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInfo: false,
            infoUrl: ""
        };
    }

    //on click element - function
    onElementClick = (id) => {
        //change state
        this.setState({ showInfo: true, infoUrl: id });
        //sends to parent message to hide navbar
        this.props.hideHeaderNav("hide");
    }

    //on click of info element - function
    handleHideElement = (hide) => {
        //change state
        this.setState({ showInfo: hide });
        //sends to parent message to show navbar
        this.props.hideHeaderNav("show");
    }

    //function which is call from the render function
    renderElements = () => {
        //renders accordingly to showInfo boolean
        if (!this.state.showInfo) {
            //maps the elements
            return this.props.elements.map((element) => {
                let keyNum = element.url.split('/')[5];
                //check if object has name or title property
                let label = element.hasOwnProperty("name") ? "name" : "title";
                //set width for non images divs
                let setWidth = (element.url.split('/')[4] === "vehicles" || element.url.split('/')[4] === "starships") ? "empty-div-600" : "empty-div-400";
                //try and catch method. The api has more elements than the existing images so without try and catch the app would stop
                try {
                    return (
                        <div className="centered" onClick={() => this.onElementClick(element.url)} key={element.url}>
                            <img
                                src={require(`../images/img/${this.props.resource}/${keyNum}.jpg`)}
                                onError={(event) => event.target.setAttribute("src", "")}
                                alt={element[label]}
                            />
                            <label id={element.url}>{element[label]}</label>
                        </div>
                    )
                }
                catch (error) {
                    return (
                        <div className="centered" onClick={() => this.onElementClick(element.url)} key={element.url}>
                            <div className={setWidth}>image not found...</div>
                            <label id={element.url}>{element[label]}</label>
                        </div>
                    )
                }
            })
        }
        if (this.state.showInfo) {
            return <Info url={this.state.infoUrl} hideElement={this.handleHideElement} />
        }
    }

    //render function
    render() {
        return <div className="elements">{this.renderElements()}</div>
    }
}

export default Elements;