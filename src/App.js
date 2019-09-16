/*This is the main component of the app.
Several components are imported in this app, <Login/>, <Header/>, <NavigationBar/>, <Elements/> and others
The state in the constuctor has been set and username is an empty string.
As the app is moving to the render method it stays in the if statement where username is empty.

User has to set his name and press "Login" button
<Login/> component, which has triggered the onLoginSubmit function, saves the key username 
and the username value to the localstorage and sets the state of usename with the username value.

The app is moving again to the render method and as the username state has been filled, <Header/>, <NavigationBar/>
and <Elements/> are rendered.

If the user refreshes the browser, he has not to login again.
(A sign-out icon will remove the key and value from the localstorage so the user has to login again.)

The user now is able to select one of options-resources which appear in the filter bar.
<NavigationBar/> triggers the handleSelectedResource function. The first 10 elements of the resource, that the user
asked for, have been loaded. As he starts scrolling, the lazyload function is triggered. When he reaches the bottom of 
the page (scroll is at the bottom), if the next page exists, another ten elements are fetched, using the 
continueloading function. The same process will be followed recursively untill there is no next page.

The user now can go to the search bar section and do a fuzzy search on the selected resource. The <Searchbar/> component 
will trigger the <NavigationBar/> component and this triggers the handleSelectedResource function. All the elements from
the fuzzy search will be rendered using again the lazyload function and the continueloading function.

Now the user may want to see full details of a specific Element. Clicking on an element the onElementClick fuction,
which lives in the <Elements/> component, is triggered. This sets the state of showInfo to true and the <Elements/> 
component is rendering the info page, which has the <Info/> component.

<Info/> component is using the preselected url which has been sent from <Elements/> and get the data of the selected
element. If there is an image, info shows the image of the element and its data, otherwise it is showing only the elements.
There is a 'close icon' which is sending back a boolean(false) to <Elements/>, and then the <Info/> disappears
and the <Elements/> are rendered again.

Used Libraries: 
axios . It is used for the API calls
semantic-ui css . It has be linked in the index.html and it was used only for icons, 
*/


import './css/App.css'
import React from 'react';
import axios from 'axios';
import Login from './containers/Login';
import Header from './containers/Header';
import NavigationBar from './containers/NavigationBar';
import Elements from './containers/Elements';

class App extends React.Component {
  constructor(props) {
    super(props);
    //initial state
    this.state = {
      username: "",
      selectedResource: "",
      elements: [],
      hideHeaderNav: "show",
      isFetching: false
    };
  }

  componentDidMount() {
    //checking if localstorage has saved key and value
    if (localStorage.getItem("username")) {
      this.setState({ username: localStorage.getItem("username") });
    }
    //adds event-listener to scroll, refers to lazyLoad function
    window.addEventListener('scroll', this.lazyLoad)
  }

  componentWillUnmount() {
    //removes event-listener to scroll, refers to lazyLoad function
    window.removeEventListener('scroll', this.lazyLoad)
  }


  //when imput value has been set and the button has been clicked
  onLoginSubmit = async (name) => {
    //localstorages sets key and value
    localStorage.setItem("username", name);
    //change state of username, navbar can be shown(refers to css class)
    this.setState({ username: localStorage.getItem("username"), hideHeaderNav: "show" });
  }

  //triggered when signout icon has been clicked. receives boolean and removes localstorage.
  onSignOut = (logState) => {
    if (logState) {
      //state is set again, empty username, back to login
      //elements are set to empty array in case that someone signs out. Elements should be empty when he is back logged in
      localStorage.removeItem("username");
      this.setState({ username: "", selectedResource: "", elements: [] });
    }
  }

  //triggered function from <NavigationBar/>
  handleSelectedResource = async (res, search) => {
    //this function is used for both filterbar and searchbar. This is why there could be an option where res
    //can be empty. in tat case, it uses state's selectedResource
    if (res === "") {
      res = this.state.selectedResource;
    }
    //api call
    const response = await axios.get(`https://swapi.co/api/${res}/?search=${search}`);
    //checks if there is next page
    const next = response.data.next ? response.data.next : '';
    //changes state
    this.setState({
      selectedResource: res,
      elements: response.data.results,
      next: next,
    });
  }

  //function refering scroll event listener
  lazyLoad = () => {
    if (!this.state.isFetching && this.state.next && (document.body.scrollHeight - window.pageYOffset <= (document.body.clientHeight + 10))) {
      //if conditions are true go to continueLoading using next page's url
      this.continueLoading(this.state.next);
      //set state of fetch to true to be able to fetch data
      this.setState({
        isFetching: true
      })
    }
  }

  //refering to lazyloading
  continueLoading = async (url) => {
    //keep the elements that have been alreadt rendered
    const elements = this.state.elements;
    //api call
    const response = await axios.get(url);
    //checks if there is next page
    const next = response.data.next ? response.data.next : '';
    //changes state
    this.setState({
      elements: [...elements, ...response.data.results],
      next: next,
      isFetching: false
    });
  }

  //fuction which is triggered from <Elements/> component
  handleHideHeaderNav = async (hide) => {
    //if element is clicked to show info send back 'hide' to hide nav bar (css class)
    this.setState({ hideHeaderNav: hide });
  }

  //function which is call from the render function
  renderContent() {
    const username = this.state.username.trim();
    //check if username is empty or not
    if (!username) {
      return (
        <div className="app-login">
          <img src={require("./images/star-wars-blackwhite.png")} alt="background"></img>
          <Login loginName={this.onLoginSubmit} />
        </div>
      )
    }
    else if (username) {
      return (
        <div className="app-browse">
          <Header name={this.state.username} signout={this.onSignOut} />
          <div className={this.state.hideHeaderNav}>
            <NavigationBar searchName={this.handleSelectedResource} selectedResource={this.handleSelectedResource} />
          </div>
          <Elements
            resource={this.state.selectedResource}
            elements={this.state.elements}
            infoUrl={this.handleInfoUrl}
            hideHeaderNav={this.handleHideHeaderNav}
          />
        </div>
      )
    }
    return (
      <div>Loading</div>
    )
  }

  //render function of class
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }

}

export default App;
