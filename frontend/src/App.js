import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Nav from "./Nav";
import JoblyApi from "./JoblyApi";
import { decode } from "jsonwebtoken";
import CurrentUserContext from "./CurrentUserContext";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      infoLoaded: false
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentUser();
  }

  async getCurrentUser() {
    let token = localStorage.getItem("token");
    try {

      //get username from token
      let { username } = decode(token);

      //grab the record of the user from the server and set state
      let currentUser = await JoblyApi.getUser(username);
      this.setState({ currentUser, infoLoaded: true });
    }
    catch (e) {
      this.setState({ infoLoaded: true });
    }
  }

  handleLogout() {
    localStorage.removeItem('token');
    this.setState({ currentUser: null });
    this.props.history.push("/");
  }

  render() {
    if (!this.state.infoLoaded) {
      return (
        <div>LOADING</div>
      );
    }

    // let background = this.state.currentUser ? "" : "https://cdn.pixabay.com/photo/2016/02/19/11/19/office-1209640_1280.jpg";
    let background = this.state.currentUser ? "" : "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80";

    return (

      <CurrentUserContext.Provider value={this.state.currentUser}>
        <main>
          <div className="App" style={{ background: `url(${background})` }}>
            <BrowserRouter>
              <Nav handleLogout={this.handleLogout} />
              <div className="app-wrap">
                <Routes getCurrentUser={this.getCurrentUser} />
              </div>
            </BrowserRouter>
          </div>
        </main>

      </CurrentUserContext.Provider>
    );
  }
}

export default App;
